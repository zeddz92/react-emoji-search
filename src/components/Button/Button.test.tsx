import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Button } from "./Button";

describe("Button", () => {
  it("renders without crashing", () => {
    const button = render(<Button />);
    expect(button).toBeTruthy();
  });

  it("calls onLongPress callback after 250ms", async () => {
    const onLongPress = jest.fn();
    render(<Button onLongPress={onLongPress} />);

    const button = screen.getByRole("button");
    await act(async () => {
      fireEvent.mouseDown(button);
      await new Promise((r) => setTimeout(r, 250));
      fireEvent.click(button, "onLongPress");
    });

    expect(onLongPress).toHaveBeenCalled();
  });

  it("calls onClick callback", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
