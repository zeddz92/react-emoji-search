import "../../styles.css";

import classNames from "classnames";
import inView from "element-in-view";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Emoji, EmojiQuality, EmojiSet, Version } from "types/emoji";
import { Styles } from "types/styles";
import { BaseEmoji } from "unicode-emoji";

import {
  categories,
  LOCAL_STORAGE_RECENT,
  LOCAL_STORAGE_VARIATION,
} from "../../constants";
import {
  getGroupedEmojis,
  GroupedEmojis,
  searchEmoji,
} from "../../utils/getEmojis";
import { smoothScroll } from "../../utils/smoothScroll";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { Button } from "../Button";
import { SkinTonePicker } from "../SkinTonePicker";
import { Tabs } from "../Tabs/Tabs";
import { Emoji as EmojiComponent } from "./components/Emoji";
import { EmojiGrid } from "./components/EmojiGrid";

interface EmojiPickerProps {
  mode?: "dark" | "light";
  emojiSize?: number;
  sheetSize?: 32 | 64;
  emojiSpacing?: number;
  set?: EmojiSet;
  quality?: EmojiQuality;
  tabsVariant?: "fullWidth" | "default";
  onEmojiClick?(emoji: string): void;
  emojiVersion?: Version;
  styles?: Styles;
}

interface Emoji {
  emoji: string;
}

