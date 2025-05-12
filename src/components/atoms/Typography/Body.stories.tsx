import type { Meta, StoryObj } from "@storybook/react";
import { Body } from "./index";

const meta: Meta<typeof Body> = {
  title: "Design System/Atoms/Typography/Body",
  component: Body,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["l", "m"],
      description: "The text size",
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
      options: ["p", "span", "div"],
      description: "The HTML element to render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Body>;

export const BodyL: Story = {
  args: {
    size: "l",
    children:
      "Body L (13px) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const BodyM: Story = {
  args: {
    size: "m",
    children:
      "Body M (12px) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};
