import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({
  title,
  value,
  onChangeText,
  secureTextEntry,
  borderColor,
  setBorderColor,
}) {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <View style={[styles.input, { borderColor: borderColor }]}>
        <TextInput
          style={styles.inputText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setBorderColor(GlobalStyles.colors.secondaryAccent)}
          onBlur={() => setBorderColor(GlobalStyles.colors.gray04)}
        ></TextInput>
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 23,
    marginBottom: 6,
    lineHeight: 20,
  },
  input: {
    height: 47,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5.41,
    justifyContent: "center",
  },
  inputText: {
    flex: 1,
    marginLeft: 16,
    // width: "100%",
  },
});
