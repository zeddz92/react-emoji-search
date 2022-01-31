import { render } from "@testing-library/react";
import React from "react";

import { EmojiGrid } from "./EmojiGrid";

describe("EmojiGrid", () => {
  it("renders without crashing", async () => {
    const emojiGrid = render(<EmojiGrid emojiSize={32} emojiSpacing={16} />);

    expect(emojiGrid).toBeTruthy();
  });
  it("set styles based on props", async () => {
    const { findByTestId } = render(
      <EmojiGrid emojiSize={32} emojiSpacing={16} />
    );
    const emojiGrid = await findByTestId("emoji-grid");

    expect(emojiGrid).toBeTruthy();
    expect(emojiGrid.style.gap).toBe("16px");
    expect(emojiGrid.style.gridTemplateColumns).toBe(
      "repeat(auto-fill, minmax(min(32px, 100%), 1fr))"
    );
  });
});
