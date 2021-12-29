import emojis from "../data/emojis";
import { Emoji, EmojiSet } from "../types/emoji";
import { getRecentEmojis } from "./getRecentEmojis";

export interface GroupedEmojis {
  [key: string]: Emoji[] | undefined;
}

export const searchEmoji = (text: string, set: EmojiSet) => {
  return emojis.filter(
    (emoji) =>
      (set === "native" || emoji[set] === 1) &&
      emoji.keywords.some((word: string) => word.startsWith(text))
  );
};

export const getGroupedEmojis = (set: EmojiSet) => {
  const defaultGroupedEmojisValue = {
    Recent: getRecentEmojis(emojis, set),
    "Smileys & People": [],
    "Animals & Nature": [],
    "Food & Drink": [],
    Activity: [],
    "Travel & Places": [],
    Objects: [],
    Symbols: [],
    Flags: [],
  };

  const result = emojis.reduce((acc: GroupedEmojis, emoji) => {
    if (set !== "native" && emoji[set] !== 1) {
      return acc;
    }

    acc[emoji.category]?.push(emoji);

    return acc;
  }, defaultGroupedEmojisValue);
  if (!result.Recent) {
    delete result["Recent"];
  }

  return result;
};
