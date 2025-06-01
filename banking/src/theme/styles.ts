import { StyleSheet } from "react-native";
import { fontSizes } from "../theme/fonts";
import { spacing } from "./_layout";
import colors from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
  
  // Text Styles
  heading: {
    fontSize: fontSizes.large,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.medium,
  },
  subheading: {
    fontSize: fontSizes.Medim,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.small,
  },
  
  // Input Styles
  input: {
    height: 56,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.card,
    fontSize: fontSizes.Medim,
    marginBottom: spacing.medium,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  
  // Button Styles
  button: {
    height: 56,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: spacing.small,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: spacing.small,
  },
  buttonText: {
    color: colors.card,
    fontSize: fontSizes.Medim,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  
  // Card Styles
  card: {
    backgroundColor: colors.card,
    padding: spacing.large,
    borderRadius: 16,
    marginVertical: spacing.medium,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: fontSizes.large,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.small,
  },
  cardSubtitle: {
    fontSize: fontSizes.Medim,
    color: colors.textSecondary,
    marginBottom: spacing.medium,
  },
  
  // Balance Display
  balanceText: {
    fontSize: fontSizes.large * 1.5,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  positiveAmount: {
    color: colors.success,
    fontWeight: "600",
  },
  negativeAmount: {
    color: colors.danger,
    fontWeight: "600",
  },
  
  // List Items
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.medium,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: spacing.small / 2,
  },
  listItemText: {
    flex: 1,
    fontSize: fontSizes.Medim,
    color: colors.text,
  },
});
