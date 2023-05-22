import {
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import Input from "../components/ui/Input";
import { GlobalStyles } from "../constants/styles";
import { useContext, useState } from "react";
import { login } from "../utill/auth";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import jwtDecode from "jwt-decode";
import ButtonBig from "../components/ui/ButtonBig";

function LoginScreen({ navigation }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const authCtx = useContext(AuthContext);

  const handleId = (text) => {
    setId(text);
  };
  const handlePw = (text) => {
    setPw(text);
  };

  async function loginHandler() {
    setIsAuthenticating(true);
    try {
      const token = await login({ id: id, pw: pw });
      console.log(token.headers.authorization);
      console.log(token.data);
      authCtx.authenticate(token.headers.authorization, token.data);
      const decoded = jwtDecode(token.headers.authorization);
      console.log(decoded);

      setHeaderRole(decoded.roles[0].authority);
      setHeaderId(decoded.id);
    } catch (error) {
      Alert.alert("로그인 실패", "could not ");
      setIsAuthenticating(false);
    }
  }

  function navigationScreen({ title }) {
    navigation.navigate(title);
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: GlobalStyles.colors.gray05,
          borderBottomWidth: 0.5,
        }}
      />
      <View style={styles.content}>
        <View>
          <Input title="아이디" value={id} onChangeText={handleId}></Input>
        </View>
        <View style={{ marginTop: 14 }}>
          <Input
            title="비밀번호"
            value={pw}
            onChangeText={handlePw}
            secureTextEntry={true}
          ></Input>
        </View>
      </View>
      <View style={styles.button}>
        <ButtonBig
          onPress={loginHandler}
          text="로그인"
          style={GlobalStyles.colors.primaryDefault}
        />
      </View>
      <View style={styles.searchTextContainer}>
        <Text
          onPress={() => {
            navigationScreen({ title: "searchId" });
          }}
          style={styles.searchText}
        >
          아이디 찾기
        </Text>
        <View style={styles.slash}></View>
        <Text
          onPress={() => {
            navigationScreen({ title: "searchPw" });
          }}
          style={styles.searchText}
        >
          비밀번호 찾기
        </Text>
        <View style={styles.slash}></View>
        <Text
          onPress={() => {
            navigationScreen({ title: "signUp" });
          }}
          style={styles.searchText}
        >
          회원가입
        </Text>
      </View>
      {/* </View> */}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F4F4" },

  content: { marginTop: 58 },
  button: {
    marginHorizontal: 20,
    // width: "100%",
    // height: 49,
    // borderRadius: 5.41,
    marginTop: 58,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: GlobalStyles.colors.primaryDefault,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 5.41,
    // elevation: 3,
  },

  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 17,
    fontWeight: 600,
  },
  searchTextContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchText: {
    color: GlobalStyles.colors.gray01,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
  },
  slash: {
    width: 1,
    height: 13,
    backgroundColor: GlobalStyles.colors.gray05,
    marginHorizontal: 18,
  },
});
