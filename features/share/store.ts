import { create } from "zustand";
import { FriendUser } from "../friendship/types";

type ShareStore = {
  selectedUsers: FriendUser[];
  addUser: (id: FriendUser) => void;
  removeUser: (id: FriendUser) => void;
  clear: () => void;
  searchValue: string;
  updateSearchValue: (text: string) => void;
};

export const useShareStore = create<ShareStore>((set) => ({
  selectedUsers: [],
  addUser: (user) => {
    set((state) => {
      return {
        selectedUsers: [...state.selectedUsers, user],
      };
    });
  },
  removeUser: (user) => {
    set((state) => {
      return {
        selectedUsers: state.selectedUsers.filter((i) => i.id !== user.id),
      };
    });
  },
  searchValue: "",
  updateSearchValue: (text) => {
    set((state) => {
      return {
        ...state,
        searchValue: text,
      };
    });
  },

  clear: () => {
    set((state) => {
      return {
        selectedUsers: [],
        searchValue: "",
      };
    });
  },
}));
