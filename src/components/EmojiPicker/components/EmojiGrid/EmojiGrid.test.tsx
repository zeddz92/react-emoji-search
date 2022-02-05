import { render } from "@testing-library/react";
import {
  defaultContextValue,
  EmojiPickerContext,
} from "../../../../contexts/EmojiPickerContext";
import React from "react";

import emojis from "../../../../data/emojis";
import { EmojiGrid } from "./EmojiGrid";

describe("EmojiGrid", () => {
  it("renders emojiGrid without crashing", async () => {
    const emojiGrid = render(<EmojiGrid data={emojis} />);

    expect(emojiGrid).toBeTruthy();
  });
  it("set styles based on props", async () => {
    const { findByTestId } = render(
      <EmojiPickerContext.Provider
        value={{ ...defaultContextValue, emojiSpacing: 16, emojiSize: 32 }}
      >
        <EmojiGrid data={emojis} />
      </EmojiPickerContext.Provider>
    );
    const emojiGrid = await findByTestId("emoji-grid");

    expect(emojiGrid).toBeTruthy();
    expect(emojiGrid.style.gap).toBe("16px");
    expect(emojiGrid.style.gridTemplateColumns).toBe(
      "repeat(auto-fill, minmax(min(32px, 100%), 1fr))"
    );
  });
});
