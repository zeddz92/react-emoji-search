import React, { PropsWithChildren } from "react";
import { Meta, Story } from "@storybook/react";
import { EmojiPicker } from "./components/EmojiPicker";
import { EmojiPickerProps, EmojiSet } from "./types/emoji";

const meta: Meta<PropsWithChildren<EmojiPickerProps>> = {
  title: "My Component",
  component: EmojiPicker,
  argTypes: {
    set: {
      defaultValue: "apple",
      control: {
        type: "select",
        labels: {
          native: "Native",
          apple: "Apple",
          google: "Google",
          facebook: "Facebook",
          twitter: "Twitter",
        },
      },
    },
    mode: { defaultValue: "dark" },
    quality: { defaultValue: "clean" },
    sheetSize: { defaultValue: "64" },
    styles: {
      defaultValue: {
        backgroundColor: "...",
        indicatorColor: "...",
        fontColor: "...",
        tabsFontColor: "...",
        searchFontColor: "...",
        variationPickerBackgroundColor: "...",
      },
    },
  },
};

const Template: Story<PropsWithChildren<{ set: EmojiSet }>> = (args) => {
  return (
    <>
      <div style={{ height: 500 }}>
        <EmojiPicker {...args} tabsVariant="fullWidth" mode="dark" />
      </div>
    </>
  );
};

const Basic = Template.bind({});
Basic.args = {};

export default meta;
export { Basic };
