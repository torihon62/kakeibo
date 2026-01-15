export function deepEqual(a: unknown, b: unknown): boolean {
  // 同一参照 or プリミティブ一致
  if (Object.is(a, b)) return true;

  // Date比較
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 型不一致 or null
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  // Array判定
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }

    return true;
  }

  // Object
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;

    const valA = (a as Record<string, unknown>)[key];
    const valB = (b as Record<string, unknown>)[key];

    if (!deepEqual(valA, valB)) return false;
  }

  return true;
}
