import { useState, useEffect, SetStateAction, Dispatch } from "react";

/**
 * A state where it has dependencies that should be synced with them
 */
export default function useDependentState<S = undefined>(
  initialValue: S | undefined,
  dependencies: []
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [state, setState] = useState<S | undefined>(initialValue);

  return [state, setState];
}
