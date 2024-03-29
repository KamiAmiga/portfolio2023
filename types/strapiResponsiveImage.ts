interface StrapiImageData {
  url: string;
  width: number;
  height: number;
}

export enum StrapiResponsiveFormats {
  FullWidth = "full_width",
  HalfWidth = "half_width",
  FourthWidth = "fourth_width",
}

export interface StrapiImageResponsiveData extends StrapiImageData {
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
  formats: Record<string, StrapiImageData>;
}

export interface StrapiImage {
  id: number;
  attributes: StrapiImageResponsiveData;
}

export interface StrapiSVGMedia {
  id: number;
  attributes: {
    alternativeText?: string | null;
    caption?: string | null;
    width: number;
    height: number;
    formats?: null | {};
    hash: string;
    ext: string;
    mime: string;
    name: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
  }
}

