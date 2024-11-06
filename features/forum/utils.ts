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
/**
 * @deprecated
 */
export function transformDates(instance: instanceType): instanceType {
  return {
    ...instance,
    created: new Date(instance.created),
    modified: new Date(instance.modified),
  };
}

type ObjType = {
  created: string;
  modified: string;
  [key: string]: any;
};

export function datesTransformer(obj: ObjType) {
  return {
    ...obj,
    created: new Date(obj.created),
    modified: new Date(obj.modified),
  };
}
