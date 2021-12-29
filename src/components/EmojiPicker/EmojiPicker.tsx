import "../../styles.css";
import classNames from "classnames";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Emoji, EmojiQuality, EmojiSet } from "types/emoji";
import { Styles } from "types/styles";

import { LOCAL_STORAGE_RECENT, LOCAL_STORAGE_VARIATION } from "../../constants";

import {
  getGroupedEmojis,
  GroupedEmojis,
  searchEmoji,
} from "../../utils/getEmojis";
import { smoothScroll } from "../../utils/smoothScroll";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { Button } from "../Button";
import { SkinTonePicker } from "../SkinTonePicker";
import { Tabs } from "../Tabs";
import { Emoji as EmojiComponent } from "./Emoji";

interface EmojiPickerProps {
  mode?: "dark" | "light";
  set?: EmojiSet;
  quality?: EmojiQuality;
  tabsVariant?: "fullWidth" | "default";
  onEmojiClick?(emoji: string): void;
  styles?: Styles;
}

export const EmojiPicker: FC<EmojiPickerProps> = ({
  tabsVariant = "default",
  mode = "dark",
  set = "apple",
  quality = "clean",
  onEmojiClick = () => {},
  styles,
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categoriesScrollRef = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [recentEmojis, setRecentEmojis, removeRecentEmojis] = useLocalStorage<{
    [key: string]: number;
  }>(LOCAL_STORAGE_RECENT, {});

  const [variations, setVariations, removeVariations] = useLocalStorage<{
    [key: string]: Emoji;
  }>(LOCAL_STORAGE_VARIATION, {});

  const [showInput, setShowInput] = useState(true);

  const [groupedEmojis, setGroupedEmojis] = useState<GroupedEmojis>({});

  const [tabIndex, setTabIndex] = useState(0);

  const [resultEmojis, setResultEmojis] = useState<Emoji[] | undefined>(
    undefined
  );

  const [showPicker, setShowPicker] = useState(false);

  const [emojiPicker, setEmojiPicker] = useState<{
    element: HTMLElement | null;
    emoji: Emoji | null;
  }>({
    element: null,
    emoji: null,
  });

  // Clear old settings
  useEffect(() => {
    if (
      recentEmojis.length > 0 &&
      Object.keys(recentEmojis[0]).indexOf("emoji") > -1
    ) {
      removeRecentEmojis(LOCAL_STORAGE_RECENT);
    }

    const variationValues = Object.values(variations);

    if (
      variationValues.length > 0 &&
      Object.keys(variationValues[0]).indexOf("emoji") > -1
    ) {
      removeVariations(LOCAL_STORAGE_VARIATION);
    }
  }, [recentEmojis, variations]);

  useEffect(() => {
    const groupedEmojis = getGroupedEmojis(set);

    setGroupedEmojis(groupedEmojis);
  }, [set]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const scrollPosition = e.currentTarget.scrollTop + 40;

      const target = e.currentTarget;
      const isScrolling = e.currentTarget.classList.contains("scrolling");
      if (isScrolling) {
        return;
      }
      const elemCategories = target.querySelectorAll(".emoji-category");
      const hasRecentEmojis = Object.keys(recentEmojis).length !== 0;
      elemCategories.forEach((el, index) => {
        const category = el as HTMLElement;

        if (
          scrollPosition >= category.offsetTop &&
          scrollPosition < category.offsetTop + el.clientHeight
        ) {
          if (hasRecentEmojis) {
            setTabIndex(index - 1);
          } else {
            setTabIndex(index);
          }
        }
      });
    },
    []
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setTimeout(() => {
      if (value.trim()) {
        const search = value.toLowerCase();
        const searchResult = searchEmoji(search, set);
        setResultEmojis(searchResult);
      } else {
        setResultEmojis(undefined);
      }
    }, 0);
  }, []);

  const handleTabChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    setTabIndex(newValue);

    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.value = "";
        setResultEmojis(undefined);
      }
      setShowInput(true);

      scrollContentRef.current?.classList.add("scrolling");
      const categoryElement = categoriesScrollRef.current[newValue]!;

      smoothScroll(categoryElement, scrollContentRef.current!).then(() => {
        scrollContentRef.current?.classList.remove("scrolling");
      });
    }, 0);
  };

  const togglePicker = (element: HTMLButtonElement, data: Emoji) => {
    setShowPicker(false);

    setEmojiPicker({
      element,
      emoji: data,
    });

    setTimeout(() => {
      setShowPicker(true);
    }, 100);
  };

  const saveToRecentEmojis = (data: Emoji) => {
    setRecentEmojis(LOCAL_STORAGE_RECENT, {
      ...recentEmojis,
      [data.native]: recentEmojis[data.native] + 1 || 1,
    });
  };

  const handleEmojiClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    emoji: Emoji
  ) => {
    setShowPicker(false);

    if (emoji.skinVariations && !variations[emoji.native]) {
      togglePicker(e.currentTarget, emoji);
      return;
    }
    saveToRecentEmojis(emoji);

    const resultEmoji = variations[emoji.native] || emoji;
    onEmojiClick(resultEmoji.native);
  };

  return (
    <div
      onClick={() => {
        if (showPicker) {
          setShowPicker(false);
        }
      }}
      className={classNames(
        "w-full h-full flex flex-col emoji-picker overflow-hidden",
        mode
      )}
    >
      <div
        className="dark:text-white w-full h-full flex flex-col bg-gray-100 dark:bg-primary-500"
        style={{
          backgroundColor: styles?.backgroundColor,
        }}
      >
        <Tabs
          variant={tabsVariant}
          value={tabIndex}
          styles={{
            indicatorColor: styles?.indicatorColor,
            fontColor: styles?.tabsFontColor,
          }}
          showIndicator={!resultEmojis}
          onChange={handleTabChange}
        />

        <div className="w-full h-full relative">
          <span className="absolute left-0 right-3 pr-3 top-0 z-20 text-base overflow-hidden">
            <CSSTransition
              in={showInput}
              timeout={500}
              classNames="slide"
              unmountOnExit={true}
            >
              <div
                id="search-input"
                className="pr-2 bg-gray-100 dark:bg-primary-500 px-3 py-1.5"
                style={{
                  backgroundColor: styles?.backgroundColor,
                }}
              >
                <input
                  ref={searchInputRef}
                  type="search"
                  className="cancel-button w-full rounded px-3 py-2 text-gray-600 dark:text-white bg-gray-200 dark:bg-primary-400 outline-none"
                  placeholder="Search Emoji"
                  onChange={handleSearch}
                  style={{
                    backgroundColor: styles?.searchBackgroundColor,
                    color: styles?.searchFontColor,
                  }}
                />
              </div>
            </CSSTransition>
          </span>

          <SkinTonePicker
            isOpen={showPicker}
            set={set}
            boundaryElement={containerRef.current}
            targetElement={emojiPicker.element}
            emoji={emojiPicker.emoji}
            styles={{
              backgroundColor: styles?.variationPickerBackgroundColor,
            }}
            onEmojiClick={(emoji) => {
              setShowPicker(false);
              setVariations(LOCAL_STORAGE_VARIATION, {
                ...variations,
                [emojiPicker?.emoji!.native]: emoji,
              });
              saveToRecentEmojis(emojiPicker.emoji!);
              onEmojiClick(emoji.native);
            }}
          />

          <div
            ref={containerRef}
            className="w-full px-3 relative h-full select-none"
          >
            {resultEmojis && (
              <div className="emoji-list">
                <div className="emoji-grid">
                  {resultEmojis.map((data) => (
                    <Button
                      key={`result-${data.native}`}
                      onLongPress={(e) => {
                        if (data.skinVariations) {
                          togglePicker(e, data);
                        }
                      }}
                      onClick={(e) => handleEmojiClick(e, data)}
                    >
                      <EmojiComponent
                        set={set}
                        data={variations[data.native] || data}
                        quality={quality}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div
              className={classNames("emoji-list", {
                hidden: !!resultEmojis,
              })}
              ref={scrollContentRef}
              onScroll={handleScroll}
              onWheel={(e) => {
                const inThreshold = e.currentTarget.scrollTop % 150 === 0;
                if (!inThreshold) {
                  setShowPicker(false);
                }

                if (e.nativeEvent.deltaY > 0) {
                  setShowInput(false);
                } else {
                  setShowInput(true);
                }
              }}
            >
              {Object.entries(groupedEmojis).map(
                ([key, emojis], index) =>
                  emojis && (
                    <div key={key} className="mb-6 relative emoji-category">
                      <div
                        className="text-left  text-gray-400 dark:text-secondary-100 text-sm mb-2"
                        style={{ color: styles?.fontColor }}
                      >
                        {key}
                      </div>
                      <span
                        ref={(el) => {
                          categoriesScrollRef.current[index] = el;
                        }}
                        // Match top with parent padding-top
                        className="absolute -top-15"
                      ></span>
                      <div className="emoji-grid">
                        {emojis.map((data) => (
                          <Button
                            key={`emoji-${data.native}`}
                            onLongPress={(e) => {
                              if (data.skinVariations) {
                                togglePicker(e, data);
                              }
                            }}
                            onClick={(e) => handleEmojiClick(e, data)}
                          >
                            <EmojiComponent
                              set={set}
                              quality={quality}
                              data={variations[data.native] || data}
                            />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
