import { render } from "@testing-library/react";
import React from "react";

import { EmojiImg } from "./EmojiImg";

const emoji = {
  sheetX: 2,
  sheetY: 2,
  google: 1,
  twitter: 1,
  facebook: 1,
  apple: 1,
  native: "😀",
  name: "grinning face",
  category: "Smileys & People",
  sortOrder: 1,
  keywords: ["face", "grin", "grinning face"],
  description: "grinning face",
  version: 1,
  img: "emoji-11-7.webp",
};

describe("EmojiImg", () => {
  it("renders emojiImg without crashing", () => {
    const emojiComponent = render(<EmojiImg emoji={emoji} />);
    expect(emojiComponent).toBeTruthy();
  });

  it("renders emoji with props", async () => {
    const { findByTestId } = render(
      <EmojiImg emoji={emoji} set="apple" quality="clean" sheetSize={64} />
    );
    const emojiComponent = await findByTestId("emoji-img");

    expect(emojiComponent.getAttribute("aria-label")).toBe(emoji.native);
    expect(emojiComponent.getAttribute("data-image")).toBe(
      `https://cdn.jsdelivr.net/npm/emoji-datasource-apple-split@1.0.6/img/sheets-clean/64/apple/${emoji.img}`
    );
  });

  it("renders with specified size", async () => {
    const { findByTestId } = render(<EmojiImg emoji={emoji} size={64} />);

    const emojiComponent = await findByTestId("emoji-img");

    expect(emojiComponent.style.width).toBe("64px");
    expect(emojiComponent.style.height).toBe("64px");
  });
});
