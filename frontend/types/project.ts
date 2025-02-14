import type { StrapiImage, StrapiSVGMedia } from "./strapiResponsiveImage";
import type { Skill } from "./skills";

export enum ProjectMainImageTypes {
  UIMobileDesktop = "ui-mobile_desktop",
  UIDesktop = "ui-desktop",
  UIMobile = "ui-mobile",
  DesignPrint = "design-print",
  DesignVisualID = "design-visual_id",
  Drawing = "drawing",
}

export interface ProjectTypography {
  id: number;
  typo_name: string;
  typo_visual: { data: StrapiSVGMedia }
}

export interface ProjectColor {
  id: number;
  color_code: string;
  color_name: string;
}

export interface ProjectMainImage {
  id: number;
  images: {
    id: number;
    data: StrapiImage[];
  };
  type: ProjectMainImageTypes;
}

export interface Project {
  slug: string;
  name: string;
  year: number;
  description: string;
  main_images: ProjectMainImage[];
  typography: ProjectTypography[];
  colors: ProjectColor[];
  secondary_images: {
    data: StrapiImage[];
  };
  skills: {
    data: Skill[];
  };
  cover_image_portrait: {
    data: StrapiImage;
  };
  cover_image_landscape: {
    data: StrapiImage;
  };
}

export interface Projects {
  data: Project[];
}
