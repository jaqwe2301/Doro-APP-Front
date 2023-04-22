import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function InputText({ text, type }) {
  return (
    <View style={{ justifyContent: "center" }}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 600,

    lineHeight: 28,
  },
});
