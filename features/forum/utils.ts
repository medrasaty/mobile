import { Answer, Question, RatingValue, Reply } from "@/types/forum.types";

export function calcNewRatingsValue(
  previousRatingsValue: number, // question.ratings_value
  previousUserRating: RatingValue,
  currentRating: RatingValue
) {
  /**
   *
   * calculate the new ratings value for question rating and answer ratings as well,
   * @param{previousRatingsValue}: previous rating, number
   * @param{previouseUserRating}: previous user Rating
   * @param{currentRatingValue}: the current rating value
   */

  return previousRatingsValue - previousUserRating + currentRating;
}

type instanceType = Question | Answer | Reply;
export function transformDates(instance: instanceType): instanceType {
  return {
    ...instance,
    created: new Date(instance.created),
    modified: new Date(instance.modified),
  };
}

type ObjType<T> = {
  other;
  created: string;
  modified: string;
};

function datesTransformer<T>(obj: T) {
  return {
    ...obj,
    created: new Date(obj.created),
    modified: new Date(obj.modified),
  };
}
