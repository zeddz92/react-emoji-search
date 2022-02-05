import "../../styles.css";

import classNames from "classnames";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Emoji, EmojiPickerProps } from "../../types/emoji";

import { categories, pickerDefaultProps } from "../../constants";
import { EmojiPickerContext } from "../../contexts/EmojiPickerContext";
import {
  getGroupedEmojis,
  GroupedEmojis,
  searchEmoji,
} from "../../utils/getEmojis";
import { handleScroll } from "../../utils/handleScroll";
import { handleTabChange } from "../../utils/handleTabChange";

import { SearchInput } from "../SearchInput/SearchInput";
import { SkinTonePicker } from "../SkinTonePicker";
import { Tabs } from "../Tabs/Tabs";
import { EmojiGrid } from "./components/EmojiGrid";
import { useEmojiLocalStorage } from "../../utils/useEmojiLocalStorage";

export const EmojiPicker: FC<EmojiPickerProps> = ({
  set,
  emojiVersion,
  styles,
  onEmojiClick = () => {},
  ...props
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { variations, setRecentEmojis, setVariations } = useEmojiLocalStorage();

  const [showInput, setShowInput] = useState(true);
  const [groupedEmojis, setGroupedEmojis] = useState<GroupedEmojis>({});
  const [tabIndex, setTabIndex] = useState(0);
  const [resultEmojis, setResultEmojis] = useState<Emoji[] | undefined>(
    undefined
  );

  const [showPicker, setShowPicker] = useState(false);

  const [emojiPicker, setEmojiPicker] = useState<{
    targetElement: HTMLElement | null;
    emoji: Emoji | null;
  }>({
    targetElement: null,
    emoji: null,
  });

  useEffect(() => {
    const groupedEmojis = getGroupedEmojis(set, emojiVersion);
    setGroupedEmojis(groupedEmojis);
  }, [set, emojiVersion]);

  const handleScrollCallback = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const tabIndex = handleScroll(e);
      if (typeof tabIndex !== "undefined") {
        setTabIndex(tabIndex);
      }
    },
    []
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim().toLocaleLowerCase();

    setTimeout(() => {
      if (value) {
        const searchResult = searchEmoji(value, set, emojiVersion);
        setResultEmojis(searchResult);
      } else {
        setResultEmojis(undefined);
      }
    }, 0);
  }, []);

  const handleTabChangeCallback = (
    tab: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    handleTabChange(tab, scrollContentRef, searchInputRef, newValue, {
      setTabIndex,
      setResultEmojis,
      setShowInput,
    });
  };

  const togglePicker = (element: HTMLButtonElement, data: Emoji) => {
    setShowPicker(false);

    setEmojiPicker({
      targetElement: element,
      emoji: data,
    });

    setTimeout(() => {
      setShowPicker(true);
    }, 100);
  };

  const saveToRecentEmojis = (data: Emoji) => {
    setRecentEmojis(data.native);
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
    <EmojiPickerContext.Provider
      value={{
        set,
        emojiVersion,
        styles,
        skinTones: variations,
        onEmojiClick: (e, data) => handleEmojiClick(e, data),
        onEmojiLongPress: (e, data) => {
          if (data.skinVariations) {
            togglePicker(e, data);
          }
        },
        ...props,
      }}
    >
      <div
        data-testid="emoji-picker"
        onClick={() => {
          if (showPicker) {
            setShowPicker(false);
          }
        }}
        className={classNames(
          "w-full h-full flex flex-col emoji-picker overflow-hidden",
          props.mode
        )}
      >
        <div
          className="dark:text-white w-full h-full flex flex-col bg-gray-100 dark:bg-primary-500"
          style={{
            backgroundColor: styles?.backgroundColor,
          }}
        >
          <Tabs
            value={tabIndex}
            styles={styles}
            showIndicator={!resultEmojis}
            onChange={handleTabChangeCallback}
          />
          <div className="w-full h-full relative">
            <SearchInput
              ref={searchInputRef}
              show={showInput}
              onChange={handleSearch}
              styles={styles}
            />
            <SkinTonePicker
              {...emojiPicker}
              isOpen={showPicker}
              boundaryElement={containerRef.current}
              onEmojiClick={(emoji) => {
                setShowPicker(false);
                if (emojiPicker.emoji) {
                  setVariations(emojiPicker.emoji.native, emoji);
                  saveToRecentEmojis(emojiPicker.emoji);
                }
                onEmojiClick(emoji.native);
              }}
            />
            <div
              ref={containerRef}
              className="w-full px-3 relative h-full select-none"
            >
              {resultEmojis && (
                <div data-testid="result-emojis" className="emoji-list">
                  <EmojiGrid data={resultEmojis} />
                </div>
              )}
              <div
                id="emoji-list"
                data-testid="emoji-list"
                className={classNames("emoji-list", {
                  hidden: !!resultEmojis,
                })}
                ref={scrollContentRef}
                onScroll={handleScrollCallback}
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
                {Object.entries(groupedEmojis).map(([key, emojis]) => (
                  <div key={key} className="mb-6 relative emoji-category">
                    <div
                      className="text-left text-gray-400 dark:text-secondary-100 text-sm mb-2"
                      style={{ color: styles?.fontColor }}
                    >
                      {key}
                    </div>
                    <span
                      id={`category-${categories[key]}`}
                      // Match top with parent padding-top
                      className="absolute -top-15"
                    ></span>
                    <EmojiGrid data={emojis} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiPickerContext.Provider>
  );
};
EmojiPicker.defaultProps = pickerDefaultProps;
