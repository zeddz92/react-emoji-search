import { getRecentEmojis } from "./getRecentEmojis";
import { getItem } from "../useLocalStorage";

jest.mock("../useLocalStorage", () => ({
  getItem: jest.fn().mockReturnValue({ "😃": 2, "😁": 1 }),
}));

const getItemMock = getItem as jest.Mock;

const emojis = [
  {
    sheetX: 2,
    sheetY: 3,
    google: 1,
    twitter: 1,
    facebook: 1,
    apple: 1,
    native: "😁",
    name: "grinning face with smiling eyes",
    category: "Smileys & People",
    sortOrder: 4,
    keywords: [
      "beaming face with smiling eyes",
      "eye",
      "face",
      "grin",
      "smile",
    ],
    description: "beaming face with smiling eyes",
    version: 0.6,
    img: "emoji-11-7.webp",
  },
  {
    sheetX: 2,
    sheetY: 0,
    google: 1,
    twitter: 1,
    facebook: 1,
    apple: 1,
    native: "😃",
    name: "smiling face with open mouth",
    category: "Smileys & People",
    sortOrder: 2,
    keywords: ["face", "grinning face with big eyes", "mouth", "open", "smile"],
    description: "grinning face with big eyes",
    version: 0.6,
    img: "emoji-12-7.webp",
  },
];

describe("getRecentEmojis", () => {
  it("orders emojis asc", () => {
    const recentEmojis = getRecentEmojis(emojis, "native");
    expect(recentEmojis).toEqual([emojis[1], emojis[0]]);
  });

  it("orders emojis desc", () => {
    getItemMock.mockReturnValue({ "😃": 2, "😁": 4 });
    const recentEmojis = getRecentEmojis(emojis, "native");
    expect(recentEmojis).toEqual([emojis[0], emojis[1]]);
  });

  it("don't order recent emojis when already ordered", () => {
    getItemMock.mockReturnValue({ "😃": 1, "😁": 1 });
    const recentEmojis = getRecentEmojis(emojis, "native");
    expect(recentEmojis).toEqual([emojis[1], emojis[0]]);
  });

  it("returns empty array when there's no recent emojis", () => {
    getItemMock.mockReturnValue(undefined);
    const recentEmojis = getRecentEmojis(emojis, "native");
    expect(recentEmojis).toEqual([]);
  });
});
