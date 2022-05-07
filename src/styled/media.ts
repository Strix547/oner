const createMedia = (maxWidth: number) => {
  return `@media (max-width: ${maxWidth}px)`
}

export const media = {
  createMedia,
  laptop: createMedia(1200),
  tablet: createMedia(760),
  mobile: createMedia(470)
}
