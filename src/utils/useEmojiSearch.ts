import { useCallback, useEffect, useState } from "react";
import inView from "element-in-view";
import { LOCAL_STORAGE_RECENT } from "../constants";
import { BaseEmoji } from "unicode-emoji";
import { useLazyUnicodeEmoji } from "./useLazyUnicodeEmoji";
import { useLocalStorage } from "./useLocalStorage";
import { smoothScroll } from "./smoothScroll";

export const useEmojiSearch = (
  scrollContentRef: React.RefObject<HTMLDivElement>,
  categoriesScrollRef: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  onEmojiClick?: (emoji: string) => void
) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();

  const [recentEmojis, setRecentEmojis] = useLocalStorage<BaseEmoji[]>(
    LOCAL_STORAGE_RECENT,
    []
  );

  const [showInput, setShowInput] = useState(true);
  const [search, setSearch] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const [resultEmojis, setResultEmojis] = useState<BaseEmoji[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (search.trim()) {
      const value = search.toLowerCase();

      setResultEmojis(
        baseEmojis?.filter(
          (emoji) =>
            emoji.description.toLocaleLowerCase().includes(value) ||
            emoji.keywords.includes(value)
        )
      );
    } else {
      setResultEmojis(undefined);
    }
  }, [search]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = e.currentTarget;
      const isScrolling = e.currentTarget.classList.contains("scrolling");
      if (isScrolling && !search) {
        return;
      }
      const elemCategories = target.querySelectorAll(".emoji-category-bottom");
      elemCategories.forEach((el, index) => {
        if (!isScrolling && !search && inView(el as any)) {
          setTabIndex(index);
        }
      });
    },
    []
  );

  const handleTabChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    setSearch("");
    setTabIndex(newValue);
    setTimeout(() => {
      setShowInput(true);

      scrollContentRef.current?.classList.add("scrolling");
      const categoryElement = categoriesScrollRef.current[newValue]!;

      smoothScroll(categoryElement, scrollContentRef.current!).then(() => {
        scrollContentRef.current?.classList.remove("scrolling");
      });
    }, 0);
  };

  const handleEmojiClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: BaseEmoji,
    category?: string
  ) => {
    if (category !== "recent") {
      if (!recentEmojis.some(({ emoji }) => emoji === data.emoji)) {
        setRecentEmojis(
          LOCAL_STORAGE_RECENT,
          [
            ...recentEmojis,
            { ...data, keywords: [], variations: [] },
          ].sort((a, b) => (a.emoji > b.emoji ? -1 : 1))
        );
      }
    }
    onEmojiClick && onEmojiClick(data.emoji);
  };

  return {
    handleTabChange,
    setSearch,
    handleEmojiClick,
    showInput,
    setShowInput,
    handleScroll,
    tabIndex,
    search,
    resultEmojis,
    setResultEmojis,
    groupedEmojis,
  };
};
