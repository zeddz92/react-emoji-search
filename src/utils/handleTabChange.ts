import React from "react";

import { smoothScroll } from "./smoothScroll";

export const handleTabChange = (
  tab: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  scrollContentRef: React.RefObject<HTMLDivElement>,
  searchInputRef: React.RefObject<HTMLInputElement>,
  newValue: number,
  on: {
    setTabIndex: (val: number) => void;
    setResultEmojis: (val: undefined) => void;
    setShowInput: (val: boolean) => void;
  }
) => {
  const id = tab.currentTarget.getAttribute("data-id");
  if (id) {
    const doc = tab.currentTarget.ownerDocument;
    const categoryElement = doc.querySelector(`#category-${id}`);
    if (categoryElement) {
      on.setTabIndex(newValue);

      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.value = "";
          on.setResultEmojis(undefined);
        }
        on.setShowInput(true);

        if (scrollContentRef.current) {
          scrollContentRef.current.classList.add("scrolling");
          smoothScroll(categoryElement, scrollContentRef.current).then(() => {
            if (scrollContentRef.current) {
              scrollContentRef.current.classList.remove("scrolling");
            }
          });
        }
      }, 0);
    }
  }
};
