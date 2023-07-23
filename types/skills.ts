export interface Skill {
  id: number;
  attributes: {
    name: string;
    level?: number;
    category?: string;
    icon_name: string;
  };
}
