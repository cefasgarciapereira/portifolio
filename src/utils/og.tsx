import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import type { Language } from "@/contexts/language";

/**
 * Social preview cards (og:image) in the site's dark retro style, rendered to
 * PNG at build time. PNG at 1200×630 is the one format every link-preview
 * crawler accepts (WhatsApp, LinkedIn, Slack, X…), and a flat card like this
 * stays far below WhatsApp's ~300 KB limit.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const COLORS = {
  bg: "#121212",
  surface: "#171717",
  ink: "#e4e1db",
  strong: "#f6f4f0",
  muted: "#8f8c87",
  line: "#2e2e2e",
  accent: "#5b86ff",
  glitchA: "#ff5a1f",
  glitchB: "#5b86ff",
};

const FONT_DIR = path.join(process.cwd(), "src", "assets", "fonts");

async function loadFonts() {
  const read = (file: string) => fs.readFile(path.join(FONT_DIR, file));
  const [display, mono, monoBold] = await Promise.all([
    read("archivo-expanded-800.woff"),
    read("jetbrains-mono-400.woff"),
    read("jetbrains-mono-700.woff"),
  ]);
  return [
    { name: "Archivo", data: display, weight: 800 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: monoBold, weight: 700 as const, style: "normal" as const },
  ];
}

/** Bigger type for short titles, smaller for long ones, so every title fits. */
function titleSize(title: string): number {
  const length = title.length;
  if (length <= 28) return 76;
  if (length <= 48) return 64;
  if (length <= 72) return 54;
  if (length <= 96) return 46;
  return 40;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export interface OgCardProps {
  /** Small label at the top right, e.g. "~/blog". */
  kicker: string;
  title: string;
  description?: string;
  /** Bottom-right details, e.g. ["2024-07-24", "6 min", "pt-BR"]. */
  meta?: string[];
  locale: Language;
}

export async function renderOgImage({ kicker, title, description, meta = [], locale }: OgCardProps) {
  const footer = locale === "pt" ? "cefas.me/pt" : "cefas.me";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 72px 48px",
          background: COLORS.bg,
          color: COLORS.ink,
          fontFamily: "JetBrains Mono",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: 46,
              color: COLORS.strong,
              letterSpacing: "-0.04em",
              textShadow: `-3px 0 ${COLORS.glitchA}, 3px 0 ${COLORS.glitchB}`,
            }}
          >
            cefas
          </div>
          <div style={{ display: "flex", fontSize: 24, color: COLORS.muted }}>{kicker}</div>
        </div>

        <div style={{ display: "flex", height: 1, marginTop: 28, background: COLORS.line }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: titleSize(title),
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: COLORS.strong,
            }}
          >
            {truncate(title, 120)}
          </div>
          {description ? (
            <div style={{ display: "flex", marginTop: 28, fontSize: 26, lineHeight: 1.45, color: COLORS.muted }}>
              {truncate(description, 160)}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22 }}>
          <div style={{ display: "flex", alignItems: "center", color: COLORS.accent, fontWeight: 700 }}>
            <div style={{ display: "flex", width: 14, height: 26, marginRight: 14, background: COLORS.accent }} />
            {footer}
          </div>
          <div style={{ display: "flex", color: COLORS.muted }}>{meta.join("  ·  ")}</div>
        </div>

        {/* Glitch bar along the bottom edge. */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", height: 8 }}>
          <div style={{ display: "flex", width: "62%", background: COLORS.glitchB }} />
          <div style={{ display: "flex", width: "38%", background: COLORS.glitchA }} />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() }
  );
}
