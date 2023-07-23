import { StrapiImage } from "./strapiResponsiveImage";
import { Skill } from "./skills";

export enum ProjectMainImageTypes {
  UIMobileDesktop = "ui-mobile_desktop",
  UIDesktop = "ui-desktop",
  UIMobile = "ui-mobile",
  DesignPrint = "design-print",
  DesignVisualID = "design-visual_id",
  Drawing = "drawing",
}

export interface Project {
  slug: string;
  name: string;
  year: number;
  description: string;
  image: any;
  skills: {
    data: Skill[];
  };
  cover_image: {
    data: StrapiImage;
  };
}

export interface Projects {
  data: Project[];
}
