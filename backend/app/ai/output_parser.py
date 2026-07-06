"""Typed output contract for the AI routing layer.

Defines the structured object the LLM is expected to return
(:class:`LintResult`) along with the domain-specific exceptions the AI layer
raises when the Groq API misbehaves (:class:`GroqAPIError`) or when the model
emits output that does not validate against the schema
(:class:`OutputParseError`).

This module deliberately depends only on :mod:`app.schemas` (for
:class:`LintIssue`) and Pydantic. It MUST NOT import Pyverilog: the AI layer is
kept strictly isolated from the parsing layer (Requirement 18.2 / 18.3).
"""

from __future__ import annotations

from typing import List

from pydantic import BaseModel, ConfigDict, Field

from app.schemas import LintIssue


class LintResult(BaseModel):
    """Structured result parsed from the LLM response.

    Mirrors the success-path subset of :class:`app.schemas.LintResponse`: the
    list of findings the model produced and the full corrected Verilog source.
    Fed to LangChain's ``PydanticOutputParser`` so malformed model output is
    rejected before it reaches the HTTP surface.

    Attributes:
        issues: Findings produced (or refined) by the AI router.
        corrected_code: Full corrected Verilog source. May equal the request
            code when no fixes apply.
    """

    model_config = ConfigDict(extra="forbid")

    issues: List[LintIssue] = Field(
        default_factory=list,
        description="Findings produced or refined by the AI router.",
    )
    corrected_code: str = Field(
        ...,
        description="Full corrected Verilog source. May equal the input when no fixes apply.",
    )


class OutputParseError(Exception):
    """Raised when the LLM response fails to validate against ``LintResult``.

    Wraps the underlying ``pydantic.ValidationError`` message so the HTTP layer
    can map it to an HTTP 502 ``llm_error`` with a ``"malformed LLM output"``
    prefix.
    """


class GroqAPIError(Exception):
    """Raised when the Groq API call fails (network, auth, rate limit, etc.).

    Wraps the underlying ``groq.APIError`` message so the HTTP layer can map it
    to an HTTP 502 ``llm_error``.
    """


__all__ = [
    "LintResult",
    "OutputParseError",
    "GroqAPIError",
]
