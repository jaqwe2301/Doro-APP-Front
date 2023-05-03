import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Bar({ flex1, flex2 }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.bar1, { flex: flex1 }]}></View>
      <View style={[styles.bar2, { flex: flex2 }]}></View>
    </View>
  );
}

export default Bar;

const styles = StyleSheet.create({
  bar1: {
    marginLeft: 20,
    height: 3,
    backgroundColor: GlobalStyles.colors.primaryDefault,
  },
  bar2: {
    marginRight: 20,
    height: 3,
    backgroundColor: GlobalStyles.colors.gray05,
  },
});
