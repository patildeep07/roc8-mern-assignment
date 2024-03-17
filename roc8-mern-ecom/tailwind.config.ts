import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primaryColor: "#FFFFFF",
        secondaryColor: "#000000",
        lighterGray: "#F4F4F4",
      },
    },
  },
  plugins: [],
} satisfies Config;
