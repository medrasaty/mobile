import { Question } from "@/types/forum.types";

type questionDetailRouteParams = {
  questionId: Question["id"];
  [key: string]: any;
};

export function questionDetail(params: questionDetailRouteParams) {
  return {
    pathname: `/questions/details`,
    params: params,
  };
}

export function editQuestion(params: { questionId: Question["id"] }) {
  return {
    pathname: `/questions/edit`,
    params: params,
  };
}
