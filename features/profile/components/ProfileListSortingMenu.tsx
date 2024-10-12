import FilterOptionsView from "@/components/FilterOptionsView";
import { useProfileListContext } from "../contexts/ProfileListContext";
import { questionOrderKeys } from "../hooks/useProfileQuestions";
import { ProfileListChoices, SortingOption } from "../types.types";
import SortingMenu from "./SortingMenu";

const sortingOptions = [
  {
    label: "Newest",
    key: questionOrderKeys.NEWEST,
  },
  {
    label: "Oldest",
    key: questionOrderKeys.OLDEST,
  },
  {
    label: "Most rated",
    key: questionOrderKeys.MOST_RATED,
  },
];

export const ProfileListSortingMenu = () => {
  const { selectedList, setQuestionsSelectedSort, setAnswersSelectedSort } =
    useProfileListContext();

  const handleOnSelect = (option: SortingOption<any>) => {
    if (selectedList === ProfileListChoices.QUESTIONS) {
      setQuestionsSelectedSort(option);
    } else {
      setAnswersSelectedSort(option);
    }
  };

  return <SortingMenu onSelect={handleOnSelect} options={sortingOptions} />;
};
