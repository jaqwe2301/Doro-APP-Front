import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ButtonBig({ text, style, onPress }) {
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
  },
  text: {
    color: GlobalStyles.colors.gray07,
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 22,
  },
});
