import { createEvent, fireEvent, render } from "@testing-library/react";
import React from "react";

import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders popover without crashing", () => {
    const popover = render(
      <Popover
        targetElement={null}
        boundaryElement={null}
        isOpen={true}
        styles={{ backgroundColor: "gray" }}
      />
    );
    expect(popover).toBeTruthy();
  });

  it("renders children when isOpen is true", async () => {
    const targetElement = document.createElement("div");
    const boundaryElement = document.createElement("div");

    const { findByText } = render(
      <Popover
        targetElement={targetElement}
        boundaryElement={boundaryElement}
        isOpen={true}
      >
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

  it("stop propagation when popover is clicked", () => {
    const { getByTestId } = render(
      <Popover targetElement={null} boundaryElement={null} isOpen={true}>
        CHILDREN
      </Popover>
    );
    const popover = getByTestId("popover");
    const clickEvent = createEvent.click(popover);

    fireEvent(popover, clickEvent);

    expect(clickEvent.defaultPrevented).toBeTruthy();
  });
});
