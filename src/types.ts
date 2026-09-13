export type ThemeMode = 'dark' | 'light' | 'emerald' | 'indigo';

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface Skill {
  name: string;
  level: number; // 1 to 100
  iconName?: string;
  isTop?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  category: 'fullstack' | 'frontend' | 'backend' | 'cloud-ai' | 'mobile';
  tagline: string;
  description: string;
  challenge?: string;
  solution?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  highlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  description: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  relationship: string;
}

export interface ProfileData {
  fullName: string;
  preferredName?: string;
  title: string;
  subtitles: string[];
  tagline: string;
  bioSummary: string;
  fullBio: string;
  location: string;
  email: string;
  phone?: string;
  linkedInUrl: string;
  githubUrl: string;
  websiteUrl?: string;
  twitterUrl?: string;
  availability: 'Available Immediately' | 'Open to Offers' | 'Currently Employed' | 'Freelance / Contract';
  yearsExperience: number;
  avatarUrl: string;
  heroMetrics: MetricItem[];
  philosophy: {
    title: string;
    description: string;
    icon: string;
  }[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
}
