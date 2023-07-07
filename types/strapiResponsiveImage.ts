interface StrapiImage {
  url: string;
  width: number;
  height: number;
}

export interface StrapiResponsiveImage extends StrapiImage {
  alternativeText?: string;
  formats: {
    desktop: StrapiImage;
    mobile: StrapiImage;
    tablet: StrapiImage;
    thumbnail: StrapiImage;
  };
}
