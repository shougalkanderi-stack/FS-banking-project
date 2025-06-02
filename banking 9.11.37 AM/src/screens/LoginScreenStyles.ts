import { StyleSheet } from "react-native";
import { spacing } from "../theme/_layout";
import colors from "../theme/colors";
import { fontSizes } from "../theme/fonts";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.large,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.large * 2,
  },
  title: {
    fontSize: fontSizes.xLarge,
    fontWeight: "700",
    marginBottom: spacing.medium,
    textAlign: "center",
    color: colors.primary,
  },
  subtitle: {
    fontSize: fontSizes.Medim,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.large,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    backgroundColor: colors.card,
    fontSize: fontSizes.Medim,
    color: colors.text,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.medium,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: colors.card,
    fontSize: fontSizes.Medim,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  linkText: {
    color: colors.link,
    textAlign: "center",
    marginTop: spacing.medium,
    fontSize: fontSizes.Medim,
    fontWeight: "500",
  },
  forgotPassword: {
    color: colors.textSecondary,
    textAlign: "right",
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    fontSize: fontSizes.small,
  },
});
