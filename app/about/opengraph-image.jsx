import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "../lib/og-image";
export const alt = "About Vicky Durel";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() { return createOgImage({ eyebrow: "About", title: "The tools changed. The instinct did not.", image: "/v4/vicky-durel-about-v1.png" }); }
