import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ title, value, onChangeText }) {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          value={value}
          onChangeText={onChangeText}
        ></TextInput>
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 3,
    marginBottom: 6,
  },
  input: {
    height: 47,
    width: 335,
    borderColor: GlobalStyles.colors.gray04,
    borderWidth: 2,
    borderRadius: 5.41,
    justifyContent: "center",
  },
  inputText: {
    marginLeft: 16,
  },
});
