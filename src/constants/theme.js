import { MD3LightTheme } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1A1A1A",
    onPrimary: "#FFFFFF",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    surfaceVariant: "#EEEEEE",
    onBackground: "#1A1A1A",
    onSurface: "#333333",
    outline: "#CCCCCC",
    error: "#B00020",
  },
  custom: {
    income: "#2E7D32",
    expense: "#C62828",
    muted: "#999999",
  },
};

export default theme;

