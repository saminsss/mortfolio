import { create } from "zustand";

type PremiumModalState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const usePremiumModal = create<PremiumModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default usePremiumModal;
