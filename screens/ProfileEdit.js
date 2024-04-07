import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Modal,
  NativeModules,
  Platform,
  SafeAreaView,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import InputLine from "../components/ui/InputLine";
import { useContext, useEffect, useState } from "react";
import { authPhoneNum, verifyauthPhoneNum } from "../utill/auth";
import Left from "../assets/left.svg";
import { updateProfile, updateUserImage } from "../utill/http";
import { Ionicons } from "@expo/vector-icons";
import ButtonBig from "../components/ui/ButtonBig";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import Timer from "../components/feat/Timer";
import * as ImagePicker from "expo-image-picker";

import Down from "../assets/down.svg";
import { KeyboardAvoidingView } from "react-native";
import { KRBold } from "../constants/fonts";
import DateTimePicker from "@react-native-community/datetimepicker";

function ProfileEdit({ navigation, route }) {
  const data = route.params.data;
  const authCtx = useContext(AuthContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const { headerAccount, setHeaderAccount } = useContext(HeaderContext);

  const [phoneNum, setphoneNum] = useState(data.phone);
  const [authNum, setauthNum] = useState("");
  const [visible, setVisible] = useState(false);
  const [display1, setDispaly1] = useState("none");
  const [display2, setDispaly2] = useState("none");
  const [count, setCount] = useState(0);
  const [authVisible, setAuthVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(data.profileImg);
  const [birth, setBirth] = useState(data.birth);
  const [generation, setGeneration] = useState(data.generation);
  const [major, setMajor] = useState(data.degree.major);
  const [name, setName] = useState(data.name);

  const [date, setDate] = useState(
    data.birth !== null ? new Date(data.birth) : null
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (Platform.OS === "android") {
      setShow(false);
      // setBtn(true);
      setlbtnColor(
        inputName !== ""
          ? GlobalStyles.colors.primaryDefault
          : GlobalStyles.colors.gray05
      );
    }
    setDate(currentDate);
  };

  const [school, setSchool] = useState(data.degree.school);
  const [studentId, setStudentId] = useState(data.degree.studentId);
  const [studentStatus, setStudentStatus] = useState(data.degree.studentStatus);
  const [show, setShow] = useState(false);
  // const navigation = useNavigation();

  const status1 = studentStatus === "ATTENDING" ? "재학" : "휴학";
  const formData = new FormData();

  const [profileImg, setProfileImg] = useState();
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
      if (imageUrl !== null) {
        try {
          const filename = profileImg.assets[0].uri.split("/").pop();

          formData.append("images", {
            uri: profileImg.assets[0].uri,
            type: "image/jpeg",
            // type: "multipart/form-data",
            name: filename,
          });
          const response = await updateUserImage({ formData: formData });
        } catch (error) {
          if (error.isRefreshError) {
            // RefreshToken 관련 에러 시 로그아웃
            authCtx.logout();
          }
        }
      }
      const success = await updateProfile({
        birth: date,
        generation: generation,
        major: major,
        phone: phoneNum,
        school: school,
        studentId: studentId,
        studentStatus: studentStatus,
        id: headerId,
      });
      if (success.success) {
        navigation.replace("myPageScreen");
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

        if (success) {
          setCount(0);
          setAuthVisible(false);
          Alert.alert("알림", "휴대전화번호 변경이 완료되었습니다");
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
  function okayBtn2() {
    setShow(false);
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

  //camera
  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();

  const uploadImage = async () => {
    if (!statusCamera?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          "카메라 권한 요청",
          "이 기능을 사용하려면 카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.",
          [
            {
              text: "닫기",
              style: "cancel",
            },
          ]
        );
        return null;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // const filename = result.assets[0].uri.split("/").pop();
      setProfileImg(result);
      // formData.append("images", {
      //   uri: result.assets[0].uri,
      //   type: "image/jpeg",
      //   // type: "multipart/form-data",
      //   name: filename,
      // });

      setImageUrl(result.assets[0].uri);
    } else {
      return null;
    }
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
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

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
              <Image
                style={styles.image}
                source={require("../assets/profile.png")}
              />
            )}
            <View style={{ marginTop: 4 }}>
              <Pressable
                onPress={uploadImage}
                style={{
                  // backgroundColor: GlobalStyles.colors.green,
                  paddingHorizontal: 10,
                }}
              >
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
              {/* <Text style={styles.contentText}>
                {data.birth === "1950-01-01" ? "미입력" : data.birth}
              </Text> */}
              <Pressable
                style={{
                  flex: 1,
                  borderBottomColor: GlobalStyles.colors.gray06,
                  borderBottomWidth: 0.5,
                  marginLeft: 45,
                }}
                onPress={() => setShow(true)}
              >
                {/* <InputLine
                  onChangeText={handleMajorChange}
                  value={birth}
                  editable={false}
                /> */}
                {date !== null ? (
                  <Text
                    style={[
                      styles.contentText,
                      {
                        color: GlobalStyles.colors.gray01,
                        flex: 1,
                        marginLeft: 0,
                      },
                    ]}
                  >
                    {date
                      .toLocaleDateString("ko-KR", options)
                      .replace(/\./g, "-")
                      .replace(/\.|-$/, "")
                      .replace(/\s/g, "")}
                  </Text>
                ) : (
                  <Text />
                )}
              </Pressable>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>휴대전화번호</Text>
              <InputLine
                onChangeText={handlePhoneChange}
                value={phoneNum}
                keyboardType="numeric"
              />
              <Pressable
                onPress={requestNumber}
                // style={{ backgroundColor: GlobalStyles.colors.green }}
              >
                <View style={styles.authView}>
                  <Text style={styles.auth}>인증요청</Text>
                </View>
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
                <View style={styles.authView}>
                  <Text style={styles.auth}>인증확인</Text>
                </View>
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
              <InputLine
                onChangeText={handleStudentIdChange}
                value={studentId}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>재학 유무</Text>
              <View style={styles.statusContainer2}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.statusText2}>{status1}</Text>
                  <Pressable onPress={() => setVisible(!visible)}>
                    {/* <View style={{ paddingBottom: 3 }}> */}
                    <Down width={20} height={20} />
                    {/* </View> */}
                  </Pressable>
                </View>
              </View>
            </View>
            {/* <View style={styles.contentContainer}>
            <Text style={styles.title}>기수</Text>
            <InputLine
              onChangeText={handleGenerationChange}
              value={String(generation)}
              keyboardType="numeric"
            />
          </View> */}
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
                {headerAccount}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>비밀번호</Text>
              <Pressable onPress={navi}>
                <View style={styles.contentTextView}>
                  <Text
                    style={[
                      styles.contentText,
                      { marginLeft: 0, color: GlobalStyles.colors.gray01 },
                    ]}
                  >
                    비밀번호 수정
                  </Text>
                </View>
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
          {Platform.OS === "ios" ? (
            <Modal
              animationType="none"
              transparent={true}
              visible={show}
              statusBarTranslucent={true}
              onRequestClose={() => setShow(!show)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setShow(!show)}
              >
                <Pressable>
                  <View
                    style={{
                      backgroundColor: "white",
                      height: 379,
                      justifyContent: "space-between",

                      borderTopEndRadius: 5.41,
                      borderTopStartRadius: 5.41,
                    }}
                  >
                    <View
                      style={{
                        marginTop: 32,
                        marginLeft: 16,
                        flexDirection: "row",

                        alignItems: "center",
                      }}
                    >
                      <Left width={24} height={24} />
                      <Text style={KRBold.Headline4}>
                        태어난 년월을 선택하세요
                      </Text>
                    </View>

                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date !== null ? date : new Date()}
                      mode="date"
                      // is24Hour={true}
                      onChange={onChange}
                      display="spinner"
                      locale="ko"
                      positiveButton={{ label: "확인", textColor: "green" }}
                      textColor={GlobalStyles.colors.gray01}
                      negativeButton={{ label: "취소", textColor: "red" }}
                    />

                    <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
                      <ButtonBig
                        text="확인"
                        style={GlobalStyles.colors.primaryDefault}
                        onPress={okayBtn2}
                      />
                    </View>
                  </View>
                </Pressable>
              </Pressable>
            </Modal>
          ) : (
            show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date !== null ? date : new Date()}
                mode="date"
                // is24Hour={true}
                onChange={onChange}
                display="spinner"
                locale="ko"
                // positiveButton={{ label: "확인", textColor: "green" }}
                textColor={GlobalStyles.colors.gray01}
                // negativeButton={{ label: "취소", textColor: "red" }}
              />
            )
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
    // marginLeft: 10,
    // backgroundColor: GlobalStyles.colors.green,
    padding: 10,
  },
  completeText: {
    fontWeight: "400",
    fontSize: 15,
    // lineHeight: 20,
    color: GlobalStyles.colors.primaryDefault,
    // marginRight: 10,
    padding: 10,
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
