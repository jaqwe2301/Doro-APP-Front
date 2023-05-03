import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import InputSmall from "../components/ui/InputSmall";
import ButtonSmall from "../components/ui/ButtonSmall";

function SearchID() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.numberText}>휴대폰 번호인증</Text>
      </View>
      <View style={styles.viewBorder}></View>
      <Text style={styles.text}>가입 시 입력한 휴대폰 번호</Text>
      <View style={styles.inputContainer}>
        <View style={{ flex: 1 }}>
          <InputSmall hint="휴대폰 번호" />
        </View>
        <View>
          <ButtonSmall title="인증 요청" />
        </View>
      </View>
    </View>
  );
}

export default SearchID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  numberText: {
    width: 107,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
    color: GlobalStyles.colors.gray01,
    borderBottomColor: GlobalStyles.colors.primaryDefault,
    borderBottomWidth: 3,
    paddingBottom: 9,
    marginTop: 12,
    marginLeft: 20,
  },
  viewBorder: {
    height: 0.5,
    width: "100%",
    backgroundColor: GlobalStyles.colors.gray05,
  },
  text: {
    marginTop: 35,
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 400,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
});
