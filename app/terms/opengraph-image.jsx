import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "../lib/og-image";
export const alt = "Terms of service for vickydurel.me";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() { return createOgImage({ eyebrow: "vickydurel.me", title: "Terms of Service" }); }
