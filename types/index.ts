import { Question } from "./forum.types";

export type orderingOptionType = {
  id: number;
  label: string;
  icon?: string;
  selected?: boolean;
  filter: (list: any[]) => any[];
};

export type fileUploadType = {
  uri: string;
  type: string; // mimeType
  name: string; // file name
};
