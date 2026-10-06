const DIGITS = "0123456789";
export const ALPHANUMERIC = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/** Turns text into a number. The same text always gives the same number. */
function hashText(text: string): number {
  let hash = 2166136261;
  for (const character of text) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  }
  return hash >>> 0;
}

/**
 * Text that looks random but is always the same for the same seed,
 * so the mock data differs between inputs and stays the same between renders.
 */
export function mockText(seed: string, length: number, alphabet = DIGITS): string {
  let state = hashText(seed);
  let text = "";

  while (text.length < length) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    text += alphabet[(state >>> 16) % alphabet.length];
  }
  return text;
}

/** Takes `count` items in a row, starting at a position that depends on the seed. */
export function mockPick<Item>(items: Item[], seed: string, count: number): Item[] {
  const start = hashText(seed) % items.length;
  return Array.from({ length: count }, (_, offset) => items[(start + offset) % items.length]);
}
