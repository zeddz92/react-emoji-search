import { act, fireEvent, render } from "@testing-library/react";
import React from "react";

import { smoothScroll } from "../../utils/smoothScroll";
import { EmojiPicker } from "./EmojiPicker";

jest.mock("../../utils/smoothScroll", () => ({
  smoothScroll: jest.fn().mockResolvedValue(null),
}));

const onEmojiClick = jest.fn();

describe("EmojiPicker", () => {
  afterEach(() => {
    onEmojiClick.mockReset();
    jest.resetModules();
  });
  it("renders without crashing", () => {
    const emojiPicker = render(<EmojiPicker />);
    expect(emojiPicker).toBeTruthy();
  });

  it("calls onEmojiClick callback when an emoji is clicked", async () => {
    const { findAllByTestId } = render(
      <EmojiPicker onEmojiClick={onEmojiClick} />
    );

    const emojis = await findAllByTestId("Smileys & People-emoji");

    fireEvent.click(emojis[0]);

    expect(onEmojiClick).toHaveBeenCalled();
  });

  it("filter emojis on search", async () => {
    const { getByTestId, queryByTestId } = render(<EmojiPicker />);

    const searchInput = getByTestId("search-input");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "flag" } });
      await new Promise((r) => setTimeout(r, 250));
    });

    const indicator = queryByTestId("indicator");
    const resultEmojis = queryByTestId("result-emojis");
    const emojiList = queryByTestId("emoji-list");

    // Indicator should hide when searching
    expect(indicator).toBeNull();
    // Emoji list should be hidden to display results from search
    expect(emojiList?.classList).toContain("hidden");
    // Display results from search
    expect(resultEmojis).toBeTruthy();
  });

  it("scrolls to category when tab is clicked", async () => {
    const { getByTestId } = render(<EmojiPicker />);

    const tabs = getByTestId("tabs");
    fireEvent.click(tabs.childNodes.item(0));
    await new Promise((r) => setTimeout(r, 250));

    expect(smoothScroll).toHaveBeenCalled();
  });
});
