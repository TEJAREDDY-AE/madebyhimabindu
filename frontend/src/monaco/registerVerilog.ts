/**
 * Monaco language registration for Verilog / SystemVerilog.
 *
 * Exposes {@link registerVerilog}, which registers the `verilog` language with a
 * Monarch tokenizer, a keyword set, and an editor language configuration
 * (comments, brackets, auto-closing pairs).
 *
 * Satisfies Requirement 19.1: the Editor Shell registers the `verilog` language
 * with Monaco including a tokenizer and Verilog keyword set on mount.
 */

import type * as Monaco from "monaco-editor";

/** Canonical language id registered with Monaco. */
export const VERILOG_LANGUAGE_ID = "verilog";

/**
 * Verilog / SystemVerilog reserved keywords used for tokenization.
 *
 * Includes the keywords explicitly called out by the design (`module`,
 * `endmodule`, `always`, `always_ff`, `always_comb`, `assign`, `posedge`,
 * `negedge`) plus the broader set of common structural, procedural, and
 * declaration keywords.
 */
export const VERILOG_KEYWORDS: readonly string[] = [
  // Module / structure
  "module",
  "endmodule",
  "macromodule",
  "primitive",
  "endprimitive",
  "package",
  "endpackage",
  "interface",
  "endinterface",
  "generate",
  "endgenerate",
  "genvar",
  // Ports / directions
  "input",
  "output",
  "inout",
  "port",
  // Nets / variables / types
  "wire",
  "reg",
  "logic",
  "integer",
  "real",
  "time",
  "tri",
  "wand",
  "wor",
  "supply0",
  "supply1",
  "signed",
  "unsigned",
  "bit",
  "byte",
  "int",
  "longint",
  "shortint",
  "typedef",
  "enum",
  "struct",
  "union",
  "var",
  // Procedural blocks
  "always",
  "always_ff",
  "always_comb",
  "always_latch",
  "initial",
  "final",
  "assign",
  "deassign",
  "force",
  "release",
  "begin",
  "end",
  "fork",
  "join",
  "function",
  "endfunction",
  "task",
  "endtask",
  // Control flow
  "if",
  "else",
  "case",
  "casex",
  "casez",
  "endcase",
  "default",
  "for",
  "while",
  "repeat",
  "forever",
  "do",
  "break",
  "continue",
  "return",
  // Parameters
  "parameter",
  "localparam",
  "defparam",
  "specparam",
  // Edge / timing
  "posedge",
  "negedge",
  "edge",
  "wait",
  "disable",
  // Instantiation / connectivity
  "generate",
  "defparam",
  // Misc declarations
  "automatic",
  "static",
  "const",
  "extern",
  "virtual",
  "pure",
  "modport",
  "clocking",
  "endclocking",
  // SystemVerilog assertions / misc
  "assert",
  "assume",
  "cover",
  "property",
  "endproperty",
  "sequence",
  "endsequence",
];

/**
 * Built-in / system functions and gate primitives recognized as type keywords.
 */
const VERILOG_TYPE_KEYWORDS: readonly string[] = [
  "and",
  "or",
  "not",
  "nand",
  "nor",
  "xor",
  "xnor",
  "buf",
  "bufif0",
  "bufif1",
  "notif0",
  "notif1",
  "pmos",
  "nmos",
  "cmos",
  "tran",
  "tranif0",
  "tranif1",
];

/**
 * The Monarch tokenizer definition for Verilog.
 *
 * Handles line/block comments, strings, system tasks (`$display`), compiler
 * directives (`` `timescale ``), based numbers (`8'hFF`, `4'b10`), decimals,
 * identifiers (split into keywords vs. plain identifiers), and operators.
 */
export const verilogMonarchTokens: Monaco.languages.IMonarchLanguage = {
  defaultToken: "",
  ignoreCase: false,
  keywords: [...VERILOG_KEYWORDS],
  typeKeywords: [...VERILOG_TYPE_KEYWORDS],

  operators: [
    "=",
    "<=",
    "==",
    "!=",
    "===",
    "!==",
    "&&",
    "||",
    "!",
    "&",
    "|",
    "^",
    "~",
    "+",
    "-",
    "*",
    "/",
    "%",
    "<",
    ">",
    ">=",
    "<<",
    ">>",
    "<<<",
    ">>>",
    "?",
    ":",
  ],

  symbols: /[=><!~?:&|+\-*/^%]+/,

  tokenizer: {
    root: [
      // System tasks/functions: $display, $finish, etc.
      [/\$[a-zA-Z_]\w*/, "predefined"],

      // Compiler directives: `timescale, `define, `include, etc.
      [/`[a-zA-Z_]\w*/, "keyword.directive"],

      // Identifiers and keywords
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@typeKeywords": "type",
            "@default": "identifier",
          },
        },
      ],

      // Whitespace and comments
      { include: "@whitespace" },

      // Based numbers: 8'hFF, 4'b1010, 'd42, 16'sd-1
      [/\d*'[sS]?[bBoOdDhH][0-9a-fA-FxXzZ_?]+/, "number"],
      [/'[sS]?[bBoOdDhH][0-9a-fA-FxXzZ_?]+/, "number"],

      // Decimal / real numbers
      [/\d+\.\d+([eE][-+]?\d+)?/, "number.float"],
      [/\d[\d_]*/, "number"],

      // Delimiters and brackets
      [/[{}()[\]]/, "@brackets"],
      [/[;,.]/, "delimiter"],

      // Operators
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],

      // Strings
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, { token: "comment", next: "@comment" }],
      [/\/\/.*$/, "comment"],
    ],

    comment: [
      [/[^/*]+/, "comment"],
      [/\*\//, { token: "comment", next: "@pop" }],
      [/[/*]/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],
  },
};

/**
 * The editor language configuration: comments, bracket matching, auto-closing
 * pairs, and surrounding pairs for the Verilog language.
 */
export const verilogLanguageConfiguration: Monaco.languages.LanguageConfiguration =
  {
    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["begin", "end"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"', notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
    ],
  };

/**
 * Register the `verilog` language with the supplied Monaco instance.
 *
 * Idempotent: if the language is already registered (e.g. across hot-module
 * reloads or multiple editor mounts), this is a no-op so providers are not
 * stacked redundantly.
 *
 * @param monaco - The Monaco namespace, typically provided by
 *   `@monaco-editor/react`'s `loader` or the `onMount`/`beforeMount` callbacks.
 */
export function registerVerilog(monaco: typeof Monaco): void {
  const alreadyRegistered = monaco.languages
    .getLanguages()
    .some((lang) => lang.id === VERILOG_LANGUAGE_ID);

  if (alreadyRegistered) {
    return;
  }

  monaco.languages.register({
    id: VERILOG_LANGUAGE_ID,
    extensions: [".v", ".vh", ".sv", ".svh"],
    aliases: ["Verilog", "SystemVerilog", "verilog"],
  });

  monaco.languages.setMonarchTokensProvider(
    VERILOG_LANGUAGE_ID,
    verilogMonarchTokens,
  );

  monaco.languages.setLanguageConfiguration(
    VERILOG_LANGUAGE_ID,
    verilogLanguageConfiguration,
  );
}

export default registerVerilog;
