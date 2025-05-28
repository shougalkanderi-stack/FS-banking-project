import { StyleSheet } from "react-native";
import { spacing } from "../theme/_layout";
import colors from "../theme/colors";
import { fontSizes } from "../theme/fonts";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroud,
    padding: spacing.large,
    justifyContent: "center",
  },
  title: {
    fontSize: fontSizes.xLarge,
    fontWeight: "bold",
    marginBottom: spacing.large,
    textAlign: "center",
    color: colors.primary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    backgroundColor: "#fff",
  },
  linkText: {
    color: colors.secondary,
    textAlign: "center",
    marginTop: spacing.small,
  },
});
