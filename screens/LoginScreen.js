import { Text, Image, View, StyleSheet, Button } from "react-native";
import Input from "../components/ui/Input";
import { GlobalStyles } from "../constants/styles";

function LoginScreen({ navigation }) {
  function navigationScreen({ title }) {
    navigation.navigate(title);
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Input title="아이디"></Input>
        </View>
        <View style={{ marginTop: 14 }}>
          <Input title="비밀번호"></Input>
        </View>

        <Text style={styles.button}>로그인</Text>
        <View style={styles.searchText}>
          <Text
            onPress={() => {
              navigationScreen({ title: "searchId" });
            }}
          >
            아이디 찾기
          </Text>
          <View style={styles.slash}></View>
          <Text
            onPress={() => {
              navigationScreen({ title: "searchPw" });
            }}
          >
            비밀번호 찾기
          </Text>
          <View style={styles.slash}></View>
          <Text
            onPress={() => {
              navigationScreen({ title: "signUp" });
            }}
          >
            회원가입
          </Text>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: { flex: 1, alignItems: "center", marginTop: 58 },
  button: {
    width: 332,
    height: 49,
    borderRadius: 5.41,
    marginTop: 58,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 17,
    fontWeight: 600,
    backgroundColor: GlobalStyles.colors.primaryDefault,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.41,
    elevation: 3,
  },
  buttonText: {
    color: "white",
  },
  searchText: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: GlobalStyles.colors.gray01,
    fontSize: 15,
    fontWeight: 400,
  },
  slash: {
    width: 1,
    height: 13,
    backgroundColor: GlobalStyles.colors.gray05,
    marginHorizontal: 18,
  },
});
