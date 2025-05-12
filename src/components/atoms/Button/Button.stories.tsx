import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary-large", "primary-small", "secondary", "destructive"],
      description: "The style variant of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button takes full width",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryLarge: Story = {
  args: {
    variant: "primary-large",
    children: "Button Primary (L)",
  },
};

export const PrimarySmall: Story = {
  args: {
    variant: "primary-small",
    children: "Button Primary (S)",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button Destructive",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary-large",
    disabled: true,
    children: "Disabled Button",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary-large",
    fullWidth: true,
    children: "Full Width Button",
  },
  parameters: {
    layout: "padded",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary-large",
    children: (
      <span className="inline-flex items-center">
        <span className="mr-2">+</span>
        <span>Add New Task</span>
      </span>
    ),
  },
};
