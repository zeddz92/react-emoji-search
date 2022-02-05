import { BaseEmoji } from "../types/emoji";

import { LOCAL_STORAGE_RECENT, LOCAL_STORAGE_VARIATION } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export const useEmojiLocalStorage = () => {
  const [recentEmojis, setRecentEmojis] = useLocalStorage<{
    [key: string]: number;
  }>(LOCAL_STORAGE_RECENT, {});
  const [variations, setVariations] = useLocalStorage<{
    [key: string]: BaseEmoji;
  }>(LOCAL_STORAGE_VARIATION, {});

  const _setRecentEmojis = (native: string) => {
    setRecentEmojis(LOCAL_STORAGE_RECENT, {
      ...recentEmojis,
      [native]: recentEmojis[native] + 1 || 1,
    });
  };

  const _setVariations = (native: string, emoji: BaseEmoji) => {
    setVariations(LOCAL_STORAGE_VARIATION, {
      ...variations,
      [native]: emoji,
    });
  };

  return {
    setRecentEmojis: _setRecentEmojis,
    setVariations: _setVariations,
    variations,
  };
};
