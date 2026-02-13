export interface Language {
  name: string;
  level: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  status: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  type: "lang" | "web" | "mobile" | "backend" | "tools";
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  description: string;
  link?: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
}

export interface UserData {
  name: string;
  role: string;
  location: string;
  phone: string;
  bio: string;
  languages: Language[];
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  contact: Contact;
}
