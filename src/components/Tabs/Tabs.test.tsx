import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { Tabs } from "./Tabs";

const onTabChange = jest.fn();
const localStorageMock = (function () {
  return {
    getItem: function () {
      return { "😾": 1, "😂": 1, "🤣": 1, "🤮": 1 };
    },
  };
})();

const localStorageBack = global.localStorage;

describe("Tabs", () => {
  beforeEach(() => {
    onTabChange.mockReset();
  });
  afterAll(() => {
    Object.defineProperty(window, "localStorage", { value: localStorageBack });
  });

  it("renders without crashing", () => {
    const tabs = render(
      <Tabs
        value={0}
        onChange={onTabChange}
        showIndicator={true}
        styles={{ fontColor: "black", indicatorColor: "red" }}
      />
    );
    expect(tabs).toBeTruthy();
  });

  it("calls onChange when tab is clicked", () => {
    const { getByTestId } = render(<Tabs value={0} onChange={onTabChange} />);

    const tabs = getByTestId("tabs");
    fireEvent.click(tabs.childNodes.item(0));
    fireEvent.resize(window);

    expect(onTabChange).toHaveBeenCalled();
  });

  it("hides recent tab when there's no data in local storage", () => {
    const { queryByTitle } = render(
      <Tabs value={0} onChange={onTabChange} showIndicator={true} />
    );
    const recentTab = queryByTitle("Recent");

    expect(recentTab).toBeNull();
  });

  it("shows recent tab when there's data in local storage", () => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const { getByTitle } = render(<Tabs value={0} onChange={onTabChange} />);
    const recentTab = getByTitle("Recent");

    expect(recentTab).toBeTruthy();
  });

  it("hides indicator", () => {
    const { queryByTestId } = render(
      <Tabs value={0} showIndicator={false} onChange={onTabChange} />
    );

    const indicator = queryByTestId("indicator");

    expect(indicator).toBeNull();
  });
});
