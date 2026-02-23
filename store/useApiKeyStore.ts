import { create } from "zustand";
import { persist } from "zustand/middleware";

type ApiKeyStore = {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
};

export const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (key: string) => set({ apiKey: key || null }),
      clearApiKey: () => set({ apiKey: null }),
    }),
    {
      name: "talk-gemini-api-key",
    },
  ),
);

