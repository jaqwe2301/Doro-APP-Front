import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Bar({ num }) {
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
      <View
        style={[
          styles.bar1,
          num >= 1 && { backgroundColor: GlobalStyles.colors.primaryDefault },
        ]}
      ></View>
      <View
        style={[
          styles.bar1,
          num >= 2 && { backgroundColor: GlobalStyles.colors.primaryDefault },
        ]}
      ></View>
      <View
        style={[
          styles.bar1,
          num >= 3 && { backgroundColor: GlobalStyles.colors.primaryDefault },
        ]}
      ></View>
      <View
        style={[
          styles.bar1,
          num >= 4 && { backgroundColor: GlobalStyles.colors.primaryDefault },
        ]}
      ></View>
    </View>
  );
}

export default Bar;

const styles = StyleSheet.create({
  bar1: {
    marginLeft: 1,
    flex: 1,
    height: 3,
    backgroundColor: GlobalStyles.colors.gray05,
  },
});
