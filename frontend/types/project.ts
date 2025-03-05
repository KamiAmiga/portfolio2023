import type { StrapiImage } from "./strapiResponsiveImage";

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
  typo_visual: { data: StrapiImage }
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
