import { Question } from "@/types/forum.types";

export function questionDetail(params: any = {}) {
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
