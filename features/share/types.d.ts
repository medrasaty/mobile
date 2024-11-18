export type ShareQuestionData = {
  question: Question["id"];
  shared_with: BaseUser["id"][]; // list of users ids
  comment?: string;
};
