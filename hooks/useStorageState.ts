import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  /**
   * set a key value paire in secure store for Android/iOS platforms and localStorage on web platforms.
   * @param key string : The key to store the value
   * @param value string | null : The value to store or null to remove the key
   */
  if (Platform.OS === "web") {
    // For web, we use localStorage to store the data
    try {
      if (value === null) {
        // user provided key and not a value, so we remove the key
        window.localStorage.removeItem(key);
      } else {
        // user provided both key and a value, so we save the key-value pair
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("LocalStorage is unavailable", error);
    }
  } else {
    if (value === null) {
      // user provided key and not a value, so we remove the key
      await SecureStore.deleteItemAsync(key);
    } else {
      // user provided both key and a value, so we save the key-value pair
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (error) {
        console.error("LocalStorage is unavailable", error);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => setState(value));
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
