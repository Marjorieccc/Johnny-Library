export function convertValuesToLowerCase(
  obj: Record<string, string | string[]>
): Record<string, string | string[]> {
  const newObj: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      newObj[key] = value.toLowerCase();
    } else if (Array.isArray(value)) {
      newObj[key] = value.map((v) =>
        typeof v === "string" ? v.toLowerCase() : v
      );
    }
  }

  return newObj;
}
