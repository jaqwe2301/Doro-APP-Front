import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ButtonSmall({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.textContainer, { backgroundColor: style }]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default ButtonSmall;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 600,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  textContainer: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 5.41,
  },
});
