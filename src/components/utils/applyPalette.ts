import { palettes } from "../db/palettes";

export default function applyPalette(paletteName: string) {
  const palette = palettes[paletteName];
  Object.entries(palette).forEach(([key, value]) => {
    document.body.style.setProperty(key, value);
  });
}
