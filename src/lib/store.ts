import { create } from "zustand";

type AppState = {
  leadOpen: boolean;
  leadSource: string;
  packageId: string;
  openLead: (source?: string, packageId?: string) => void;
  closeLead: () => void;
};

export const useApp = create<AppState>((set) => ({
  leadOpen: false,
  leadSource: "hero",
  packageId: "",
  openLead: (source = "hero", packageId = "") =>
    set({ leadOpen: true, leadSource: source, packageId }),
  closeLead: () => set({ leadOpen: false }),
}));
