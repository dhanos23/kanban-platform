import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const ColorPalette = () => {
  const colors = [
    { name: "Main Purple", variable: "--color-main-purple", hex: "#635FC7" },
    {
      name: "Main Purple Hover",
      variable: "--color-main-purple-hover",
      hex: "#A8A4FF",
    },
    { name: "Black", variable: "--color-black", hex: "#000112" },
    {
      name: "Very Dark Grey",
      variable: "--color-very-dark-grey",
      hex: "#20212C",
    },
    { name: "Dark Grey", variable: "--color-dark-grey", hex: "#2B2C37" },
    { name: "Lines Dark", variable: "--color-lines-dark", hex: "#3E3F4E" },
    { name: "Medium Grey", variable: "--color-medium-grey", hex: "#828FA3" },
    { name: "Lines Light", variable: "--color-lines-light", hex: "#E4EBFA" },
    { name: "Light Grey", variable: "--color-light-grey", hex: "#F4F7FD" },
    { name: "White", variable: "--color-white", hex: "#FFFFFF" },
    { name: "Red", variable: "--color-red", hex: "#EA5555" },
    { name: "Red Hover", variable: "--color-red-hover", hex: "#FF9898" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-heading-xl mb-8">Color Palette</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colors.map((color) => (
          <div
            key={color.variable}
            className="border rounded-lg overflow-hidden"
          >
            <div
              className="h-24 w-full"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="p-4 bg-white dark:bg-dark-grey">
              <h3 className="text-heading-m">{color.name}</h3>
              <p className="text-body-l text-medium-grey">
                CSS: {color.variable}
              </p>
              <p className="text-body-l text-medium-grey">HEX: {color.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof ColorPalette> = {
  title: "Design System/Foundation/Colors",
  component: ColorPalette,
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {};
