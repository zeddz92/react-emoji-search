import { render } from "@testing-library/react";
import React from "react";

import { Emoji } from "./Emoji";

describe("Emoji", () => {
  it("renders without crashing", () => {
    const emoji = render(<Emoji unicode="😀" />);
    expect(emoji).toBeTruthy();
  });

  it("renders question emoji from a set when not found", async () => {
    const { findByTestId } = render(<Emoji set="apple" unicode="ERROR" />);

    const noFoundEmoji = await findByTestId("emoji-img");

    expect(noFoundEmoji).toBeTruthy();
    expect(noFoundEmoji.getAttribute("aria-label")).toBe("❓");
  });

  it("renders native question emoji when not found", async () => {
    const { findByText } = render(<Emoji set="native" unicode="ERROR" />);

    const noFoundEmoji = await findByText("❓");

    expect(noFoundEmoji).toBeTruthy();
  });

  it("renders set emoji", async () => {
    const { findByTestId } = render(<Emoji set="apple" unicode="😀" />);

    const foundEmoji = await findByTestId("emoji-img");

    expect(foundEmoji).toBeTruthy();
    expect(foundEmoji.getAttribute("aria-label")).toBe("😀");
  });
  it("renders native emoji", async () => {
    const { findByText } = render(<Emoji set="native" unicode="😀" />);

    const foundEmoji = await findByText("😀");

    expect(foundEmoji).toBeTruthy();
  });

  it("renders skin variation emoji", async () => {
    const { findByText } = render(<Emoji set="native" unicode="👋🏼" />);

    const foundEmoji = await findByText("👋🏼");

    expect(foundEmoji).toBeTruthy();
  });
});
