import { act, fireEvent, render } from "@testing-library/react";
import React from "react";

import { smoothScroll } from "../../utils/smoothScroll";
import { EmojiPicker } from "./EmojiPicker";

jest.mock("../../utils/smoothScroll", () => ({
  smoothScroll: jest.fn().mockResolvedValue(null),
}));

jest.mock("../../utils/handleScroll", () => ({
  handleScroll: jest.fn().mockReturnValue(0),
}));

const onEmojiClick = jest.fn();

describe("EmojiPicker", () => {
  afterEach(() => {
    onEmojiClick.mockReset();
    jest.resetModules();
  });
  it("renders emojiPicker without crashing", () => {
    const emojiPicker = render(
      <EmojiPicker
        set="apple"
        mode="dark"
        styles={{
          backgroundColor: "black",
          fontColor: "black",
          indicatorColor: "black",
          tabsFontColor: "black",
          searchFontColor: "black",
          searchBackgroundColor: "black",
          skinTonePickerBackgroundColor: "black",
        }}
      />
    );
    expect(emojiPicker).toBeTruthy();
  });

  it("calls onEmojiClick callback when an emoji is clicked", async () => {
    const { getAllByTestId } = render(
      <EmojiPicker onEmojiClick={onEmojiClick} />
    );

    const emojis = getAllByTestId("emoji-grid")[1];
    const emojiBtn = emojis.querySelectorAll("button").item(0);

    fireEvent.click(emojiBtn);

    expect(onEmojiClick).toHaveBeenCalled();
  });

  it("filter emojis on search", async () => {
    const { getByTestId, queryByTestId } = render(
      <EmojiPicker onEmojiClick={onEmojiClick} />
    );

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

    const resultEmojisBtn = resultEmojis?.querySelectorAll("button");
    if (resultEmojisBtn) {
      fireEvent.click(resultEmojisBtn.item(0));
      expect(onEmojiClick).toHaveBeenCalled();
    }
  });

  it("shows skinVariation popover on onLongPress for result emojis", async () => {
    const { getByTestId, getAllByText } = render(<EmojiPicker set="native" />);

    const searchInput = getByTestId("search-input");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "hand" } });
      await new Promise((r) => setTimeout(r, 250));

      const emojiBtn = getAllByText("🖕")[0];

      fireEvent.mouseDown(emojiBtn);
      await new Promise((_) => setTimeout(_, 250));
      fireEvent.click(emojiBtn, "onLongPress");

      // wait for popover to open
      await new Promise((_) => setTimeout(_, 100));
    });

    const skinTonePicker = getByTestId("skin-tone-picker");

    const skinVariationEmojiBtn = skinTonePicker.childNodes.item(0);

    expect(skinVariationEmojiBtn.textContent).toBe("🖕");

    // fireEvent.click(skinVariationEmojiBtn);
  });

  it("scrolls to category when tab is clicked", async () => {
    const { getByTestId } = render(<EmojiPicker />);

    const tabs = getByTestId("tabs");
    fireEvent.click(tabs.childNodes.item(0));
    await new Promise((_) => setTimeout(_, 0));

    expect(smoothScroll).toHaveBeenCalled();
  });

  it("shows skinVariation popover on onLongPress", async () => {
    const { getByText, getByTestId } = render(
      <EmojiPicker set="native" onEmojiClick={onEmojiClick} />
    );

    const emojiBtn = getByText("🖕");

    await act(async () => {
      fireEvent.mouseDown(emojiBtn);
      await new Promise((r) => setTimeout(r, 250));
      fireEvent.click(emojiBtn, "onLongPress");

      // wait for popover to open
      await new Promise((_) => setTimeout(_, 100));
    });

    const skinTonePicker = getByTestId("skin-tone-picker");

    expect(skinTonePicker.childNodes.item(0).textContent).toBe("🖕");
  });

  it("on scroll down hide search input", async () => {
    const { queryByTestId, getByTestId } = render(
      <EmojiPicker set="native" onEmojiClick={onEmojiClick} />
    );

    const emojiList = getByTestId("emoji-list");
    const scrollDiv = document.createElement("div");

    fireEvent.scroll(emojiList, {
      target: scrollDiv,
    });
    fireEvent.wheel(emojiList, {
      deltaY: 1,
      target: { scrollTop: 151 },
    });

    // wait for hiding animation
    await new Promise((_) => setTimeout(_, 500));

    const searchInput = queryByTestId("search-input");
    expect(searchInput).toBeNull();

    fireEvent.wheel(emojiList, {
      deltaY: 0,
      target: { scrollTop: 151 },
    });

    expect(queryByTestId("search-input")).toBeTruthy();
  });

  it("hides results when search input is empty", async () => {
    const { queryByTestId, getByTestId } = render(
      <EmojiPicker set="native" onEmojiClick={onEmojiClick} />
    );

    const searchInput = getByTestId("search-input");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "new thing" } });
      await new Promise((_) => setTimeout(_, 0));

      fireEvent.change(searchInput, { target: { value: "" } });
      await new Promise((_) => setTimeout(_, 0));
    });

    const resultEmojis = queryByTestId("result-emojis");
    expect(resultEmojis).toBeNull();
  });

  it("hides skinVariation popover when click outside", async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <EmojiPicker set="native" onEmojiClick={onEmojiClick} />
    );

    const emojiBtn = getByText("👦");
    await act(async () => {
      fireEvent.click(emojiBtn);
      // wait for popover to open
      await new Promise((_) => setTimeout(_, 100));
    });

    const skinTonePicker = getByTestId("skin-tone-picker");

    const skinVariationEmojiBtn = skinTonePicker.childNodes.item(0);

    expect(skinVariationEmojiBtn.textContent).toBe("👦");

    const emojiList = getByTestId("emoji-picker");
    fireEvent.click(emojiList);

    expect(queryByTestId("skin-tone-picker")).toBeNull();
  });

  it("hides skinVariation popover on when a variant is clicked", async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <EmojiPicker set="native" />
    );

    const emojiBtn = getByText("🤦‍♂️");
    await act(async () => {
      fireEvent.click(emojiBtn);
      // wait for popover to open
      await new Promise((_) => setTimeout(_, 100));
    });

    const skinTonePicker = getByTestId("skin-tone-picker");

    const skinVariationEmojiBtn = skinTonePicker.childNodes.item(0);

    fireEvent.click(skinVariationEmojiBtn);

    expect(queryByTestId("skin-tone-picker")).toBeNull();
  });
});
