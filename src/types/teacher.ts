import { Review } from "./review";

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  avatar_url: string;
  rating: number;
  experience: string;
  lesson_info: string;
  lessons_done: number;
  price_per_hour: number;
  conditions: string[];
  languages: string[];
  levels?: string[];
  reviews?: Review[];
}

export interface TeacherRaw {
  name: string;
  surname: string;
  avatar_url?: string;
  rating: number;
  experience: string;
  lesson_info: string;
  lessons_done: number;
  price_per_hour: number;
  conditions?: Record<string, string>;
  languages?: Record<string, true>;
  levels?: Record<string, true>;
  reviews?: Record<string, Review>;
}
