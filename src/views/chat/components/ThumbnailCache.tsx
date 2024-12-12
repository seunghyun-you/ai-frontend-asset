const imageCache: { [key: string]: string } = {};

export function createThumbnailUrl(imageUrl: string, uuid: string): string | null {
    imageCache[uuid] = imageUrl;
    return uuid;
}

export function getThumbnailUrl(uuid: string): string | null {
  if (imageCache[uuid]) {
    return imageCache[uuid];
  }
  return null;
}

export function revokeThumbnailUrl(uuid: string | null): void {
  if (imageCache[uuid]) {
    URL.revokeObjectURL(uuid);
    delete imageCache[uuid];
  }
}