import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "./seo";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const EXTENSION_MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };

function readLocalImageAsDataUri(publicPath) {
  const extension = publicPath.split(".").pop().toLowerCase();
  const bytes = readFileSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
  return `data:${EXTENSION_MIME[extension] || "image/png"};base64,${bytes.toString("base64")}`;
}

export function createOgImage({ eyebrow, title, image = "/v4/vicky-durel-hero-v2.png", align = "left" }) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#070b0d", color: "#f3f0e8", fontFamily: "Arial, sans-serif" }}>
      <img src={readLocalImageAsDataUri(image)} alt="" width="1200" height="630" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: align === "right" ? "linear-gradient(90deg, rgba(7,11,13,.12), rgba(7,11,13,.96) 64%)" : "linear-gradient(90deg, rgba(7,11,13,.96) 38%, rgba(7,11,13,.12))" }} />
      <div style={{ width: "62%", padding: "68px", display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: align === "right" ? "auto" : 0, position: "relative" }}>
        <div style={{ display: "flex", color: "#d2ad68", fontSize: 20, letterSpacing: ".14em", textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: title.length > 55 ? 52 : 64, lineHeight: 1.02, letterSpacing: "-.04em", fontWeight: 700 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 24 }}>{SITE_NAME} · vickydurel.me</div>
        </div>
      </div>
    </div>,
    OG_SIZE
  );
}
