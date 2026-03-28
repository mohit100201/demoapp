import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  const isBrowser = typeof window !== "undefined";
  const saved = isBrowser ? localStorage.getItem("theme") : null;
  const prefersDark = isBrowser ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;
  const isDark = saved ? saved === "dark" : prefersDark;

  if (isBrowser && isDark) document.documentElement.classList.add("dark");

  return {
    isDark,
    toggle: () =>
      set((state) => {
        const next = !state.isDark;
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", next);
          localStorage.setItem("theme", next ? "dark" : "light");
        }
        return { isDark: next };
      }),
    setDark: (dark) =>
      set(() => {
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", dark);
          localStorage.setItem("theme", dark ? "dark" : "light");
        }
        return { isDark: dark };
      }),
  };
});
