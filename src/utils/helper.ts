export function arrayBufferToBlob(buffer: ArrayBuffer, mime: string) {
  return new Blob([buffer], { type: mime })
}
