import { type StrapiImage } from "./strapiResponsiveImage";

export interface Homepage {
  title: string;
  subtitle: string;
  highlight_medias?: {
    data: StrapiImage[];
  };
}
