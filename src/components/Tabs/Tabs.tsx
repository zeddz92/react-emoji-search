import classNames from "classnames";
import React, { FC, useRef } from "react";
import { useTabs } from "../../utils/useTabs";

import { ActivityIcon } from "../../icons/ActivityIcon";
import { FlagsIcon } from "../../icons/FlagsIcon";
import { FoodIcon } from "../../icons/FoodIcon";
import { NatureIcon } from "../../icons/NatureIcon";
import { ObjectsIcon } from "../../icons/ObjectsIcon";
import { PeopleIcon } from "../../icons/PeopleIcon";
import { RecentIcon } from "../../icons/RecentIcon";
import { SymbolsIcon } from "../../icons/SymbolsIcon";
import { TravelIcon } from "../../icons/TravelIcon";

interface Props {
  variant?: "fullWidth" | "default";
  value: number;
  showIndicator?: boolean;
  styles?: {
    indicatorColor?: string;
    fontColor?: string;
  };
  onChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ): void;
}

interface Tab {
  id: string;
  name: string;
  icon: JSX.Element;
}

export const categories: Tab[] = [
  {
    id: "recent",
    name: "Recent",
    icon: <RecentIcon />,
  },
  {
    id: "smileys-people",
    name: "Smileys & People",
    icon: <PeopleIcon />,
  },
  {
    id: "animals-nature",
    name: "Animals & Nature",
    icon: <NatureIcon />,
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    icon: <FoodIcon />,
  },
  {
    id: "activity",
    name: "Activity",
    icon: <ActivityIcon />,
  },
  {
    id: "travel-places",
    name: "Travel & Places",
    icon: <TravelIcon />,
  },

  {
    id: "objects",
    name: "Objects",
    icon: <ObjectsIcon />,
  },
  {
    id: "symbols",
    name: "Symbols",
    icon: <SymbolsIcon />,
  },
  {
    id: "flags",
    name: "Flags",
    icon: <FlagsIcon />,
  },
];

export const Tabs: FC<Props> = ({
  variant = "fullWidth",
  value,
  onChange,
  showIndicator,
  styles,
}) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { indicatorState, showRecent } = useTabs(tabsRef, value);

  const classes = classNames(
    "flex items-center text-gray-400 dark:text-primary-300 dark:shadow-sm h-full overflow-hidden",
    {
      "grid grid-flow-col justify-between": variant === "fullWidth",
    }
  );

  const { shouldAnimate, ...indicatorStyles } = indicatorState;

  return (
    <div className="relative w-full mb-1 text-base">
      <div data-testid="tabs" className={classes}>
        {categories
          .filter((category) => {
            if (category.id === "recent" && !showRecent) {
              return false;
            }
            return true;
          })
          .map((category, index) => (
            <button
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              key={`tabs-${category.id}`}
              onClick={(e) => onChange(e, index)}
              data-id={category.id}
              title={category.name}
              className={classNames(
                "px-2 sm:px-4 md:px-9 tab outline-none pt-3 pb-2 text-gray-600 dark:text-secondary-200",
                {
                  "opacity-50 dark:opacity-40":
                    value !== index || !showIndicator,
                  "dark:opacity-90": showIndicator && value === index,
                }
              )}
              style={{
                color: styles?.fontColor,
              }}
            >
              <span className="block">{category.icon}</span>
            </button>
          ))}
      </div>

      {showIndicator && (
        <span
          data-testid="indicator"
          className={classNames("h-1 bg-green-600 block absolute", {
            indicator: shouldAnimate && showIndicator,
          })}
          style={{
            ...indicatorStyles,
            backgroundColor: styles?.indicatorColor,
          }}
        />
      )}
    </div>
  );
};
