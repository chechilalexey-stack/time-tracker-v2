export default function withTimeout<T>(promise: Promise<T>, ms = 5000) {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), ms)
    )
  ]);
}