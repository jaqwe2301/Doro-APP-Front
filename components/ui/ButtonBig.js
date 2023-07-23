import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ButtonBig({
  text,
  style = GlobalStyles.colors.primaryDefault,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, { backgroundColor: style }]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default ButtonBig;

const styles = StyleSheet.create({
  container: {
    height: 49,
    elevation: 3,
    borderRadius: 5.41,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.4, // 그림자의 투명도
    shadowRadius: 1.5, // 그
  },
  text: {
    color: GlobalStyles.colors.gray07,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
});
