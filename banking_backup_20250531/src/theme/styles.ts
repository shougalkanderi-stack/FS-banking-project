import { StyleSheet } from "react-native";
import { fontSizes } from "../theme/fonts";
import { spacing } from "./_layout";
import colors from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.backgroud,
  },
  input: {
    height: 48,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.medium,
    backgroundColor: "#fff",
    fontSize: fontSizes.Medim,
    marginBottom: spacing.medium,
  },
  button: {
    height: 50,
    backgroundColor: colors.backgroud,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: spacing.small,
  },
  buttonText: {
    color: "#fff",
    fontSize: fontSizes.Medim,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.card,
    padding: spacing.large,
    borderRadius: 12,
    marginVertical: spacing.small,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: fontSizes.small,
    color: colors[1],
    marginTop: 4,
  },
});
