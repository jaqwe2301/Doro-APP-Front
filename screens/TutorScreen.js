import {
  View,
  Image,
  Pressable,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  NativeModules,
} from "react-native";

import ButtonBig from "../components/ui/ButtonBig";
import { GlobalStyles } from "../constants/styles";
import { useEffect, useState } from "react";
import InputLine from "../components/ui/InputLine";
import Profile from "../assets/defaultProfile.svg";
import Down from "../assets/down.svg";
import { Ionicons } from "@expo/vector-icons";
import { KRBold, KRRegular } from "../constants/fonts";
import { AuthContext } from "../store/auth-context";
import { updateProfile } from "../utill/http";
import GenerationModal from "../components/ui/GenerationModal";

function TutorScreen({ route, navigation }) {
  const data = route.params.id;
  const headerId = route.params.headerId;
  const authCtx = useContext(AuthContext);

  const [phoneNum, setphoneNum] = useState(data.phone);
  const [visible, setVisible] = useState(false);
  const [Gvisible, setGVisible] = useState(false);
  const [display1, setDispaly1] = useState("none");
  const [display2, setDispaly2] = useState("none");
  const [imageUrl, setImageUrl] = useState(data.profileImg);
  const [generation, setGeneration] = useState(data.generation);
  const [major, setMajor] = useState(data.degree.major);
  const [school, setSchool] = useState(data.degree.school);
  const [studentId, setStudentId] = useState(data.degree.studentId);
  const [studentStatus, setStudentStatus] = useState(data.degree.studentStatus);

  const status1 = studentStatus === "ATTENDING" ? "재학" : "휴학";

  const handlePhoneChange = (text) => {
    setphoneNum(text);
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
      if (success.success) {
        navigation.replace("ManagerPage");
      }
    } catch (error) {
      Alert.alert("ERROR", "Network Error");
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
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
  }, [completeHandler]);

  function okayBtn() {
    if (display1 === "flex" || display2 === "flex") {
      setStudentStatus(display1 === "none" ? "ABSENCE" : "ATTENDING");

      setVisible(!visible);
    } else {
      setVisible(!visible);
    }
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
  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 44 + statusBarHeight : 0}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            {imageUrl !== null ? (
              <Image
                style={styles.image}
                source={{
                  uri: imageUrl,
                }}
              />
            ) : (
              // <Image
              //   style={styles.image}
              //   source={require("../assets/profile.png")}
              // />
              <View style={{ margin: 11 }}>
                <Profile />
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text style={KRBold.Body}>{data.name}</Text>
            {/* </View>
        <View> */}

            <Text
              style={[KRRegular.Subbody, { color: GlobalStyles.colors.gray03 }]}
            >
              DORO {generation}기
            </Text>
          </View>
          <View style={[styles.border, { marginTop: 33 }]}></View>
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
              <Text style={styles.title}>기수</Text>
              <View style={[styles.statusContainer2]}>
                <Pressable onPress={() => setGVisible(!Gvisible)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <InputLine
                  onChangeText={handleGenerationChange}
                  value={String(generation)}
                  keyboardType="numeric"
                /> */}
                    <Text style={styles.statusText2}>DORO {generation}기</Text>
                    {/* <View style={{ paddingBottom: 3 }}> */}
                    <Down width={20} height={20} />
                    {/* </View> */}
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>휴대전화번호</Text>
              {/* <InputLine
              onChangeText={handlePhoneChange}
              value={phoneNum}
              keyboardType="numeric"
              
            /> */}
              <Text style={styles.contentText}>
                {data.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
              </Text>
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
              <InputLine
                onChangeText={handleStudentIdChange}
                value={studentId}
              />
            </View>
            <View style={[styles.contentContainer, { marginBottom: 100 }]}>
              <Text style={styles.title}>재학 유무</Text>
              <View style={styles.statusContainer2}>
                <Pressable onPress={() => setVisible(!visible)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.statusText2}>{status1}</Text>
                    {/* <View style={{ marginBottom: -2 }}> */}
                    <Down width={20} height={20} />
                    {/* </View> */}
                  </View>
                </Pressable>
              </View>
              {/* <View style={{ marginTop: 50 }}></View> */}
            </View>
          </View>
          <GenerationModal
            visibleCode={Gvisible}
            setVisibleCode={setGVisible}
            title="기수 변경"
            setInputGeneration={setGeneration}
            inputGeneration={generation}
            type={false}
          />

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
                    // height: 273,
                    // justifyContent: "space-between",
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
                  <View style={styles.modalButtonContainer}>
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
    </KeyboardAvoidingView>
  );
}

export default TutorScreen;

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
    width: 78,
    margin: 11,
    height: 78,

    borderRadius: 50,
  },
  imgEditText: {
    color: GlobalStyles.colors.primaryDefault,
    fontWeight: "400",
    fontSize: 12,
  },
  modalButtonContainer: {
    // height: 45,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 24 : 0,
    marginBottom: 14,
    marginTop: 53,
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
    fontWeight: "400",
    lineHeight: 17,
    width: 70,
    color: GlobalStyles.colors.gray03,
  },
  contentText: {
    marginLeft: 45,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  contentTextView: {
    marginLeft: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: GlobalStyles.colors.gray01,
  },
  contentTitle: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  inputContainer: {
    marginLeft: 45,
  },
  authView: {
    color: GlobalStyles.colors.gray01,
    borderBottomWidth: 0.5,
    borderBottomColor: GlobalStyles.colors.gray01,
    marginLeft: 10,
  },
  auth: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,

    textAlign: "center",
  },
  cancelText: {
    fontWeight: "400",
    fontSize: 15,
    color: GlobalStyles.colors.gray01,
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
    // width: "100%",
    flex: 1,
    // paddingRight: 20,
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
    fontWeight: "600",
    lineHeight: 22,
    marginTop: 3,
    flex: 1,

    marginRight: 50,
    textAlign: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "400",
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
    fontWeight: "400",
    lineHeight: 17,
    position: "absolute",
    top: 0,
    right: 9,
  },
});
