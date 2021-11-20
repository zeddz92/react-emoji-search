import { LOCAL_STORAGE_RECENT } from '../constants';
import {useEffect, useLayoutEffect, useState} from 'react';
export const useTabs = (tabsRef: React.MutableRefObject<(HTMLButtonElement | null)[]>, value: number) => {
    
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
        // Position 0 is for recent and might not be displayed
        const tab = tabsRef.current[1];
        if (tab) {
          setIndicatorState({
            ...indicatorState,
            shouldAnimate: false,
            width: tab.offsetWidth,
          });
        }
      }, [tabsRef]);

      useLayoutEffect(() => {
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
          indicatorState
      }
};