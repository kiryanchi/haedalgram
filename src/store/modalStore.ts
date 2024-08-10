// src/store/modalStore.ts

import { create } from "zustand";

type ModalStore = {
  isOpenAddPostModal: boolean;
  openAddPostModal: () => void;
  closeAddPostModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpenAddPostModal: false,
  openAddPostModal: () => set({ isOpenAddPostModal: true }),
  closeAddPostModal: () => set({ isOpenAddPostModal: false }),
}));

export default useModalStore;
