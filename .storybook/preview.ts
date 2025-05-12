import "../src/app/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  viewport: {
    defaultViewport: "responsive",
  },
  // Configuración de a11y
  a11y: {
    config: {
      rules: [
        {
          id: "color-contrast",
          enabled: true,
        },
      ],
    },
    options: {
      runOnly: ["wcag2a", "wcag2aa"],
    },
  },
  // Configuración para modo oscuro/claro
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#F4F7FD",
      },
      {
        name: "dark",
        value: "#20212C",
      },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    const isDark = context.globals.backgrounds?.value === "#20212C";

    if (typeof document !== "undefined") {
      document.body.className = isDark ? "dark" : "light";
    }

    return Story();
  },
];
