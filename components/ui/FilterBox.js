import { View, Text, StyleSheet } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Down from "../../assets/down.svg";
import { GlobalStyles } from "../../constants/styles";

function FilterBox({ text, color }) {
  return (
    <View
      style={[
        styles.container,
        { borderColor: color },
        color ? { borderWidth: 2 } : "",
      ]}
    >
      <Text style={[styles.text, color ? { color: color } : ""]}>{text}</Text>
      <WithLocalSvg
        asset={Down}
        fill={color ? color : GlobalStyles.colors.gray03}
        // stroke={GlobalStyles.colors.gray03}
        height={26}
        width={26}
      />
    </View>
  );
}

export default FilterBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 5,
    width: 107,
    height: 36,
    paddingLeft: 8,
    borderRadius: 45,
  },
  text: {
    marginBottom: 3,
    fontSize: 15,
    fontWeight: "600",
    color: GlobalStyles.colors.gray03,
  },
});
