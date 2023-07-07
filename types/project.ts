import { StrapiResponsiveImage } from "./strapiResponsiveImage";

interface CoverImage {
  id: number;
  attributes: StrapiResponsiveImage;
}
export interface Project {
  slug: string;
  name: string;
  year: number;
  description: string;
  image: any;
  skills: any;
  cover_image: {
    data: CoverImage;
  };
}

export interface Projects {
  data: Project[];
}
