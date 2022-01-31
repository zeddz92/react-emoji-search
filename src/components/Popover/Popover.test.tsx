import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders without crashing", () => {
    const popover = render(
      <Popover targetElement={null} boundaryElement={null} isOpen={true} />
    );
    expect(popover).toBeTruthy();
  });

  it("renders children when isOpen is true", async () => {
    const { findByText } = render(
      <Popover targetElement={null} boundaryElement={null} isOpen={true}>
        CHILDREN
      </Popover>
    );
    const children = await findByText("CHILDREN");
    expect(children).toBeTruthy();
  });

  it("don't display children when isOpen is false", () => {
    const { queryByText } = render(
      <Popover targetElement={null} boundaryElement={null} isOpen={false}>
        CHILDREN
      </Popover>
    );
    const children = queryByText("CHILDREN");
    expect(children).toBeNull();
  });
});
