const config = {
  plugins: {
    "@tailwindcss/postcss": {
      safelist: [
        "btn-primary-large",
        "btn-primary-small",
        "btn-secondary",
        "btn-destructive",
        "btn-disabled",
        "btn-full",
        "btn-focus",
        "logo-transition",
        "header-logo-area",
        "sidebar-transition",
        "main-content-transition",
        "fade-in",
        "fade-out",
      ],
    },
  },
};

export default config;
