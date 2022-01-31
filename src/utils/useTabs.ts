import { useEffect, useState } from "react";

import { LOCAL_STORAGE_RECENT } from "../constants";

export const useTabs = (
  tabsRef: React.MutableRefObject<(HTMLButtonElement | null)[]>,
  value: number
) => {
  const [showRecent, setShowRecent] = useState(false);
  const [indicatorState, setIndicatorState] = useState({
    width: 0,
    left: 0,
    shouldAnimate: true,
  });

  const updateIndicatorState = () => {
    const tab = tabsRef.current[value];
    if (tab) {
      setIndicatorState({
        ...indicatorState,
        width: tab.offsetWidth,
        left: tab.offsetLeft,
        shouldAnimate: false,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_RECENT)) {
      setShowRecent(true);
    }
    const tab = tabsRef.current[0];
    if (tab) {
      setIndicatorState({
        ...indicatorState,
        shouldAnimate: false,
        width: tab.offsetWidth,
      });
    }
  }, [tabsRef]);

  useEffect(() => {
    const handleResize = () => {
      updateIndicatorState();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateIndicatorState]);

  useEffect(() => {
    const tab = tabsRef.current[value];
    if (tab) {
      setIndicatorState({
        ...indicatorState,
        shouldAnimate: true,
        width: tab.offsetWidth,
        left: tab.offsetLeft,
      });
    }
  }, [value]);

  return {
    showRecent,
    indicatorState,
  };
};