const Component: FC<EmojiPickerProps> = ({
  tabsVariant = "default",
  mode = "dark",
  set = "apple",
  emojiVersion = 12.0,
  emojiSpacing = 12,
  emojiSize = 32,
  sheetSize = 64,
  quality = "clean",
  onEmojiClick = () => {},
  styles,
}) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();

  const containerRef = useRef<HTMLDivElement>(null);

  const [recentEmojis, setRecentEmojis] = useLocalStorage<Emoji[]>(
    LOCAL_STORAGE_RECENT,
    []
  );

  const [variations, setVariations] = useLocalStorage<{
    [key: string]: BaseEmoji;
  }>(LOCAL_STORAGE_VARIATION, {});

  const [showInput, setShowInput] = useState(true);
  const [search, setSearch] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const [resultEmojis, setResultEmojis] = useState<BaseEmoji[] | undefined>(
    undefined
  );

  const [showPicker, setShowPicker] = useState(false);

  const [emojiPicker, setEmojiPicker] = useState<{
    element: HTMLElement | null;
    emoji: BaseEmoji | null;
  }>({
    element: null,
    emoji: null,
  });

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
  }, [recentEmojis, variations]);

  useEffect(() => {
    const groupedEmojis = getGroupedEmojis(set, emojiVersion);
    setGroupedEmojis(groupedEmojis);
  }, [set, emojiVersion]);

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

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setTimeout(() => {
      if (value.trim()) {
        const search = value.toLowerCase();
        const searchResult = searchEmoji(search, set, emojiVersion);
        setResultEmojis(searchResult);
      } else {
        setResultEmojis(undefined);
      }
    }, 0);
  }, []);

  const handleTabChange = (
    tab: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    const id = tab.currentTarget.getAttribute("data-id");
    if (!id) {
      return;
    }
    const doc = tab.currentTarget.ownerDocument;
    const categoryElement = doc.querySelector(`#category-${id}`);
    if (categoryElement) {
      setTabIndex(newValue);

      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.value = "";
          setResultEmojis(undefined);
        }
        setShowInput(true);

        scrollContentRef.current?.classList.add("scrolling");

        smoothScroll(categoryElement, scrollContentRef.current!).then(() => {
          scrollContentRef.current?.classList.remove("scrolling");
        });
      }, 0);
    }
  };

  const togglePicker = (element: HTMLButtonElement, data: BaseEmoji) => {
    setShowPicker(false);

    setEmojiPicker({
      element,
      emoji: data,
    });

    setTimeout(() => {
      setShowPicker(true);
    }, 100);
  };

  const saveToRecentEmojis = (data: BaseEmoji) => {
    if (!recentEmojis.some(({ emoji }) => emoji === data.emoji)) {
      setRecentEmojis(
        LOCAL_STORAGE_RECENT,
        [...recentEmojis, { emoji: data.emoji }].sort((a, b) =>
          a.emoji > b.emoji ? -1 : 1
        )
      );
    }
  };
  const handleEmojiClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: BaseEmoji,
    category?: string
  ) => {
    setShowPicker(false);

    if (category !== "recent") {
      if (data.variations && !variations[data.emoji]) {
        togglePicker(e.currentTarget, data);
        return;
      }
      saveToRecentEmojis(data);
    }
    onEmojiClick(data.emoji);
  };

  const columns = `repeat(auto-fill, minmax(min(${emojiSize}px, 100%), 1fr))`;

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
          showIndicator={!search && !resultEmojis}
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
                  data-testid="search-input"
                  ref={searchInputRef}
                  type="search"
                  className="cancel-button w-full rounded px-3 py-2 text-gray-600 dark:text-white bg-gray-200 dark:bg-primary-400 outline-none"
                  placeholder="Search Emoji"
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  style={{
                    backgroundColor: styles?.searchBackgroundColor,
                    color: styles?.searchFontColor,
                  }}
                />
              </div>
            </CSSTransition>
          </span>

          <Picker
            isOpen={showPicker}
            set={set}
            emojiSize={emojiSize}
            sheetSize={sheetSize}
            boundaryElement={containerRef.current}
            targetElement={emojiPicker.element}
            emoji={emojiPicker.emoji}
            styles={{
              backgroundColor: styles?.skinTonePickerBackgroundColor,
            }}
            onEmojiClick={(emoji) => {
              setShowPicker(false);
              setVariations(LOCAL_STORAGE_VARIATION, {
                ...variations,
                [emojiPicker?.emoji!.emoji]: { emoji: emoji.emoji },
              });
              saveToRecentEmojis(emojiPicker.emoji!);
              onEmojiClick(emoji.emoji);
            }}
          />

          <div
            ref={containerRef}
            className="w-full px-3 relative h-full select-none"
          >
            {resultEmojis && (
              <div data-testid="result-emojis" className="emoji-list">
                <EmojiGrid emojiSize={emojiSize} emojiSpacing={emojiSpacing}>
                  {resultEmojis.map((data) => (
                    <EmojiButton
                      key={`search-${data.emoji}`}
                      data={data}
                      onClick={(e) => handleEmojiClick(e, data)}
                    >
                      <EmojiComponent
                        size={emojiSize}
                        sheetSize={sheetSize}
                        set={set}
                        data={variations[data.native] || data}
                        quality={quality}
                      />
                    </Button>
                  ))}
                </EmojiGrid>
              </div>
            )}

            <div
              id="emoji-list"
              data-testid="emoji-list"
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
              {Object.entries(groupedEmojis).map(([key, emojis], index) => (
                <div key={key} className="mb-6 relative emoji-category">
                  <div
                    className="text-left  text-gray-400 dark:text-secondary-100 text-sm mb-2"
                    style={{ color: styles?.fontColor }}
                  >
                    {key}
                  </div>
                  <span
                    id={`category-${categories[key]}`}
                    // Match top with parent padding-top
                    className="absolute -top-15"
                  ></span>
                  <EmojiGrid emojiSize={emojiSize} emojiSpacing={emojiSpacing}>
                    {emojis?.map((data) => (
                      <Button
                        testId={`${key}-emoji`}
                        key={`emoji-${data.native}`}
                        onLongPress={(e) => {
                          if (data.skinVariations) {
                            togglePicker(e, data);
                          }
                        }}
                        onClick={(e) => handleEmojiClick(e, data)}
                      >
                        <EmojiComponent
                          size={emojiSize}
                          sheetSize={sheetSize}
                          set={set}
                          quality={quality}
                          data={variations[data.native] || data}
                        />
                      </Button>
                    ))}
                  </EmojiGrid>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
