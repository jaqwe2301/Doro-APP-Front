import { View, StyleSheet, Text, Pressable } from "react-native";

import InputText from "../ui/InputText";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function FindId({ route }) {
  const navigation = useNavigation();
  const id = route.params.id;

  function naviLogin() {
    navigation.replace("login");
  }
  function naviFindPW() {
    navigation.navigate("searchPw");
  }

  
  //   const id = route.params.id;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerShadow}></View>
        <View style={styles.text}>
          <InputText text="가입된 아이디를 찾았어요." />
        </View>
        <Text style={styles.idContainer}>{id}</Text>
        <View style={styles.pwContainer}>
          <Text style={styles.pwText}>비밀번호를 잊으셨나요?</Text>
          <Pressable onPress={naviFindPW}>
            <Text style={[styles.pwText, styles.pw]}>비밀번호 찾기</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, marginBottom: 83 }}>
        <ButtonBig
          text="로그인 하기"
          style={GlobalStyles.colors.primaryAccent}
          onPress={naviLogin}
        />
      </View>
    </View>
  );
}

export default FindId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  headerShadow: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.5,
  },
  text: {
    marginHorizontal: 20,
    marginTop: 45,
  },
  idContainer: {
    height: 49,
    borderRadius: 5.41,
    paddingLeft: 20,
    textAlignVertical: "center",
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: GlobalStyles.colors.gray06,
  },
  pwContainer: {
    marginTop: 8,
    marginLeft: 20,
    flexDirection: "row",
  },
  pwText: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray05,
  },
  pw: {
    marginLeft: 18,
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.3,
  },
});
