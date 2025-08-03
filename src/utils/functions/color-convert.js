// utils/color.ts
export function rgbaToHex(rgba) {
  if (!rgba.startsWith("rgb")) return rgba;

  const result = rgba
    .replace(/\s/g, "")
    .match(/^rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)$/);

  if (!result) return rgba;

  const [_, r, g, b, a = "1"] = result;
  const toHex = (v) => Math.round(+v).toString(16).padStart(2, "0");

  const alpha = Math.round(parseFloat(a) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a !== "1" ? alpha : ""}`;
}
