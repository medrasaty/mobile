import { Question } from "@/types/forum.types";
import { School } from "@/types/school.types";
import { router } from "expo-router";

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

export const schools = {
  detail: (schoolId: School["id"]) => `/schools/${schoolId}/detail`,
};

// Experminent
export const goToSchool = (schoolId: School["id"]) => {
  router.push(schools.detail(schoolId));
};
