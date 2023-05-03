import { View, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";
function InputSmall({ hint, value, onChangeText }) {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={hint}
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default InputSmall;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "100%",
    borderColor: GlobalStyles.colors.gray05,
    borderWidth: 1,
    borderRadius: 5.41,
    paddingLeft: 20,
  },
});
