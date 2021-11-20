import "./styles.css";

import classNames from "classnames";
import React, { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { EmojiButton } from "./components/EmojiButton";
import { categories, Tabs } from "./components/Tabs";
import { Styles } from "types/styles";
import { useEmojiSearch } from "./utils/useEmojiSearch";

interface EmojiPickerProps {
  mode?: "dark" | "light";
  tabsVariant?: "fullWidth" | "default";
  onEmojiClick?(emoji: string): void;
  styles?: Styles;
}

const Component: FC<EmojiPickerProps> = ({
  tabsVariant = "default",
  mode = "light",
  onEmojiClick,
  styles,
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<(HTMLSpanElement | null)[]>([]);

  const {
    showInput,
    handleEmojiClick,
    handleScroll,
    handleTabChange,
    setSearch,
    setShowInput,
    tabIndex,
    search,
    resultEmojis,
    groupedEmojis,
  } = useEmojiSearch(scrollContentRef, categoriesScrollRef, onEmojiClick);

  return (
    <div
      className={classNames("w-full h-full flex flex-col emoji-picker", mode)}
    >
      <div
        className="emoji-container"
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

        <div className="overflow-hidden w-full h-full relative">
          <span className="absolute left-0 right-3 pr-3 top-0 z-20 text-base">
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
                  value={search}
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

          <div className="w-full px-3 relative h-full select-none">
            {resultEmojis && (
              <div className="emoji-list">
                <div className="emoji-grid">
                  {resultEmojis.map((data) => (
                    <EmojiButton
                      key={`search-${data.emoji}`}
                      data={data}
                      onClick={(e) => handleEmojiClick(e, data)}
                    />
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
                const inThreshold = e.currentTarget.scrollTop % 2 === 0;
                if (!inThreshold) {
                  return;
                }

                if (e.nativeEvent.deltaY > 0) {
                  setShowInput(false);
                } else {
                  setShowInput(true);
                }
              }}
            >
              {groupedEmojis &&
                categories.map(
                  ({ id, name }, index) =>
                    groupedEmojis[id] && (
                      <div key={id} className="mb-6 relative">
                        <div
                          className="text-left emoji-category text-gray-400 dark:text-secondary-100 text-sm mb-2"
                          style={{ color: styles?.fontColor }}
                        >
                          {name}
                        </div>
                        <span
                          ref={(el) => {
                            categoriesScrollRef.current[index] = el;
                          }}
                          // Match top with parent padding-top
                          className="absolute -top-15"
                        ></span>
                        <div className="emoji-grid">
                          {groupedEmojis[id]!.map((data) => (
                            <EmojiButton
                              key={`${name}-${data.emoji}-${index}`}
                              data={data}
                              onClick={(e) => handleEmojiClick(e, data, id)}
                            />
                          ))}
                        </div>
                        <span
                          data-category={id}
                          className="emoji-category-bottom absolute top-60"
                        />
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

export default Component;
