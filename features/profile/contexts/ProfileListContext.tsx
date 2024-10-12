import React, { useContext, createContext, useState } from "react";
import { Snackbar } from "react-native-paper";
import { UseQueryResult } from "@tanstack/react-query";
import { ProfileListChoices } from "@/features/profile/types.types";
import { SortingOption } from "../types.types";

export type ProfileListContextType = {
  selectedList: ProfileListChoices;
  setSelectedList: React.Dispatch<React.SetStateAction<ProfileListChoices>>;
  questionsSelectedSort: SortingOption<any>;
  answersSelectedSort: SortingOption<any>;
  setQuestionsSelectedSort: React.Dispatch<
    React.SetStateAction<SortingOption<any>>
  >;
  setAnswersSelectedSort: React.Dispatch<
    React.SetStateAction<SortingOption<any>>
  >;
  viewableItemsHeight: number;
  setViewableItemsHeight: React.Dispatch<React.SetStateAction<number>>;
};

export const ProfileListContext = createContext<ProfileListContextType | null>(
  null
);

export function ProfileListProvider({ children }: React.PropsWithChildren) {
  const [selectedList, setSelectedList] = useState<ProfileListChoices>(
    ProfileListChoices.QUESTIONS
  );

  const [questionsSelectedSort, setQuestionsSelectedSort] = useState<
    SortingOption<any>
  >({
    key: "-created",
    label: "Newest",
  });

  const [answersSelectedSort, setAnswersSelectedSort] = useState<
    SortingOption<any>
  >({
    key: "-created",
    label: "Newest",
  });

  const [viewableItemsHeight, setViewableItemsHeight] = useState(0);

  return (
    <ProfileListContext.Provider
      value={{
        selectedList,
        setSelectedList,
        questionsSelectedSort,
        answersSelectedSort,
        setQuestionsSelectedSort,
        setAnswersSelectedSort,
        viewableItemsHeight,
        setViewableItemsHeight,
      }}
    >
      {children}
    </ProfileListContext.Provider>
  );
}

export function useProfileListContext() {
  const value = useContext(ProfileListContext);

  if (!value) {
    throw new Error("useProfileList must be used within a ProfileListProvider");
  }

  return value;
}
