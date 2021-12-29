export interface EmojiSkin {
  unified: string;
  non_qualified: string | null;
  image: string;
  sheet_x: number;
  sheet_y: number;
  added_in: string;
  has_img_apple: boolean;
  has_img_google: boolean;
  has_img_twitter: boolean;
  has_img_facebook: boolean;
}

export interface BaseEmoji {
  google: number;
  twitter: number;
  facebook: number;
  apple: number;
  native: string;
  sheetX: number;
  sheetY: number;
}

export type EmojiSet = "native" | "google" | "apple" | "facebook" | "twitter";
export type EmojiQuality = "clean" | "128" | "256";

export interface Emoji {
  google: number;
  twitter: number;
  facebook: number;
  apple: number;
  native: string;
  sheetX: number;
  sheetY: number;
  keywords: string[];
  name: string;
  sortOrder: number;
  skinVariations?: BaseEmoji[];
}
