import { View, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";
function InputData({
  hint,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={hint}
        placeholderTextColor={GlobalStyles.colors.gray05}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

export default InputData;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "100%",
    borderColor: GlobalStyles.colors.gray05,
    borderWidth: 1,
    borderRadius: 5.41,
    paddingLeft: 20,
    lineHeight: 20,
    fontSize: 15,
    color: GlobalStyles.colors.gray01,
    fontWeight: "600",
  },
});
