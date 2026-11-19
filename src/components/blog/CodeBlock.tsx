import { Children, isValidElement, type ReactNode } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import diff from "highlight.js/lib/languages/diff";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import php from "highlight.js/lib/languages/php";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import "highlight.js/styles/github-dark.css";

// Only these languages are bundled (the full set is ~3x larger).
// Aliases like ts, js, jsx, tsx, sh, html and yml come with the definitions.
// Add a language here if a post needs one that isn't listed.
const languages = {
  bash, css, diff, dockerfile, go, java, javascript, json, php, sql, typescript, xml, yaml,
};
for (const [name, lang] of Object.entries(languages)) {
  hljs.registerLanguage(name, lang);
}

/** Renders a fenced code block from react-markdown with syntax highlighting. */
export function CodeBlock({ children }: { children?: ReactNode }) {
  const code = Children.toArray(children)[0];
  if (!isValidElement<{ className?: string; children?: ReactNode }>(code)) {
    return <pre>{children}</pre>;
  }

  const text = String(code.props.children ?? "").replace(/\n$/, "");
  const lang = /language-([\w-]+)/.exec(code.props.className ?? "")?.[1];
  const html =
    lang && hljs.getLanguage(lang)
      ? hljs.highlight(text, { language: lang, ignoreIllegals: true }).value
      : null;

  return (
    <pre className="rounded-xl overflow-x-auto text-sm">
      {html ? (
        <code
          className={`hljs language-${lang}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <code className="hljs">{text}</code>
      )}
    </pre>
  );
}
