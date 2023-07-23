import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ButtonOneThird({ text, onPress, backgroundColor }) {
  return (
    <View
      style={[
        styles.container,
        backgroundColor
          ? { backgroundColor: backgroundColor }
          : { backgroundColor: GlobalStyles.colors.primaryDefault },
      ]}
    >
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

export default ButtonOneThird;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: (Dimensions.get("window").width - 50) / 3,
    elevation: 4,
    borderRadius: 5.41,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: GlobalStyles.colors.primaryDefault,
  },
  text: {
    color: GlobalStyles.colors.gray07,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
});
