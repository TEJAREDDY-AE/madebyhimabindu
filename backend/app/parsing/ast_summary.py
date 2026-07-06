"""AST summary data models for the parsing layer.

This module defines the Pydantic models that constitute the normalized,
JSON-serializable AST summary produced by the Pyverilog adapter.

These models form the typed boundary between the Parsing Layer and the
AI Routing Layer (see Requirement 18). To preserve that boundary, this
file MUST NOT import from ``langchain`` or ``groq`` packages.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, field_validator


class PortInfo(BaseModel):
    """A module port (input, output, or inout) with its bit width."""

    name: str
    direction: Literal["input", "output", "inout"]
    width: int = Field(..., ge=1)


class AlwaysBlockInfo(BaseModel):
    """An ``always`` block with its sensitivity classification.

    ``sensitivity`` values:
        * ``comb``           - combinational (``always_comb`` / ``always @*``)
        * ``ff_posedge``     - sequential, posedge-triggered
        * ``ff_negedge``     - sequential, negedge-triggered
        * ``latch_suspect``  - structurally suspicious; may infer a latch
    """

    line: int = Field(..., ge=1)
    sensitivity: Literal["comb", "ff_posedge", "ff_negedge", "latch_suspect"]
    has_default_assignment: bool
    assigned_signals: list[str]

    @field_validator("assigned_signals")
    @classmethod
    def _no_duplicate_assigned_signals(cls, value: list[str]) -> list[str]:
        if len(value) != len(set(value)):
            seen: set[str] = set()
            duplicates: list[str] = []
            for name in value:
                if name in seen and name not in duplicates:
                    duplicates.append(name)
                seen.add(name)
            raise ValueError(
                "assigned_signals must not contain duplicates; "
                f"duplicates found: {duplicates}"
            )
        return value


class CaseBlockInfo(BaseModel):
    """A ``case`` statement, typically used to encode an FSM."""

    line: int = Field(..., ge=1)
    states: list[str]
    has_default: bool


class ArithOpInfo(BaseModel):
    """An arithmetic operation with operand and result bit widths."""

    line: int = Field(..., ge=1)
    op: Literal["add", "sub", "mul", "mac", "shift"]
    lhs_width: int = Field(..., ge=1)
    rhs_width: int = Field(..., ge=1)
    result_width: int = Field(..., ge=1)


class ModuleInfo(BaseModel):
    """A single Verilog module summarized for downstream analysis."""

    name: str
    ports: list[PortInfo]
    clocks: list[str]
    resets: list[str]
    always_blocks: list[AlwaysBlockInfo]
    case_blocks: list[CaseBlockInfo]
    arith_ops: list[ArithOpInfo]
    submodules: list[str]


class AstSummary(BaseModel):
    """Top-level AST summary returned by the parsing layer.

    ``raw_ast_json`` is a bounded, JSON-serializable representation of the
    underlying Pyverilog AST and is included so the AI routing layer can
    reason about structure beyond what the typed summaries expose.
    """

    modules: list[ModuleInfo]
    raw_ast_json: dict


__all__ = [
    "PortInfo",
    "AlwaysBlockInfo",
    "CaseBlockInfo",
    "ArithOpInfo",
    "ModuleInfo",
    "AstSummary",
]
