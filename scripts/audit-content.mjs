/**
 * Audit the frontend for hardcoded, visitor-facing content.
 *
 * The CMS is the source of truth for everything a visitor reads or sees. This
 * walks the TypeScript AST of every source file (not a regex, which misses copy
 * that shares a line with className) and reports:
 *
 *   - JSX text nodes                        <h2>Our story</h2>
 *   - content attributes                    alt="…" aria-label="…" placeholder="…"
 *   - prose string literals                 description = "We treat our guests…"
 *   - template strings with prose           `View photo ${n} of ${total}`
 *   - hrefs                                 "/rooms", "mailto:…", "tel:…"
 *   - imported image assets                 import hero from "@/assets/…"
 *
 * Things that are not content are deliberately ignored: Tailwind classes, SVG
 * geometry, import paths, CSS values, and anything inside src/components/ui
 * (the shadcn primitive kit).
 *
 * A finding can be acknowledged as a justified exception with a trailing
 * comment on the same line:   // content-exempt: <reason>
 * The reason is printed in the report so every exception stays visible.
 *
 * Usage:
 *   node scripts/audit-content.mjs            report, exit 1 if anything found
 *   node scripts/audit-content.mjs --json     machine-readable output
 */

import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SRC = join(ROOT, "src");

/** Directories that hold no visitor-facing content. */
const SKIP_DIRS = new Set(["ui", "node_modules"]);

/** Attributes whose string value is shown to, or read out to, a visitor. */
const CONTENT_ATTRS = new Set(["alt", "aria-label", "title", "placeholder", "aria-description"]);

/** Attributes that never carry content. */
const TECHNICAL_ATTRS = new Set([
  "className", "class", "id", "key", "type", "variant", "size", "role", "name", "autoComplete",
  "d", "viewBox", "fill", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "fillRule",
  "textAnchor", "fontFamily", "fontWeight", "letterSpacing", "transform", "preserveAspectRatio",
  "aria-controls", "aria-labelledby", "aria-live", "aria-hidden", "aria-modal", "aria-expanded",
  "htmlFor", "form", "loading", "fetchPriority", "decoding", "rel", "target", "method", "inputMode",
  "pattern", "min", "max", "step", "lang", "dir", "data-similar-card", "sizes", "mimeType",
]);

const BS = String.fromCharCode(92);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) out.push(full);
  }
  return out;
}

