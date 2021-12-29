import React, { PropsWithChildren, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { EmojiPicker, Emoji } from "./index";
import { EmojiSet } from "types/emoji";

const meta: Meta<PropsWithChildren<{}>> = {
  title: "My Component",
  component: EmojiPicker,
  argTypes: {
    set: {
      defaultValue: "facebook",
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
