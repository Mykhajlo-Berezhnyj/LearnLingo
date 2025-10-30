import { Review } from "./review";

export type Teacher = {
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
};
