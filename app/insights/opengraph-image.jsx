import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "../lib/og-image";
export const alt = "Insights by Vicky Durel NOUPO";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() { return createOgImage({ eyebrow: "Insights · Field notes", title: "Clear thinking for the next operating shift.", image: "/v4/vicky-durel-insights-v1.png", align: "right" }); }
