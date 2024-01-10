import { Skill } from "./skills";

export interface Experience {
  id: number;
  name: string;
  date: string;
  place?: string | null;
  category: string;
}

export interface Interest {
  id: number;
  name: string;
  icon_name: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon_name: string;
}

export interface About {
  intro: string;
  experience: Experience[];
  skills: {
    data: Skill[];
  };
  interests: Interest[];
  social_links: SocialLink[];
}
