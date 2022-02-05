import { render } from "@testing-library/react";
import React from "react";

import { EmojiNative } from "./EmojiNative";

const emoji = "😀";

describe("EmojiNative", () => {
  it("renders emojiNative without crashing", () => {
    const emojiComponent = render(<EmojiNative emoji={emoji} />);
    expect(emojiComponent).toBeTruthy();
  });

  it("renders emoji with props", async () => {
    const { findByText } = render(<EmojiNative emoji={emoji} />);
    const emojiComponent = await findByText(emoji);
    expect(emojiComponent).toBeTruthy();
  });

  it("renders with specified size", async () => {
    const { findByTestId } = render(<EmojiNative emoji={emoji} size={64} />);

    const emojiComponent = await findByTestId("emoji-native");
    expect(emojiComponent.style.fontSize).toBe("64px");
  });
});
