export function sleep(time: number = 1500): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(() => resolve(), time));
}
