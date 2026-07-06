"""Request and response Pydantic schemas for the AI Verilog Linter API.

Defines the wire contract between frontend and backend:

* :class:`LintRequest` — POST /api/lint request body.
* :class:`LintIssue`, :class:`CorrectedSnippet` — components of the success
  response that describe individual findings produced by the AI router.
* :class:`LintResponse` — successful linting response (HTTP 200).
* :class:`LintErrorResponse` — error response shape used for HTTP 400 / 422 /
  500 / 502 paths.

These models intentionally live in a dedicated module (and not next to the
parsing or AI layers) so that both the FastAPI routes and the HTTP client
test layer can import them without pulling in Pyverilog or LangChain.
"""

from __future__ import annotations

from typing import List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, model_validator


# ---------------------------------------------------------------------------
# Request
# ---------------------------------------------------------------------------


class LintRequest(BaseModel):
    """Request body for ``POST /api/lint``.

    Attributes:
        code: Raw Verilog source. Pydantic enforces ``1 <= len(code) <=
            200_000``; out-of-range values cause FastAPI to return HTTP 422.
        profile: Rule pack selector. Defaults to ``"both"`` when omitted, so
            DSP and IoT heuristics both run.
    """

    model_config = ConfigDict(extra="forbid")

    code: str = Field(
        ...,
        min_length=1,
        max_length=200_000,
        description="Raw Verilog HDL source to be linted (1..200000 chars).",
    )
    profile: Literal["dsp", "iot", "both"] = Field(
        default="both",
        description='Rule pack selector. Defaults to "both".',
    )


# ---------------------------------------------------------------------------
# Issue & response components
# ---------------------------------------------------------------------------


class CorrectedSnippet(BaseModel):
    """A localized fix proposed by the AI router for a single issue.

    Attributes:
        start_line: 1-indexed inclusive start line in the original source.
        end_line: 1-indexed inclusive end line; must be ``>= start_line``.
        original: The original source spanning ``[start_line, end_line]``.
        corrected: The proposed corrected replacement for that span.
    """

    model_config = ConfigDict(extra="forbid")

    start_line: int = Field(..., ge=1, description="1-indexed inclusive start line.")
    end_line: int = Field(..., ge=1, description="1-indexed inclusive end line.")
    original: str = Field(..., description="Original source for the span.")
    corrected: str = Field(..., description="Proposed corrected replacement.")

    @model_validator(mode="after")
    def _check_line_order(self) -> "CorrectedSnippet":
        """Ensure ``start_line <= end_line`` (Requirement 13.7)."""
        if self.start_line > self.end_line:
            raise ValueError(
                "CorrectedSnippet.start_line must be <= end_line "
                f"(got start_line={self.start_line}, end_line={self.end_line})"
            )
        return self


class LintIssue(BaseModel):
    """A single finding emitted by the linter.

    Mirrors the design's ``Issue & Response`` data model: deterministic
    rule findings and AI-derived findings are both surfaced through this
    shape so the frontend can render them uniformly.
    """

    model_config = ConfigDict(extra="forbid")

    rule_id: str = Field(..., description='e.g. "IOT-LATCH-002".')
    category: Literal["dsp", "iot", "general"]
    severity: Literal["info", "warning", "error"]
    line: int = Field(..., ge=1, description="1-indexed line of the finding.")
    end_line: Optional[int] = Field(
        default=None,
        ge=1,
        description="Optional 1-indexed inclusive end line for multi-line findings.",
    )
    module: Optional[str] = Field(
        default=None,
        description="Enclosing Verilog module name, when known.",
    )
    title: str = Field(..., description="Short human-readable title.")
    explanation: str = Field(..., description="Technical VLSI explanation.")
    suggestion: Optional[CorrectedSnippet] = Field(
        default=None,
        description="Optional localized corrected snippet.",
    )


# ---------------------------------------------------------------------------
# Top-level responses
# ---------------------------------------------------------------------------


class LintResponse(BaseModel):
    """Successful response payload for ``POST /api/lint`` (HTTP 200).

    The literal ``ok=True`` discriminator lets the frontend narrow the
    union of ``LintResponse | LintErrorResponse`` without inspecting the
    HTTP status code.
    """

    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    model: str = Field(..., description='Echo of the configured Groq model, e.g. "llama3-70b-8192".')
    elapsed_ms: int = Field(
        ...,
        ge=0,
        description="Non-negative wall-clock duration of the request in milliseconds.",
    )
    issues: List[LintIssue] = Field(
        default_factory=list,
        description="Findings produced by deterministic rules and the AI router.",
    )
    corrected_code: str = Field(
        ...,
        description="Full corrected Verilog source. May equal the request code when no fixes apply.",
    )


class LintErrorResponse(BaseModel):
    """Error response payload for non-success HTTP statuses.

    Used by the 400 ``parse_error``, 422 ``validation_error``, 502
    ``llm_error``, and 500 ``internal_error`` paths.
    """

    model_config = ConfigDict(extra="forbid")

    ok: Literal[False] = False
    error_type: Literal[
        "parse_error",
        "validation_error",
        "llm_error",
        "internal_error",
    ]
    line: Optional[int] = Field(
        default=None,
        ge=1,
        description="Optional 1-indexed line associated with the error (e.g. parse error location).",
    )
    message: str = Field(..., description="Human-readable error message (secret-scrubbed).")


__all__ = [
    "LintRequest",
    "CorrectedSnippet",
    "LintIssue",
    "LintResponse",
    "LintErrorResponse",
]
