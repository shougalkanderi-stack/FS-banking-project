import { StyleSheet } from "react-native";
import { spacing } from "../theme/_layout";
import colors from "../theme/colors";
import { fontSizes } from "../theme/fonts";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroud,
    padding: spacing.large,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors[1],
    alignSelf: "center",
    marginVertical: spacing.large,
  },
  name: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
  },
  email: {
    fontSize: fontSizes.Medim,
    textAlign: "center",
    color: colors[1],
    marginBottom: spacing.large,
  },
  sectionHeader: {
    fontSize: fontSizes.Medim,
    fontWeight: "600",
    marginTop: spacing.large,
    marginBottom: spacing.small,
    color: colors.primary,
  },
});
