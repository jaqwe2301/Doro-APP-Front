import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function SearchID() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.numberText}>휴대폰 번호인증</Text>
      </View>
      <View style={styles.viewBorder}></View>
      <Text>가입 시 입력한 휴대폰 번호</Text>
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
});
