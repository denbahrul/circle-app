import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeConfig: ThemeOverride = {
  colors: {
    brand: {
      oke: "#04A51E",
      background: "#1D1D1D",
    },
  },
  fonts: {
    heading: `"Nerko One", cursive`,
    body: `"Nerko One", cursive`,
    mono: `"Nerko One", cursive`,
  },
};

export const theme = extendTheme(themeConfig satisfies ThemeOverride);
