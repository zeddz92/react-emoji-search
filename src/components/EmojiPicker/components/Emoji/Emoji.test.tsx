import { render } from "@testing-library/react";
import React from "react";

import { Emoji } from "./Emoji";

const emojiData = {
  sheetX: 2,
  sheetY: 2,
  google: 1,
  twitter: 1,
  facebook: 1,
  apple: 1,
  native: "😀",
  img: "emoji-11-7.webp",
};

describe("Emoji Picker/Emoji", () => {
  it("renders without crashing", () => {
    const emoji = render(<Emoji data={emojiData} />);
    expect(emoji).toBeTruthy();
  });

  it("renders native emoji", async () => {
    const { findByText } = render(<Emoji set="native" data={emojiData} />);

    const emoji = await findByText(emojiData.native);

    expect(emoji).toBeTruthy();
  });

  it("renders set emoji", async () => {
    const { findByTestId } = render(<Emoji set="apple" data={emojiData} />);

    const emoji = await findByTestId("emoji-img");

    expect(emoji).toBeTruthy();
    expect(emoji.getAttribute("aria-label")).toBe(emojiData.native);
  });
});
