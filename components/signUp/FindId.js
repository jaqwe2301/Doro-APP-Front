import { View, StyleSheet, Text, Pressable, SafeAreaView } from "react-native";

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerShadow}></View>
          <View style={styles.text}>
            <InputText text="가입된 아이디를 찾았어요." />
          </View>
          <View style={styles.idContainer}>
            <Text style={styles.idText}>{id}</Text>
          </View>
          <View style={styles.pwContainer}>
            <Text style={styles.pwText}>비밀번호를 잊으셨나요?</Text>
            <Pressable onPress={naviFindPW} style={styles.pw}>
              <Text style={[styles.pwText]}>비밀번호 찾기</Text>
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
    </SafeAreaView>
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
    marginHorizontal: 23,
    marginTop: 45,
  },
  idContainer: {
    height: 49,
    borderRadius: 5.41,
    paddingLeft: 20,
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: GlobalStyles.colors.gray06,
  },
  idText: {
    textAlignVertical: "center",
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
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
