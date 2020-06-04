export function isDevMode(): boolean {
  // 在构建过程中，process.env.NODE_ENV 将会被相应的值所取代。
  return process.env.NODE_ENV === "development";
}
