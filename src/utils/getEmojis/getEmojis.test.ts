import { searchEmoji, getGroupedEmojis } from "./getEmojis";

describe("getEmojis", () => {
  describe("searchEmoji", () => {
    it("finds emojis based on keyword", () => {
      expect(searchEmoji("hand")).toBeTruthy();
    });
  });

  describe("getGroupedEmojis", () => {
    it("returns emoji object", () => {
      expect(getGroupedEmojis()).toBeTruthy();
    });
  });
});
