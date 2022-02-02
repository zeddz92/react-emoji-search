import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { SkinTonePicker } from "./SkinTonePicker";

const emojiData = {
  sheetX: 2,
  sheetY: 0,
  google: 1,
  twitter: 1,
  facebook: 1,
  apple: 1,
  native: "👋",
  name: "waving hand sign",
  category: "Smileys & People",
  sortOrder: 157,
  keywords: ["hand", "wave", "waving"],
  skinVariations: [
    {
      sheetX: 2,
      sheetY: 1,
      google: 1,
      twitter: 1,
      facebook: 1,
      apple: 1,
      native: "👋🏻",
      img: "emoji-11-3.webp",
    },
    {
      sheetX: 2,
      sheetY: 2,
      google: 1,
      twitter: 1,
      facebook: 1,
      apple: 1,
      native: "👋🏼",
      img: "emoji-11-3.webp",
    },
    {
      sheetX: 2,
      sheetY: 3,
      google: 1,
      twitter: 1,
      facebook: 1,
      apple: 1,
      native: "👋🏽",
      img: "emoji-11-3.webp",
    },
    {
      sheetX: 2,
      sheetY: 4,
      google: 1,
      twitter: 1,
      facebook: 1,
      apple: 1,
      native: "👋🏾",
      img: "emoji-11-3.webp",
    },
    {
      sheetX: 2,
      sheetY: 0,
      google: 1,
      twitter: 1,
      facebook: 1,
      apple: 1,
      native: "👋🏿",
      img: "emoji-12-3.webp",
    },
  ],
  description: "waving hand",
  version: 0.6,
  img: "emoji-11-3.webp",
};

const onEmojiClick = jest.fn();

describe("SkinTonePicker", () => {
  it("renders without crashing", () => {
    const emoji = render(
      <SkinTonePicker
        emoji={null}
        sheetSize={32}
        isOpen={true}
        targetElement={null}
        emojiSize={32}
        set="apple"
        boundaryElement={null}
      />
    );
    expect(emoji).toBeTruthy();
  });

  it("renders emoji variations", async () => {
    const { findByTestId } = render(
      <SkinTonePicker
        emoji={emojiData}
        sheetSize={32}
        isOpen={true}
        targetElement={null}
        emojiSize={32}
        set="apple"
        boundaryElement={null}
      />
    );
    const skinTonePicker = await findByTestId("skin-tone-picker");

    expect(skinTonePicker.childElementCount).toBe(
      emojiData.skinVariations.length + 1
    );
  });

  it("calls onClick callback when emoji is clicked", async () => {
    const { findByTestId } = render(
      <SkinTonePicker
        onEmojiClick={onEmojiClick}
        emoji={emojiData}
        sheetSize={32}
        isOpen={true}
        targetElement={null}
        emojiSize={32}
        set="apple"
        boundaryElement={null}
      />
    );
    const skinTonePicker = await findByTestId("skin-tone-picker");
    fireEvent.click(skinTonePicker.childNodes.item(0));
    fireEvent.click(skinTonePicker.childNodes.item(1));

    expect(onEmojiClick).toHaveBeenCalledTimes(2);
  });

  it("renders only main emoji if it does not have skin variations", async () => {
    const { findByTestId } = render(
      <SkinTonePicker
        emoji={{ ...emojiData, skinVariations: undefined }}
        sheetSize={32}
        isOpen={true}
        targetElement={null}
        emojiSize={32}
        set="apple"
        boundaryElement={null}
      />
    );
    const skinTonePicker = await findByTestId("skin-tone-picker");

    expect(skinTonePicker.childElementCount).toBe(1);
  });

  it("render nothing when isOpen is false", async () => {
    const { queryByTestId } = render(
      <SkinTonePicker
        emoji={emojiData}
        sheetSize={32}
        isOpen={false}
        targetElement={null}
        emojiSize={32}
        set="apple"
        boundaryElement={null}
      />
    );
    const skinTonePicker = queryByTestId("skin-tone-picker");

    expect(skinTonePicker).toBeNull();
  });
});
