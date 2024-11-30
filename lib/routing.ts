import { Question } from "@/types/forum.types";
import { School } from "@/types/school.types";
import { BaseUser } from "@/types/user.types";
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

export const users = {
  details: (id: BaseUser["id"]) => `/users/${id}/detail`,
};

export const path = {
  users: {
    details: (id: BaseUser["id"]) => `/users/${id}/detail`,

    content: (id: BaseUser["id"]) => ({
      pathname: `/users/[id]/content`,
      params: {
        id: id,
      },
    }),

    goToUser: (id: BaseUser["id"]) => {
      router.push(path.users.details(id));
    },
  },
  schools: {
    detail: (schoolId: School["id"]) => `/schools/${schoolId}/detail`,
  },

  questions: {
    detail: (id: Question["id"], params?: any) =>
      questionDetail({ ...params, questionId: id }),
    new: `/questions/new`,
  },

  settings: {
    main: `/settings/`,
  },
};
