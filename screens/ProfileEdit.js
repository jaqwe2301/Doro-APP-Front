import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import InputLine from "../components/ui/InputLine";
import { useContext, useEffect, useState } from "react";
import { authPhoneNum, verifyauthPhoneNum } from "../utill/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getProfile2, updateProfile } from "../utill/http";
import { Ionicons } from "@expo/vector-icons";
import ButtonBig from "../components/ui/ButtonBig";
import { HeaderContext } from "../store/header-context";
import Timer from "../components/ui/Timer";

function ProfileEdit({ navigation, route }) {
  const data = route.params.data;
  const { headerId, setHeaderId } = useContext(HeaderContext);
  console.log(headerId);
  const [phoneNum, setphoneNum] = useState(data.phone);
  const [authNum, setauthNum] = useState("");
  const [visible, setVisible] = useState(false);
  const [display1, setDispaly1] = useState("none");
  const [display2, setDispaly2] = useState("none");
  const [count, setCount] = useState(0);
  const [authVisible, setAuthVisible] = useState(false);

  const [birth, setBirth] = useState(data.birth);
  const [generation, setGeneration] = useState(data.generation);
  const [major, setMajor] = useState(data.degree.major);
  const [name, setName] = useState(data.name);

  const [school, setSchool] = useState(data.degree.school);
  const [studentId, setStudentId] = useState(data.degree.studentId);
  const [studentStatus, setStudentStatus] = useState(data.degree.studentStatus);
  // const navigation = useNavigation();

  const status = studentStatus === "ATTENDING" ? "재학" : "휴학";

  const handlePhoneChange = (text) => {
    setphoneNum(text);
  };
  const handleAuthChange = (text) => {
    setauthNum(text);
  };

  function statusSelect() {
    if (display1 === "none") {
      setDispaly1("flex");
      setDispaly2("none");
    } else {
      setDispaly1("none");
      setDispaly2("flex");
    }
  }

  async function completeHandler() {
    try {
      const success = await updateProfile({
        generation: generation,
        major: major,
        phone: phoneNum,
        school: school,
        studentId: studentId,
        studentStatus: studentStatus,
        id: headerId,
      });
      console.log(success);
      if (success.success) {
        navigation.replace("myPage");
      }
    } catch (error) {
      Alert.alert("ERROR", "Network Error");
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Text style={styles.cancelText} onPress={() => navigation.goBack()}>
            취소
          </Text>
        );
      },
      headerRight: () => {
        return (
          <Pressable onPress={completeHandler}>
            <Text style={styles.completeText}>완료</Text>
          </Pressable>
        );
      },
    });
    // profileHandler();
  }, [completeHandler]);

  function requestNumber() {
    try {
      authPhoneNum({ messageType: "UPDATE", phone: phoneNum });
      setCount(179);
      setAuthVisible(true);
    } catch (error) {
      Alert.alert("ERROR", "다시 시도해주세요");
    }
  }

  async function verifyAuthNum() {
    if (authNum.length === 6) {
      try {
        const success = await verifyauthPhoneNum({
          authNum: authNum,
          messageType: "UPDATE",
          phone: phoneNum,
        });

        console.log(success);
        if (success) {
          setCount(0);
          setAuthVisible(false);
          Alert.alert("번호 변경", "휴대폰 번호 변경 완료");
        } else {
          Alert.alert("인증번호 불일치", "정확한 인증번호를 입력해주세요");
        }
      } catch (error) {
        Alert.alert("ERROR", "Network Error");
      }
    } else {
    }
  }

  function okayBtn() {
    if (display1 === "flex" || display2 === "flex") {
      setStudentStatus(display1 === "none" ? "ABSENCE" : "ATTENDING");

      setVisible(!visible);
    } else {
      setVisible(!visible);
    }
  }

  function navi() {
    navigation.navigate("searchPw");
  }

  const handleSchoolChange = (text) => {
    setSchool(text);
  };
  const handleMajorChange = (text) => {
    setMajor(text);
  };
  const handleStudentIdChange = (text) => {
    setStudentId(text);
  };

  const handleGenerationChange = (text) => {
    setGeneration(text);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/profile.png")}
          />
          <View style={{ marginTop: 8 }}>
            <Pressable>
              <Text style={styles.imgEditText}>사진 수정</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.border, { marginTop: 16 }]}></View>
        <View>
          <Text style={styles.contentTitle}>기본정보</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>이름</Text>
            <Text style={styles.contentText}>{data.name}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>생년월일</Text>
            <Text style={styles.contentText}>{data.birth}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>휴대전화번호</Text>
            <InputLine
              onChangeText={handlePhoneChange}
              value={phoneNum}
              keyboardType="numeric"
            />
            <Pressable onPress={requestNumber}>
              <Text style={styles.auth}>인증요청</Text>
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>인증번호</Text>
            <InputLine
              onChangeText={handleAuthChange}
              value={authNum}
              keyboardType="numeric"
            />
            {authVisible && (
              <View style={{ marginTop: 0 }}>
                <Timer
                  count={count}
                  setCount={setCount}
                  smallStyle={styles.timer2}
                />
              </View>
            )}
            <Pressable onPress={verifyAuthNum}>
              <Text style={styles.auth}>인증확인</Text>
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>학교</Text>
            <InputLine onChangeText={handleSchoolChange} value={school} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>전공</Text>
            <InputLine onChangeText={handleMajorChange} value={major} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>학번</Text>
            <InputLine onChangeText={handleStudentIdChange} value={studentId} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>재학 유무</Text>
            <Pressable onPress={() => setVisible(!visible)}>
              <View style={styles.statusContainer2}>
                <Text style={styles.statusText2}>{status}</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>기수</Text>
            <InputLine
              onChangeText={handleGenerationChange}
              value={String(generation)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.border}></View>
        </View>
        <View>
          <Text style={styles.contentTitle}>로그인 정보</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>아이디</Text>
            <Text
              style={[
                styles.contentText,
                { color: GlobalStyles.colors.gray01 },
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>비밀번호</Text>
            <Pressable onPress={navi}>
              <Text
                style={[
                  styles.contentText,
                  { borderBottomWidth: 1, color: GlobalStyles.colors.gray01 },
                ]}
              >
                비밀번호 수정
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.border}></View>
        <Modal
          animationType="none"
          transparent={true}
          visible={visible}
          statusBarTranslucent={true}
          onRequestClose={() => setVisible(!visible)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setVisible(!visible)}
          >
            <Pressable>
              <View
                style={{
                  backgroundColor: "white",

                  height: 273,
                  justifyContent: "space-between",

                  borderTopEndRadius: 5.41,
                  borderTopStartRadius: 5.41,
                }}
              >
                <View>
                  <View style={styles.statusTitleContainer}>
                    <View style={styles.iconContainer}>
                      <Pressable onPress={() => setVisible(!visible)}>
                        <Ionicons name="close-outline" size={40} />
                      </Pressable>
                    </View>
                    <Text style={styles.statusTitle}>재학 유무</Text>
                  </View>
                  <Pressable
                    style={styles.statusTextContainer}
                    onPress={statusSelect}
                  >
                    <Text style={styles.statusText}>재학</Text>
                    <View
                      style={[styles.iconContainer2, { display: display1 }]}
                    >
                      <Ionicons name="checkmark" size={30} />
                    </View>
                  </Pressable>
                  <Pressable
                    style={styles.statusTextContainer}
                    onPress={statusSelect}
                  >
                    <Text style={styles.statusText}>휴학</Text>
                    <View
                      style={[styles.iconContainer2, { display: display2 }]}
                    >
                      <Ionicons name="checkmark" size={30} />
                    </View>
                  </Pressable>
                </View>
                <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
                  <ButtonBig
                    text="확인"
                    style={GlobalStyles.colors.primaryDefault}
                    onPress={okayBtn}
                  />
                </View>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </ScrollView>
    </View>
  );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 99,
    height: 99,
  },
  imgEditText: {
    color: GlobalStyles.colors.primaryDefault,
    fontWeight: 400,
    fontSize: 12,
  },
  border: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 33,
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 33,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    width: 70,
    color: GlobalStyles.colors.gray03,
  },
  contentText: {
    marginLeft: 45,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  contentTitle: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
  },
  inputContainer: {
    marginLeft: 45,
  },
  auth: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray01,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray01,
    marginLeft: 10,
    width: 50,
    textAlign: "center",
  },
  cancelText: {
    fontWeight: 400,
    fontSize: 15,
    color: GlobalStyles.colors.gray05,
    marginLeft: 10,
  },
  completeText: {
    fontWeight: "400",
    fontSize: 15,
    // lineHeight: 20,
    color: GlobalStyles.colors.primaryDefault,
    marginRight: 10,
  },
  statusContainer2: {
    flex: 1,
    marginLeft: 45,
    borderBottomColor: GlobalStyles.colors.gray06,
    borderBottomWidth: 0.5,
    height: 17,
  },
  statusText2: {
    fontSize: 12,
    fontWeight: "400",
    color: GlobalStyles.colors.gray01,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  statusTitleContainer: {
    flexDirection: "row",
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    height: 53,
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 22,
    marginTop: 3,
    flex: 1,

    marginRight: 50,
    textAlign: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    marginLeft: 20,
  },
  statusTextContainer: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.5,
    height: 42,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 10,
    marginTop: 3,
  },
  iconContainer2: {
    marginRight: 10,
    marginTop: 2,
  },
  timer2: {
    color: GlobalStyles.colors.red,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    position: "absolute",
    top: 0,
    right: 9,
  },
});
