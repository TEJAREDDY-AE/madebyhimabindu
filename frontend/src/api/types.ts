/**
 * TypeScript types mirroring the backend Pydantic schemas for the AI Verilog Linter.
 *
 * Source of truth: `backend/app/schemas.py` and the "Issue & Response" section of
 * `.kiro/specs/ai-verilog-linter/design.md`.
 *
 * Field names use snake_case to match the backend JSON wire format exactly so
 * responses can be assigned without remapping.
 */

/** Categories assigned to a `LintIssue`. */
export type IssueCategory = "dsp" | "iot" | "general";

/** Severity levels for a `LintIssue`. */
export type IssueSeverity = "info" | "warning" | "error";

/** Discriminator values for `LintErrorResponse.error_type`. */
export type LintErrorType =
  | "parse_error"
  | "validation_error"
  | "llm_error"
  | "internal_error";

/**
 * A localized fix proposed by the linter, covering lines `start_line..end_line`
 * (1-indexed, inclusive) of the original source.
 *
 * Backend invariants (enforced server-side):
 *   - `start_line >= 1`
 *   - `start_line <= end_line`
 */
export interface CorrectedSnippet {
  start_line: number;
  end_line: number;
  original: string;
  corrected: string;
}

/**
 * A single lint finding emitted by the deterministic rule pre-scanner or by
 * the LLM router.
 *
 * Backend invariants (enforced server-side):
 *   - `line >= 1` and `line <= count_lines(request.code)`
 */
export interface LintIssue {
  rule_id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  line: number;
  end_line?: number | null;
  module?: string | null;
  title: string;
  explanation: string;
  suggestion?: CorrectedSnippet | null;
}

/**
 * Successful lint response body returned by `POST /api/lint` with HTTP 200.
 * The literal `ok: true` field discriminates it from `LintErrorResponse`.
 */
export interface LintResponse {
  ok: true;
  issues: LintIssue[];
  corrected_code: string;
  model: string;
  elapsed_ms: number;
}

/**
 * Error response body returned by `POST /api/lint` for non-2xx outcomes.
 * The literal `ok: false` field discriminates it from `LintResponse`.
 *
 * `line` is populated only when the error is associated with a specific source
 * line (e.g. `error_type === "parse_error"`).
 */
export interface LintErrorResponse {
  ok: false;
  error_type: LintErrorType;
  line?: number | null;
  message: string;
}

/**
 * Discriminated union of every possible response body for `POST /api/lint`.
 * Narrow on the `ok` field to access the appropriate shape.
 */
export type LintApiResponse = LintResponse | LintErrorResponse;
