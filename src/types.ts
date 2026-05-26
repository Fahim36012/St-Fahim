export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  details?: string;
  category: 'thesis' | 'lab' | 'case' | 'experience';
}

export interface Equipment {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  iconName: string;
  ratingPercentage: number;
}
