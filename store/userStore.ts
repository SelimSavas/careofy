import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OnboardingBackground, UserRoleType } from "@/types/user.types";

interface UserState {
  role: UserRoleType | null;
  displayName: string;
  background: Partial<OnboardingBackground> | null;
  setRole: (role: UserRoleType) => void;
  setDisplayName: (name: string) => void;
  setBackground: (b: Partial<OnboardingBackground>) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      role: null,
      displayName: "",
      background: null,
      setRole: (role) => set({ role }),
      setDisplayName: (displayName) => set({ displayName }),
      setBackground: (background) => set({ background }),
      reset: () => set({ role: null, displayName: "", background: null }),
    }),
    { name: "careofy-user" }
  )
);
