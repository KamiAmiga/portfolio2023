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
  alternativeText?: string;
  width: number;
  height: number;
  formats: Record<string, StrapiImageData>;
}

export interface StrapiImage {
  id: number;
  attributes: StrapiImageResponsiveData;
}
