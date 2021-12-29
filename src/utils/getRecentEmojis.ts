import { LOCAL_STORAGE_RECENT } from "../constants";
import { Emoji, EmojiSet } from "../types/emoji";
import { getItem } from "./useLocalStorage";

const _sortByFrequency = (a: [string, number], b: [string, number]) => {
  if (a[1] > b[1]) {
    return -1;
  }
  if (a[1] < b[1]) {
    return 1;
  }
  return 0;
};

export const getRecentEmojis = (emojis: Emoji[], set: EmojiSet) => {
  const recentEmojis = getItem<{ [key: string]: number }>(LOCAL_STORAGE_RECENT);
  if (!recentEmojis) {
    return undefined;
  }
  return Object.entries(recentEmojis)
    .sort(_sortByFrequency)
    .reduce((acc: Emoji[], [unicode]) => {
      const emoji = emojis.find(
        (emoji) => emoji[set] && emoji.native === unicode
      );
      if (emoji) {
        acc.push(emoji);
      }
      return acc;
    }, []);
};
