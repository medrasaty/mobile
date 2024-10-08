import { Question } from "./forum.types";

export type filterOptionType = {
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
