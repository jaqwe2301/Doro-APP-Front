import {
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  Pressable,
  Alert,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Input from "../components/ui/Input";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState, useRef } from "react";
import { login } from "../utill/auth";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import jwtDecode from "jwt-decode";
import ButtonBig from "../components/ui/ButtonBig";

function LoginScreen({ navigation }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [borderColor1, setBorderColor1] = useState(GlobalStyles.colors.gray04);
  const [borderColor2, setBorderColor2] = useState(GlobalStyles.colors.gray04);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const { headerAccount, setHeaderAccount } = useContext(HeaderContext);
  const authCtx = useContext(AuthContext);

  const handleId = (text) => {
    setId(text);
  };
  const handlePw = (text) => {
    setPw(text);
  };

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //     console.log(expoPushToken);
  //     console.log("ㅗㅑㅗㅑ");
  //   };
  // }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        // body: `${expoPushToken}`,
        body: "seee",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

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
      setHeaderAccount(decoded.sub);
    } catch (error) {
      setBorderColor1(GlobalStyles.colors.red);
      setIsVisible(true);
      setBorderColor2(GlobalStyles.colors.red);
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
      <ScrollView>
        {/* <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        /> */}
        <View style={styles.content}>
          <View>
            <Input
              title="아이디"
              value={id}
              onChangeText={handleId}
              borderColor={borderColor1}
              setBorderColor={setBorderColor1}
            ></Input>
            {isVisible && (
              <Text style={styles.failText}>아이디가 틀렸습니다</Text>
            )}
          </View>
          <View style={{ marginTop: 30 }}>
            <Input
              title="비밀번호"
              value={pw}
              onChangeText={handlePw}
              secureTextEntry={true}
              borderColor={borderColor2}
              setBorderColor={setBorderColor2}
            ></Input>
            {isVisible && (
              <Text style={styles.failText}>비밀번호가 틀렸습니다</Text>
            )}
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
              navigationScreen({ title: "authPhone" });
              // navigationScreen({ title: "code" });
            }}
            style={styles.searchText}
          >
            회원가입
          </Text>
        </View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

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
    marginBottom: 30,
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
  failText: {
    color: GlobalStyles.colors.red,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    marginHorizontal: 25,
    marginTop: 3,
    position: "absolute",
    top: 73,
  },
});
