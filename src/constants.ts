import { EmojiPickerProps } from "./types/emoji";

export const LOCAL_STORAGE_RECENT = "react-emoji-search-recent";
export const LOCAL_STORAGE_VARIATION = "react-emoji-search-variations";

export const categories: { [key: string]: string } = {
  Recent: "recent",
  "Smileys & People": "smileys-people",
  "Animals & Nature": "animals-nature",
  "Food & Drink": "food-drink",
  Activity: "activity",
  "Travel & Places": "travel-places",
  Objects: "objects",
  Symbols: "symbols",
  Flags: "flags",
};

export const pickerDefaultProps: EmojiPickerProps = {
  tabsVariant: "default",
  mode: "dark",
  set: "apple",
  emojiVersion: 12.0,
  emojiSpacing: 12,
  emojiSize: 32,
  sheetSize: 64,
  quality: "clean",
};
