interface Experience {
  id: number,
  name: string,
  date: string,
  place?: string,
  category: string
}

interface Skill {
  id: number,
  attributes: {
    name: string,
    level?: number,
    category?: string,
    icon_name: string,
  }
}

interface Interest {
  id: number,
  name: string,
  icon_name: string,
}

interface SocialLink {
  id: number,
  name: string,
  url: string,
  icon_name: string,
}

export interface About {
  intro: string,
  experience: Experience[],
  skills: {
    data: Skill[],
  },
  interests: Interest[],
  social_links: SocialLink[],
}