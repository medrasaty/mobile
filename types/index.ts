import { Question } from "./forum.types";

export type orderingOptionType = {
  id: number;
  label: string;
  icon?: string;
  selected?: boolean;
  filter: (list: any[]) => any[];
};
