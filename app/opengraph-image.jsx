import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "./lib/og-image";
export const alt = "Vicky Durel NOUPO, product builder and systems operator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() { return createOgImage({ eyebrow: "Product builder · Systems operator", title: "Systems that hold up after the demo." }); }
