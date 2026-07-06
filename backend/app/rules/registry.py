"""Rule registry, finding model, and rule protocol for the pre-scanner.

This module defines the deterministic rule pre-scanner contract that runs
over an :class:`~app.parsing.ast_summary.AstSummary` *before* the AI routing
layer is invoked (see Requirement 5):

* :class:`RuleFinding` — a single deterministic finding produced by a rule.
* :class:`Rule` — a structural :class:`typing.Protocol` every rule satisfies.
* :class:`RuleRegistry` — selects the correct rule pack(s) for a request
  ``profile`` (``"dsp"``, ``"iot"``, or ``"both"``).

Like the parsing layer, the rule layer is deterministic and side-effect free
and MUST NOT import from ``langchain`` or ``groq`` packages. The concrete DSP
and IoT rule modules (``dsp_rules.py`` / ``iot_rules.py``) are added in later
tasks; :class:`RuleRegistry` imports them lazily so this module compiles and is
usable before those modules exist.
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Literal, Protocol, runtime_checkable

from pydantic import BaseModel, ConfigDict, Field, field_validator

if TYPE_CHECKING:  # pragma: no cover - import only for type checking
    from app.parsing.ast_summary import AstSummary


Severity = Literal["info", "warning", "error"]
Profile = Literal["dsp", "iot", "both"]


# ---------------------------------------------------------------------------
# Finding model
# ---------------------------------------------------------------------------


class RuleFinding(BaseModel):
    """A deterministic finding emitted by a :class:`Rule`.

    Attributes:
        rule_id: Stable identifier of the emitting rule, e.g. ``"DSP-MAC-001"``.
        severity: One of ``"info"``, ``"warning"``, or ``"error"``.
        line: 1-indexed source line of the finding, or ``None`` when the
            finding is not tied to a specific line.
        module: Enclosing Verilog module name, when known.
        message: Human-readable, structured description of the finding.
    """

    model_config = ConfigDict(extra="forbid")

    rule_id: str = Field(..., description='Stable rule identifier, e.g. "DSP-MAC-001".')
    severity: Severity
    line: int | None = Field(
        default=None,
        description="1-indexed source line, or None when not line-specific.",
    )
    module: str | None = Field(
        default=None,
        description="Enclosing Verilog module name, when known.",
    )
    message: str = Field(..., description="Structured, human-readable description.")

    @field_validator("line")
    @classmethod
    def _line_is_none_or_valid(cls, value: int | None) -> int | None:
        """Ensure ``line`` is ``None`` or refers to an existing line.

        A line number must be a positive (1-indexed) integer to refer to a
        real source line. Callers that know the source extent should
        additionally bound ``line`` to ``count_lines(code)`` (see
        Requirement 5.6); this validator enforces the lower bound that is
        independent of any particular source.
        """
        if value is not None and value < 1:
            raise ValueError(
                f"RuleFinding.line must be None or a 1-indexed line >= 1 (got {value})"
            )
        return value


# ---------------------------------------------------------------------------
# Rule protocol
# ---------------------------------------------------------------------------


@runtime_checkable
class Rule(Protocol):
    """Structural protocol implemented by every deterministic rule.

    A rule is a pure function of the :class:`AstSummary` it receives: calling
    :meth:`check` with the same summary MUST yield equal findings and produce
    no observable side effects (Requirement 5.1, 5.2).
    """

    rule_id: str

    def check(self, ast: "AstSummary") -> list[RuleFinding]:
        """Return the findings this rule detects in ``ast`` (possibly empty)."""
        ...


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------


class RuleRegistry:
    """Selects deterministic rule packs based on the request profile.

    The concrete rule packs live in sibling modules that are added in later
    tasks:

    * ``app.rules.dsp_rules`` — ``DSP-MAC-001``, ``DSP-WIDTH-002``.
    * ``app.rules.iot_rules`` — ``IOT-LATCH-002``, ``IOT-CLKGATE-001``,
      ``IOT-FSM-003``.

    The packs are imported lazily inside :meth:`select` so that this registry
    can be imported and exercised before those modules exist; a missing module
    simply contributes no rules to the selection.
    """

    @staticmethod
    def _load_dsp_rules() -> list[Rule]:
        """Instantiate the DSP rule pack, or return ``[]`` if unavailable."""
        try:
            from app.rules import dsp_rules
        except ImportError:
            return []
        get_rules = getattr(dsp_rules, "get_rules", None)
        return list(get_rules()) if callable(get_rules) else []

    @staticmethod
    def _load_iot_rules() -> list[Rule]:
        """Instantiate the IoT rule pack, or return ``[]`` if unavailable."""
        try:
            from app.rules import iot_rules
        except ImportError:
            return []
        get_rules = getattr(iot_rules, "get_rules", None)
        return list(get_rules()) if callable(get_rules) else []

    @classmethod
    def select(cls, profile: Profile) -> list[Rule]:
        """Return the rules enabled for ``profile``.

        Args:
            profile: ``"dsp"`` selects only the DSP pack, ``"iot"`` selects
                only the IoT pack, and ``"both"`` returns the union (DSP rules
                first, then IoT rules).

        Returns:
            The ordered list of :class:`Rule` instances to run.
        """
        if profile == "dsp":
            return cls._load_dsp_rules()
        if profile == "iot":
            return cls._load_iot_rules()
        # profile == "both"
        return [*cls._load_dsp_rules(), *cls._load_iot_rules()]


__all__ = [
    "Severity",
    "Profile",
    "RuleFinding",
    "Rule",
    "RuleRegistry",
]
