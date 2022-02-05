import React, { FC, ForwardedRef } from "react";
import { CSSTransition } from "react-transition-group";

type SearchInputProps = {
  show: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  styles?: {
    backgroundColor?: string;
    searchBackgroundColor?: string;
    searchFontColor?: string;
  };
};

export const SearchInput: FC<SearchInputProps> = React.forwardRef(
  ({ show, styles, onChange }, ref) => {
    return (
      <span className="absolute left-0 right-3 pr-3 top-0 z-20 text-base overflow-hidden">
        <CSSTransition
          in={show}
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
              id="search-input"
              data-testid="search-input"
              ref={ref}
              type="search"
              className="cancel-button w-full rounded px-3 py-2 text-gray-600 dark:text-white bg-gray-200 dark:bg-primary-400 outline-none"
              placeholder="Search Emoji"
              onChange={onChange}
              style={{
                backgroundColor: styles?.searchBackgroundColor,
                color: styles?.searchFontColor,
              }}
            />
          </div>
        </CSSTransition>
      </span>
    );
  }
);
