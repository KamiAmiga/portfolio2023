export interface Project {
  id: number,
  attributes: {
    name: string,
    description: string,
    image: any,
    skills: any,
  }
}

export interface Projects {
  data: Project[]
}