/** Is this string prose a visitor would read, rather than a technical token? */
function isProse(text) {
  const t = text.trim();
  if (t.length < 2) return false;
  if (!/[A-Za-zÀ-ÿ]{2,}/.test(t)) return false;
  // Tailwind / CSS class lists: lowercase tokens with -, :, [, /, .
  if (/^[a-z0-9:_\-[\]/.%#()!@&>~*+,= ]+$/.test(t) && /[-:[]/.test(t)) return false;
  // Single lowercase identifier-ish tokens (enum values, keys): "room", "section"
  if (/^[a-z][a-zA-Z0-9_-]*$/.test(t)) return false;
  // CSS values, colours, units
  if (/^(oklch|oklab|lab|rgb|rgba|hsl|var)\(/.test(t)) return false;
  if (/^[\d.]+(px|rem|em|ms|s|%|vw|vh|svh)?$/.test(t)) return false;
  // Font stacks
  if (/^["']?[A-Z][\w ]+["']?,\s*/.test(t) && /(serif|sans-serif|monospace)/.test(t)) return false;
  // Module specifiers and env names
  if (/^(@\/|\.\.?\/|node:|next\/|react|lucide|zod)/.test(t)) return false;
  if (/^[A-Z][A-Z0-9_]+$/.test(t)) return false;
  return true;
}

function isHref(text) {
  return /^(\/[a-z0-9#/-]*|#[a-z0-9-]*|mailto:|tel:|https?:\/\/)/i.test(text.trim()) && text.trim() !== "/";
}

function lineOf(sf, node) {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}

function exemption(lines, line) {
  const match = lines[line - 1]?.match(/content-exempt:\s*(.+?)\s*(\*\/|$)/);
  return match ? match[1] : null;
}

/**
 * Categories of string that are not editorial content. Each rule carries the
 * justification printed in the report, so every exception stays reviewable.
 */
const POLICY = [
  {
    reason: "React \"use client\" directive",
    test: (e) => e.text === "use client",
  },
  {
    reason: "inert href placeholder for items without a destination",
    test: (e) => e.kind === "link" && /^(href=)?"?#"?$/.test(e.text),
  },
  {
    reason: "Lovable/Supabase integration glue; no visitor-facing content",
    test: (e) => e.file.startsWith("src/integrations/"),
  },
  {
    reason: "developer-facing API path, header or error/log message",
    test: (e) =>
      /^src\/(lib\/cms\/|app\/api\/|lib\/newsletter\.functions\.ts)/.test(e.file) ||
      (e.file === "src/components/cms/icon-map.tsx" && e.text.startsWith("`[cms]")),
  },
  {
    reason: "font CDN URL",
    test: (e) => e.file === "src/app/layout.tsx" && /fonts\.(googleapis|gstatic)\.com/.test(e.text),
  },
  {
    reason: "inline CSS value",
    test: (e) => /(@keyframes|\bsolid\b.*(oklch|var\())/.test(e.text),
  },
  {
    reason: "substitution token replaced at runtime with the visitor's name",
    test: (e) => e.text === "{name}",
  },
  {
    reason: "screen-reader label for carousel, viewer or tab controls (UI chrome, not editorial copy)",
    test: (e) =>
      (e.kind === "attr:aria-label" || e.kind === "template") &&
      /^`?(Previous|Next|Close|Show|Breadcrumb|Thumbnails|Image \$|Choose a neighbourhood|Room booking|\$\{title\} photo|\$\{rating\} out of)/.test(e.text),
  },
];

const findings = [];
const exempt = [];

for (const file of walk(SRC)) {
  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const rel = relative(ROOT, file).split(BS).join("/");

  const record = (node, kind, text) => {
    const line = lineOf(sf, node);
    const entry = { file: rel, line, kind, text: text.replace(/\s+/g, " ").trim().slice(0, 110) };
    const reason = exemption(lines, line) ?? POLICY.find((rule) => rule.test(entry))?.reason;
    if (reason) exempt.push({ ...entry, reason });
    else findings.push(entry);
  };

  const visit = (node) => {
    // Imported image/video assets: the asset itself is content.
    if (ts.isImportDeclaration(node)) {
      const spec = node.moduleSpecifier.text;
      if (/^@\/assets\//.test(spec)) record(node, "asset-import", spec);
      return;
    }

    if (ts.isJsxText(node)) {
      const text = node.getText(sf);
      if (isProse(text)) record(node, "jsx-text", text);
    }

    if (ts.isJsxAttribute(node) && node.initializer) {
      const name = node.name.getText(sf);
      if (TECHNICAL_ATTRS.has(name)) return; // do not descend into class lists etc.

      const init = node.initializer;
      const literal = ts.isStringLiteral(init)
        ? init
        : ts.isJsxExpression(init) && init.expression && ts.isStringLiteral(init.expression)
          ? init.expression
          : null;

      if (literal) {
        const value = literal.text;
        if (name === "href" || name === "to") {
          if (isHref(value)) record(node, "link", `${name}="${value}"`);
        } else if (CONTENT_ATTRS.has(name) ? /[A-Za-z]{2,}/.test(value) : isProse(value)) {
          record(node, `attr:${name}`, value);
        }
        return;
      }
    }

    if (ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node)) {
      const raw = node.getText(sf).slice(1, -1).replace(/\$\{[^}]*\}/g, "");
      // Ignore template strings used to build class names.
      const parent = node.parent;
      const inClass =
        (parent && ts.isJsxExpression(parent) && parent.parent && ts.isJsxAttribute(parent.parent) &&
          TECHNICAL_ATTRS.has(parent.parent.name.getText(sf)));
      if (!inClass && isProse(raw) && / [a-z]{2,}/i.test(raw)) record(node, "template", node.getText(sf));
    }

    if (ts.isStringLiteral(node)) {
      const parent = node.parent;
      // Already handled, or not content-bearing positions.
      if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) return;
      if (ts.isJsxAttribute(parent)) return;
      if (ts.isJsxExpression(parent) && ts.isJsxAttribute(parent.parent)) return;
      if (ts.isLiteralTypeNode(parent)) return; // type-level unions like "hero" | "section"
      if (ts.isElementAccessExpression(parent)) return;
      if (ts.isCallExpression(parent)) {
        const callee = parent.expression.getText(sf);
        // cn(...), console.*, fetch(...), env lookups, errors meant for developers.
        if (/^(cn|clsx|twMerge|console\.\w+|fetch|require|new Error|Error|process\.env)/.test(callee)) return;
        if (/(querySelector|addEventListener|removeEventListener|getElementById|setAttribute|headers\.get|searchParams\.get|get)$/.test(callee)) return;
      }
      if (ts.isNewExpression(parent)) return;
      if (ts.isCaseClause(parent) || ts.isBinaryExpression(parent)) return; // comparisons, switch keys
      if (ts.isPropertyAssignment(parent) && parent.initializer === node) {
        const key = parent.name.getText(sf);
        if (TECHNICAL_ATTRS.has(key) || /^(className|icon|shape|variant|kind|mode|tag|method|cache|transform|transition|fontFamily|color|background|borderTop|borderLeft|fontStyle|lineHeight)$/.test(key)) return;
      }

      const text = node.text;
      if (isHref(text)) record(node, "link", text);
      else if (isProse(text)) record(node, "string", text);
    }

    ts.forEachChild(node, visit);
  };

  visit(sf);
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ findings, exempt }, null, 2));
} else {
  const byFile = new Map();
  for (const f of findings) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }

  for (const [file, items] of [...byFile].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${file}  (${items.length})`);
    for (const item of items) console.log(`  ${String(item.line).padStart(4)}  ${item.kind.padEnd(16)} ${item.text}`);
  }

  if (exempt.length) {
    console.log(`\n--- ${exempt.length} acknowledged exception(s) ---`);
    for (const item of exempt) console.log(`  ${item.file}:${item.line}  ${item.text}\n      reason: ${item.reason}`);
  }

  console.log(`\n${findings.length} hardcoded content item(s) in ${byFile.size} file(s); ${exempt.length} exception(s).`);
}

process.exit(findings.length ? 1 : 0);
