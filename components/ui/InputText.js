import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function InputText({ text, option, type }) {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems:"center" }}>
      {option ? <Text style={styles.option}>({option})</Text> : ""}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "600",
    // lineHeight: 28,
  },
  option: {
    fontSize: 16,
    fontWeight: "400",
    // paddingBottom: 10
  },
});
