import { View, Text, StyleSheet } from "react-native";

function InputText({ text, type }) {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 600,
  },
});
