export enum ProfileListChoices {
  QUESTIONS = "questions",
  ANSWERS = "answers",
}

export type NavigatorButtonTypeValues =
  | ProfileListChoices.QUESTIONS
  | ProfileListChoices.ANSWERS;

export type NavigatorButtonType = {
  index: number;
  label: string;
  value: NavigatorButtonTypeValues;
};

export type SortingOption<T> = {
  label: string;
  key: T;
};

export type TypedData<T> = {
  type: T;
  payload: any;
};
