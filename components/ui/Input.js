import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ title, value, onChangeText, secureTextEntry }) {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
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
    marginLeft: 23,
    marginBottom: 6,
    lineHeight: 20,
  },
  input: {
    height: 47,
    marginHorizontal: 20,
    borderColor: GlobalStyles.colors.gray04,
    borderWidth: 2,
    borderRadius: 5.41,
    justifyContent: "center",
  },
  inputText: {
    flex: 1,
    marginLeft: 16,
    // width: "100%",
  },
});
