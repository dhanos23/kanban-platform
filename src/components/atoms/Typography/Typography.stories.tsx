import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./index";

const metaHeading: Meta<typeof Heading> = {
  title: "Design System/Atoms/Typography/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["xl", "l", "m", "s"],
      description: "The heading level, which affects size and style",
    },
    children: {
      control: "text",
      description: "The text content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "span", "div"],
      description: "The HTML element to render",
    },
  },
};

export default metaHeading;
type HeadingStory = StoryObj<typeof Heading>;

export const HeadingXL: HeadingStory = {
  args: {
    level: "xl",
    children: "Heading XL (24px)",
  },
};

export const HeadingL: HeadingStory = {
  args: {
    level: "l",
    children: "Heading L (18px)",
  },
};

export const HeadingM: HeadingStory = {
  args: {
    level: "m",
    children: "Heading M (15px)",
  },
};

export const HeadingS: HeadingStory = {
  args: {
    level: "s",
    children: "HEADING S (12PX, UPPERCASE)",
  },
};
