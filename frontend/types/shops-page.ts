interface Link {
  id: number;
  name: string;
  url: string;
  icon_name: string;
}

export interface ShopsPage {
  title: string;
  subtitle: string;
  shops_list: Link[];
  social_links: Link[];
}
