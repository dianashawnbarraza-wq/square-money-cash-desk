/**
 * Square seller design tokens.
 * Recreated from Checking / SPOS (`square-checking-spos` `src/ds`) after the
 * Origin repo was not cloneable. Do not invent a third palette.
 *
 * Emphasis #101010, fill/40 #F0F0F0, link/selected #005AD9 (not #006AFF).
 */

export const color = {
  emphasis: "#101010",
  surface: "#FFFFFF",
  fill40: "#F0F0F0",
  page: "#FAFAFA",
  line: "#E5E5E5",
  link: "#005AD9",
  selected: "#005AD9",
  text90: "rgba(16, 16, 16, 0.90)",
  text55: "rgba(16, 16, 16, 0.55)",
  text30: "rgba(16, 16, 16, 0.30)",
  watchBg: "#F8E7C1",
  watchFg: "#C47B17",
  growBg: "#D4F0E4",
  growFg: "#005E5E",
  learnBg: "#E8F1FC",
  learnFg: "#005AD9",
  actBg: "#E8F1FC",
  actFg: "#005AD9",
} as const;

export const space = {
  base: 8,
} as const;

export const radius = {
  card: 12,
  pill: 9999,
  sheet: 24,
} as const;

export const type = {
  font: '"Square Sans Text", "Square Sans", "Cash Sans", var(--font-inter), Inter, system-ui, sans-serif',
} as const;

export const control = {
  primaryMinHeight: 48,
} as const;
