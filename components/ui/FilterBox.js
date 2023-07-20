import { View, Text, StyleSheet } from "react-native";

import DownGray from "../../assets/down.svg";
import DownBlack from "../../assets/up.svg";
import { GlobalStyles } from "../../constants/styles";
import { useEffect } from "react";

function FilterBox({ text, color, on }) {
  return (
    <View
      style={[
        styles.container,
        on ? { borderColor: GlobalStyles.colors.gray01, borderWidth: 2 } : null,
      ]}
    >
      <Text
        style={[
          styles.text,
          on ? { color: GlobalStyles.colors.gray01, fontWeight: "500" } : null,
        ]}
      >
        {text}
      </Text>

      {on ? (
        <DownBlack height={24} width={24} />
      ) : (
        <DownGray height={24} width={24} />
      )}
    </View>
  );
}

export default FilterBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    backgroundColor: "white",
    gap: 5,
    width: 107,
    height: 36,
    paddingLeft: 8,
    borderRadius: 45,
  },
  text: {
    // marginBottom: 3,
    fontSize: 15,
    fontWeight: "600",
    color: GlobalStyles.colors.gray03,
  },
});
