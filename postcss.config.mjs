const config = {
  plugins: [
    {
      "@tailwindcss/postcss": {
        safelist: [
          "btn-primary-large",
          "btn-primary-small",
          "btn-secondary",
          "btn-destructive",
          "btn-disabled",
        ],
      },
    },
  ],
};

export default config;
