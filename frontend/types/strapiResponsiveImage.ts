interface StrapiImageData {
  url: string;
  width: number;
  height: number;
}

export type StrapiResponsiveFormats = "full_width" | "half_width" | "fourth_width"

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
    formats?: null | object;
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

