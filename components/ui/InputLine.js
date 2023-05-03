import { View, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function InputLine({ keyboardType, value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.colors.gray01}
      ></TextInput>
    </View>
  );
}

export default InputLine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: GlobalStyles.colors.gray06,
    borderBottomWidth: 0.5,
    marginLeft: 45,
    height: 17,
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 1,
    color: GlobalStyles.colors.gray01,
  },
});
