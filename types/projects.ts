import { StrapiResponsiveImage } from "./strapiResponsiveImage";

interface CoverImage {
  id: number,
  attributes: StrapiResponsiveImage
}

export interface Project {
  name: string,
  year: number,
  cover_image: {
    data: CoverImage
  },
}