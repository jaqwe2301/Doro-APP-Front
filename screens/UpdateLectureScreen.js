// ---- 강의 생성과 수정 기능의 페이지 -----

import React, { useContext } from "react";
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Modal,
  FlatList,
  Alert,
  NativeModules,
} from "react-native";
import { useState, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import Xmark from "../assets/plusmark.svg";
import ModalX from "../assets/xmark_black.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import ModalCheck from "../assets/modalcheck.svg";
// import { format } from "date-fns";
// import ko from "date-fns/esm/locale/ko/index.js";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { URL } from "../utill/config";
import { GlobalStyles } from "./../constants/styles";

import ButtonBig from "../components/ui/ButtonBig";
import ButtonSmall from "../components/ui/ButtonSmall";
import AddContentModal from "../components/ui/AddContentModal";

import Interceptor from "../utill/Interceptor";
import { KRBold, KRRegular } from "../constants/fonts";
import SummaryBoxSmall from "../components/ui/SummaryBoxSmall";
import { G } from "react-native-svg";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";
import { HeaderContext } from "../store/header-context";

function UpdateLectureScreen({ route, navigation }) {
  const { isLectureUpdate, setIsLectureUpdate } = useContext(HeaderContext);
  const instance = Interceptor();

  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  const [lecturedata, setLectureData] = useState({
    institution: "",
    city: "",
    lectureDate: {
      enrollEndDate: "",
      enrollStartDate: new Date().toISOString().split("T")[0],
    },
    lectureContentId: null,
    lectureDates: [],
    mainTutor: "",
    mainPayment: "",
    subTutor: "",
    subPayment: "",
    staff: "",
    staffPayment: "",
    studentGrade: "",
    studentNumber: "",
    time: "",
    mainTitle: "",
    subTitle: "",
    place: "",
    transportCost: "",
    status: "RECRUITING",
    remark: "",
  });

  const [lectureContents, setLectureContents] = useState([]);
  const [selectedLectureContents, setSelectedLectureContents] = useState({
    kit: "",
    detail: "",
    requirement: "",
    content: "",
  });

  useEffect(() => {
    instance
      .get(`${URL}/lecture-contents`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectureContents(res.data.data);
      })
      .catch((error) => {
        if (error.isRefreshError) {
          // RefreshToken 관련 에러 시 로그아웃
          authCtx.logout();
        }
      });
    // 강의 수정
    if (route.params.data !== "") {
      let nonIdCheck = route.params?.data?.lectureDto;
      nonIdCheck["lectureContentId"] = route.params.data.lectureContentDto.id;
      setLectureData(nonIdCheck);
      setSelectedLectureContents(route.params.data.lectureContentDto);
      // [항목] - "일자" 동기화
      const dates = nonIdCheck.lectureDates;
      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        handleDateInputChange(dateFormat(date), i);
      }
      setRealDate(dates);
      setTmpTime(nonIdCheck.time.split(" ~ "));
      setOption("update");
      setMainTutor(nonIdCheck.mainTutor === "0" ? "" : nonIdCheck.mainTutor);
      setSubTutor(nonIdCheck.subTutor === "0" ? "" : nonIdCheck.subTutor);
      setStaff(nonIdCheck.staff === "0" ? "" : nonIdCheck.staff);

      setMainPayment(nonIdCheck.mainPayment);
      setSubPayment(nonIdCheck.subPayment);
      setStaffPayment(nonIdCheck.staffPayment);
    } else {
      setOption("create");
    }
  }, []);

  // 강의 생성, 수정 중 판단
  const [option, setOption] = useState("create");

  // 일자 - 달력 팝업
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // 일자
  const [inputList, setInputList] = useState([""]);

  /** state에 저장해둔 값을 객체에 옮김 */
  const inputStateHandler = () => {
    const inputs = [
      [realDate, "lectureDates"],
      [mainTutor, "mainTutor"],
      [!subTutor ? "0" : subTutor, "subTutor"],
      [!staff ? "0" : staff, "staff"],
      [String(mainPayment), "mainPayment"],
      [String(subPayment), "subPayment"],
      [!staffPayment ? "0" : String(staffPayment), "staffPayment"],
      [tmpTime[0] + " ~ " + tmpTime[1], "time"],
    ];

    inputs.forEach(([text, item]) => handleSingleInputChange(text, item));
  };

  /** 확인 버튼 누를 때 실행 */
  const updateLecture = () => {
    // inputStateHandler();

    for (const item in lecturedata) {
      if (lecturedata[item] === "0") {
        continue;
      } else if (!lecturedata[item]) {
        Alert.alert("경고", "빈 칸이 있는지 확인 해주세요.");
        return 0;
      }
    }

    if (option === "create") {
      instance
        .post(`${URL}/lectures/`, lecturedata, {
          headers: {
            // 헤더에 필요한 데이터를 여기에 추가
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsLectureUpdate(!isLectureUpdate);
          Alert.alert(
            "강의 업데이트",
            `"${lecturedata["subTitle"]}" 강의가 업데이트 되었습니다.`,
            [
              {
                text: "확인",
                onPress: () => {
                  route.params.navi
                    ? navigation.navigate("historyScreen")
                    : navigation.navigate("HomePage");
                },
              },
            ]
          );
        })
        .catch((error) => {
          if (error.isRefreshError) {
            // RefreshToken 관련 에러 시 로그아웃
            authCtx.logout();
          }
        });
    } else if (option === "update") {
      instance
        .patch(
          `${URL}/lectures/${route.params.data.lectureDto.id}`,
          lecturedata,
          {
            headers: {
              // 헤더에 필요한 데이터를 여기에 추가
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setIsLectureUpdate(!isLectureUpdate);
          Alert.alert(
            "강의 업데이트",
            `"${lecturedata["subTitle"]}" 강의가 업데이트 되었습니다.`,
            [
              {
                text: "확인",
                onPress: () => {
                  route.params.navi
                    ? navigation.navigate("historyScreen")
                    : navigation.navigate("HomePage");
                },
              },
            ]
          );
        })
        .catch((error) => {
          if (error.isRefreshError) {
            // RefreshToken 관련 에러 시 로그아웃
            authCtx.logout();
          }
        });
    }
  };

  const handleSingleInputChange = (text, item) => {
    const itemHandlers = {
      lectureDates: () => ({ ["lectureDates"]: [] }),
      studentNumber: () => ({ [item]: text.replace(/\D/g, "") }),
      transportCost: () => ({
        [item]: text.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      }),
      enrollEndDate: (prevState) => ({
        ...prevState,
        lectureDate: { ...prevState.lectureDate, enrollEndDate: text },
      }),
      default: () => ({ [item]: text }),
    };

    setLectureData((prevState) => ({
      ...prevState,
      ...(itemHandlers[item]
        ? itemHandlers[item](prevState)
        : itemHandlers.default()),
    }));
  };

  /** 일자 -> 2013.06.20 (화) 형식만 저장 */
  const handleDateInputChange = (text, index) => {
    setInputList((prev) => {
      let dates = prev;
      dates[index] = text;
      return dates;
    });
  };

  /** 일자 - 우측 "+" 버튼 누르면 input바 생성 */
  const handleAddInput = () => {
    const newList = [...inputList, ""];
    setInputList(newList);
  };

  const handleDeleteInput = (index) => {
    const newList = [...inputList];
    newList.splice(index, 1);
    setInputList(newList);
    setLectureData((prev) => {
      const newDates = [...prev.lectureDates];
      newDates.splice(inputIdx, 1);
      return {
        ...prev,
        lectureDates: newDates,
      };
    });
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강의 관련 정보" },
    { key: "second", title: "기본정보" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [addContentsModal, setAddContentsModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [tutorModal, setTutorModal] = useState(false);

  const modalHandler = (visible) => {
    setModalVisible(visible);
  };

  const addContentsModalHandler = (visible) => {
    setAddContentsModal(visible);
    if (visible === false) {
      setModalVisible(true);
    }
  };

  useEffect(() => {}, [modalVisible]);

  const selectingLectureContents = (id) => {
    const lectureContentsData = lectureContents.filter(
      (item) => item.id === id
    );
    const writingData = lecturedata;
    writingData["lectureContentId"] = id;
    setLectureData(writingData);
    setSelectedLectureContents(lectureContentsData[0]);
    modalHandler(false);
  };

  /** 날짜 포맷 형식 ex) "2023.06.21 (수)" */
  const dateFormat = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const dates = date.getDate() >= 9 ? date.getDate() : "0" + date.getDate();
    const day = days[date.getDay()];
    return `${date.getFullYear()}.${month}.${dates} (${day})`;
  };

  const [inputIdx, setInputIdex] = useState();
  // 일자, 시간 중 선택
  const [mode, setMode] = useState();

  const datePickerhandler = () => {
    setDatePickerVisible(true);
  };

  /** 일자 시간 input 클릭 시 실행 함수 */
  const onPressDateInput = (idx, mode) => {
    if (mode === "date") {
      setInputIdex(idx);
    }
    setMode(mode);
    datePickerhandler();
  };
  // 서버에 저장되는 데이터 데이터 (타입 : 배열 안에 date)
  const [realDate, setRealDate] = useState([]);
  // 시간
  const [tmpTime, setTmpTime] = useState([]);

  const [startTime, setStartTime] = useState(true);

  /** datePicker(날짜 선택기)에서
   * 날짜 선택 후 OK 클릭시 실행 함수 */
  const onConfirm = (pickedDate) => {
    // 신청 마감
    if (mode === "date" && inputIdx === -1) {
      handleSingleInputChange(
        pickedDate.toISOString().split("T")[0],
        "enrollEndDate"
      );
      // 일자
    } else if (mode === "date") {
      // 화면에 보이는 데이터
      handleDateInputChange(dateFormat(pickedDate), inputIdx);

      setLectureData((prev) => {
        let data = prev;
        data.lectureDates[inputIdx] = pickedDate.toISOString().split("T")[0];
        return data;
      });

      // date 타입 데이터 임시 저장
      // setRealDate((prev) => {
      //   let dates = [...prev];
      //   dates[inputIdx] = pickedDate;
      //   return dates;
      // });
      // 시간
    } else if (mode === "time") {
      setTmpTime((prev) => {
        let times = [...prev];
        const hours =
          pickedDate.getHours() <= 9
            ? "0" + pickedDate.getHours()
            : String(pickedDate.getHours());
        const minute =
          pickedDate.getMinutes() <= 9
            ? "0" + pickedDate.getMinutes()
            : String(pickedDate.getMinutes());
        if (startTime) {
          times[0] = `${hours}:${minute}`;
          return times;
        } else {
          times[1] = `${hours}:${minute}`;
          return times;
        }
      });
    }
    setDatePickerVisible(false);
  };

  const onConfirm2 = (item) => {
    if (!item) {
      Alert.alert(
        "주의",
        "항목을 체크해주세요!",
        [
          {
            text: "확인",
            selectingLectureContents: () => {},
            style: "destructive",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    } else {
      selectingLectureContents(item);
    }
  };

  useEffect(() => {
    if (tmpTime.length === 2) {
      const times = tmpTime[0] + " ~ " + tmpTime[1];
      setLectureData((prev) => ({
        ...prev,
        ["time"]: times,
      }));
    }
  }, [tmpTime]);

  const [mainTutor, setMainTutor] = useState();
  const [subTutor, setSubTutor] = useState();
  const [staff, setStaff] = useState();

  const tutorStateHandler = (value, role) => {
    role === "main"
      ? setMainTutor(value)
      : role === "sub"
      ? setSubTutor(value)
      : setStaff(value);
  };

  /** (10,000원, 2명 등) 입력값에서 단위 명사 제어 */
  const formatUnit = (input, unit, role = "") => {
    let value = input;
    if (
      (role === "main" && input + unit === mainTutor) ||
      (role === "sub" && input + unit === subTutor) ||
      (role === "staff" && input + unit === staff)
    ) {
      value = value.slice(0, -1);
    }
    if (value === "0") {
      value === "";
    }
    value = value.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Insert commas

    // If the input is not empty, append "명" to the end
    if (value !== "") {
      value += unit;
    }

    tutorStateHandler(value, role);
  };

  const mainTutorHandler = (input) => {
    formatUnit(input, "명", "main");
  };

  const subTutorHandler = (input) => {
    formatUnit(input, "명", "sub");
  };

  const staffHandler = (input) => {
    formatUnit(input, "명", "staff");
  };

  /** 모집 인원 모달 확인 버튼 클릭 시 */
  const tutorOnConfirm = () => {
    setLectureData((prev) => ({
      ...prev,
      ["mainTutor"]: mainTutor,
      ["subTutor"]: !subTutor ? "0" : subTutor,
      ["staff"]: !staff ? "0" : staff,
    }));
    setTutorModal(false);
  };

  const [mainPayment, setMainPayment] = useState();
  const [subPayment, setSubPayment] = useState();
  const [staffPayment, setStaffPayment] = useState();

  const paymentStateHandler = (value, role) => {
    role === "main"
      ? setMainPayment(value)
      : role === "sub"
      ? setSubPayment(value)
      : setStaffPayment(value);
  };

  const mainPaymentHandler = (input) => {
    formatMoney(input, "main");
  };

  const subPaymentHandler = (input) => {
    formatMoney(input, "sub");
  };

  const staffPaymentHandler = (input) => {
    formatMoney(input, "staff");
  };

  /** 10000 => 10,000으로 바꿔줌 + 문자열X */
  const formatMoney = (input, role) => {
    let value = input.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Insert commas
    paymentStateHandler(value, role);
  };

  const paymentOnConfirm = () => {
    setLectureData((prev) => ({
      ...prev,
      ["mainPayment"]: !mainPayment ? "0" : String(mainPayment),
      ["subPayment"]: !subPayment ? "0" : String(subPayment),
      ["staffPayment"]: !staffPayment ? "0" : String(staffPayment),
    }));
    setPaymentModal(false);
  };

  const contentsForm = {
    content: "교육 내용",
    kit: "교육 키트",
    detail: "기본 강의 구성",
    requirement: "자격 요건",
  };

  const [contentsData, setContentsData] = useState({
    content: "",
    kit: "",
    detail: "",
    requirement: "",
  });

  const creatingContents = (text, item) => {
    setContentsData((prev) => ({
      ...prev,
      [item]: text,
    }));
  };

  const onConfirmContents = async () => {
    for (let i = 0; i < Object.keys(contentsData).length; i++) {
      const key = Object.keys(contentsData)[i];
      if (!contentsData[key]) {
        Alert.alert("경고", "빈 칸이 있는지 확인 해주세요.");
        return 0;
      }
    }

    await instance
      .post(`${URL}/lecture-contents/`, contentsData, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((error) => {
        if (error.isRefreshError) {
          // RefreshToken 관련 에러 시 로그아웃
          authCtx.logout();
        }
      });

    Alert.alert(contentsData["content"], "교육 콘텐츠가 생성되었습니다.", [
      {
        text: "확인",
        onPress: () => {
          addContentsModalHandler(false);
          instance
            .get(`${URL}/lecture-contents`, {
              headers: {
                // 헤더에 필요한 데이터를 여기에 추가
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              setLectureContents(res.data.data);
            })
            .catch((error) => {
              if (error.isRefreshError) {
                // RefreshToken 관련 에러 시 로그아웃
                authCtx.logout();
              }
            });
        },
      },
    ]);

    // addContentsModalHandler(false);
  };

  const [check, setCheck] = useState();
  const [checkItem, setCheckItem] = useState();

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.lectureInfoListContainer}>
              <Text style={KRBold.Headline4}>강의 관련 정보</Text>
              <View style={[styles.lectureInfoContainer, { marginTop: 29 }]}>
                <Text
                  style={[
                    KRRegular.Subheadline,
                    { color: GlobalStyles.colors.gray03 },
                  ]}
                >
                  교육 내용
                </Text>
                <View style={[styles.inputBox, styles.dateBox]}>
                  <Text style={KRRegular.Subheadline}>
                    {selectedLectureContents.content}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={{
                      // backgroundColor: GlobalStyles.colors.green,
                      paddingLeft: 5,
                      paddingRight: 8,
                    }}
                  >
                    <Xmark width={17} height={17} />
                  </Pressable>
                </View>
              </View>
              <View style={styles.lectureInfoContainer}>
                <Text
                  style={[
                    KRRegular.Subheadline,
                    { color: GlobalStyles.colors.gray03 },
                  ]}
                >
                  키트
                </Text>
                <View style={[styles.inputBox, styles.dateBox]}>
                  <Text style={{ flex: 1 }}>{selectedLectureContents.kit}</Text>
                </View>
              </View>
              <View style={styles.lectureInfoContainer}>
                <Text
                  style={[
                    KRRegular.Subheadline,
                    { color: GlobalStyles.colors.gray03 },
                  ]}
                >
                  기본 강의 구성
                </Text>
                <View style={styles.inputBox}>
                  <Text style={KRRegular.Subheadline}>
                    {selectedLectureContents.detail}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.lectureInfoContainer}>
                <Text
                  style={[
                    KRRegular.Subheadline,
                    { color: GlobalStyles.colors.gray03 },
                  ]}
                >
                  기타 특이 사항
                </Text>
                <View style={styles.inputBox}>
                  <Text style={KRRegular.Subheadline}>
                    {selectedLectureContents.remark}
                  </Text>
                </View>
              </View> */}
              <View style={styles.lectureInfoContainer}>
                <Text
                  style={[
                    KRRegular.Subheadline,
                    { color: GlobalStyles.colors.gray03 },
                  ]}
                >
                  자격 요건
                </Text>
                <View style={styles.inputBox}>
                  <Text style={KRRegular.Subheadline}>
                    {selectedLectureContents.requirement}
                  </Text>
                </View>
              </View>

              {/* 교육 키트 플러스(+) 버튼 누르면 나오는 하단 모달 */}
              {/* <AddContentModal
              visible={modalVisible}
              inVisible={() => modalHandler(false)}
              plusVisible={true}
              onPressPlus={() => {
                setAddContentsModal(true);
                setContentsData({
                  content: "",
                  kit: "",
                  detail: "",
                  remark: "",
                  requirement: "",
                });
              }}
              onPress={selectingLectureContents}
              data={lectureContents}
              title="교육 목록"
            /> */}
              <Modal transparent={true} visible={modalVisible}>
                {/* <SafeAreaView style={{ flex: 1 }}> */}
                <View style={styles.modalContainer}>
                  <View style={styles.modalWhiteBox}>
                    <View style={styles.modalTop}>
                      <Pressable
                        onPress={() => modalHandler(false)}
                        style={{
                          padding: 10,
                          paddingLeft: 0,
                          // backgroundColor: GlobalStyles.colors.red,
                        }}
                      >
                        <ModalX width={24} height={24} />
                      </Pressable>
                      <Text style={KRBold.Body}>교육 목록</Text>
                      <Pressable
                        onPress={() => {
                          addContentsModalHandler(true);
                          setContentsData({
                            content: "",
                            kit: "",
                            detail: "",

                            requirement: "",
                          });
                        }}
                        style={{
                          // backgroundColor: GlobalStyles.colors.green,
                          padding: 10,
                          paddingRight: 0,
                        }}
                      >
                        <Plus width={20} height={20} />
                      </Pressable>
                    </View>
                    <FlatList
                      style={styles.modalList}
                      data={lectureContents}
                      renderItem={(data) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setCheck(data.index);
                              setCheckItem(data.item.id);
                            }}
                          >
                            <View style={styles.modalTextContainer}>
                              <Text style={styles.modalText}>
                                {data.item.kit}
                              </Text>
                              {check === data.index ? <ModalCheck /> : ""}
                            </View>
                          </Pressable>
                        );
                      }}
                      extraData={lectureContents}
                    />
                    <View style={styles.modalButtonContainer}>
                      <ButtonBig
                        text="확인"
                        onPress={() => onConfirm2(checkItem)}
                      />
                    </View>
                  </View>
                </View>

                <Modal transparent={true} visible={addContentsModal}>
                  <View style={styles.paymentModal}>
                    <View
                      style={{
                        backgroundColor: "white",
                        width: layout.width - 20,
                        height: 280,
                        padding: 16,
                        borderRadius: 5.41,
                      }}
                    >
                      {Object.keys(contentsForm).map((item) => {
                        return (
                          <View key={item} style={styles.lectureInfoContainer}>
                            <Text>{contentsForm[item]}</Text>
                            <TextInput
                              style={styles.inputBox}
                              onChangeText={(text) =>
                                creatingContents(text, item)
                              }
                              multiline
                            />
                          </View>
                        );
                      })}
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 25,
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <ButtonSmall title="확인" onPress={onConfirmContents} /> */}
                        <Pressable
                          onPress={onConfirmContents}
                          style={{
                            flex: 1,
                            height: 30,
                            marginRight: 5,
                            backgroundColor: GlobalStyles.colors.primaryDefault,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5.41,
                          }}
                        >
                          <Text
                            style={[KRRegular.Subheadline, { color: "white" }]}
                          >
                            확인
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            addContentsModalHandler(false);
                          }}
                          style={{
                            flex: 1,
                            marginLeft: 5,
                            backgroundColor: GlobalStyles.colors.primaryDefault,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5.41,
                          }}
                        >
                          <Text
                            style={[KRRegular.Subheadline, { color: "white" }]}
                          >
                            취소
                          </Text>
                        </Pressable>
                        {/* <ButtonSmall
                          title="취소"
                          onPress={() => {
                            addContentsModalHandler(false);
                          }}
                        /> */}
                      </View>
                    </View>
                  </View>
                </Modal>
                {/* </SafeAreaView> */}
              </Modal>
              {/* 교육 목록 추가 */}
            </View>
          </ScrollView>
        );
      case "second":
        return (
          <ScrollView style={styles.lectureInfoListContainer}>
            <Text style={KRBold.Headline4}>기본정보</Text>
            <View style={[styles.lectureInfoContainer, { marginTop: 29 }]}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                주최 및 주관
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.institution}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "institution");
                }}
                multiline
              />
            </View>
            <View style={[styles.lectureInfoContainer, { marginBottom: 5 }]}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                일자
              </Text>
              <View>
                {inputList.map((item, index) => (
                  // <View
                  //   style={[
                  //     styles.inputBox,
                  //     styles.dateBox,
                  //     index > 0 ? { marginTop: 8 } : "",
                  //     { backgroundColor: GlobalStyles.colors.red },
                  //   ]}
                  // >
                  <Pressable
                    key={index}
                    onPress={() => onPressDateInput(index, "date")}
                    style={styles.dataInputBox}
                  >
                    {/* <TextInput
                      value={item}
                      style={[styles.inputBox, { flex: 1, color: "black" }]}
                      onChangeText={(text) =>
                        handleDateInputChange(text, index)
                      }
                      editable={false}
                    /> */}
                    <Text style={KRRegular.Subheadline}>
                      {inputList[index]}
                    </Text>
                    {index === 0 ? (
                      <Pressable
                        onPress={handleAddInput}
                        style={{
                          // backgroundColor: GlobalStyles.colors.red,
                          padding: 5,
                          paddingRight: 8,
                          // marginRight: 3,
                        }}
                      >
                        <Xmark width={17} height={17} />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => handleDeleteInput(index)}
                        style={{
                          // backgroundColor: GlobalStyles.colors.red,
                          padding: 5,
                          paddingRight: 11,
                          // marginRight: 3,
                        }}
                      >
                        <Minus width={12.5} height={12.5} />
                      </Pressable>
                    )}
                  </Pressable>
                  // </View>
                ))}
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                시간
              </Text>
              <View style={styles.timeContainer}>
                <Pressable
                  onPress={() => {
                    onPressDateInput(0, "time");
                    setStartTime(true);
                  }}
                  style={styles.timeInputBox}
                >
                  {/* <TextInput
                    style={styles.timeInputBox}
                    // value={lecturedata.time}
                    // onChangeText={(text) => {
                    //   handleSingleInputChange(text, "time");
                    // }}
                    value={String(tmpTime[0])}
                    onChangeText={(time) => {
                      setStartTime(time);
                    }}
                    editable={false}
                  /> */}
                  <Text style={KRRegular.Subheadline}>{tmpTime[0]}</Text>
                </Pressable>
                <Text>~</Text>
                <Pressable
                  onPress={() => {
                    onPressDateInput(1, "time");
                    setStartTime(false);
                  }}
                  style={styles.timeInputBox}
                >
                  {/* <TextInput
                    style={styles.timeInputBox}
                    // onChangeText={(text) => {
                    //   handleSingleInputChange(text, "time");
                    // }}
                    value={tmpTime[1]}
                    editable={false}
                  /> */}
                  <Text style={KRRegular.Subheadline}>{tmpTime[1]}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                지역
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.city}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "city");
                }}
                multiline
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                장소
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.place}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "place");
                }}
                multiline
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                강의 대상
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.studentGrade}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "studentGrade");
                }}
                multiline
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                인원수
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.studentNumber}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "studentNumber");
                }}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                모집 인원
              </Text>
              <View>
                <Pressable
                  onPress={() => setTutorModal(true)}
                  style={styles.multiLineInputBox}
                >
                  {/* <TextInput
                      style={styles.multiLineInputBox}
                      value={`주강사 : ${mainTutor}\n보조강사 : ${subTutor}\n스태프 : ${staff}`}
                      multiline={true}
                      editable={false}
                    /> */}
                  {/* <View style={styles.multiLineInputBox}> */}
                  <Text style={KRRegular.Subheadline}>
                    주강사 : {mainTutor}
                  </Text>
                  <Text style={KRRegular.Subheadline}>
                    보조강사 : {subTutor}
                  </Text>
                  <Text style={KRRegular.Subheadline}>스태프 : {staff}</Text>
                  {/* </View> */}
                </Pressable>
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                신청 마감
              </Text>
              <Pressable
                key={index}
                onPress={() => onPressDateInput(-1, "date")}
                style={styles.dataInputBox}
              >
                {/* <TextInput
                    style={[styles.inputBox]}
                    editable={false}
                    value={dateFormat(
                      new Date(lecturedata.lectureDate.enrollEndDate)
                    )}
                  /> */}
                <View>
                  <Text style={KRRegular.Subheadline}>
                    {lecturedata.lectureDate.enrollEndDate
                      ? dateFormat(
                          new Date(lecturedata.lectureDate.enrollEndDate)
                        )
                      : ""}
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                강사 급여
              </Text>
              <Pressable
                onPress={() => setPaymentModal(true)}
                style={styles.multiLineInputBox}
              >
                {/* <View> */}
                {/* <TextInput
                      style={[styles.multiLineInputBox]}
                      value={`주강사 : ${mainPayment}원\n보조강사 : ${subPayment}원\n스태프 : ${staffPayment}원`}
                      multiline={true}
                      editable={false}
                    /> */}
                <Text style={KRRegular.Subheadline}>
                  주강사 : {mainPayment}
                </Text>
                <Text style={KRRegular.Subheadline}>
                  보조강사 : {subPayment}
                </Text>
                <Text style={KRRegular.Subheadline}>
                  스태프 : {staffPayment}
                </Text>
                {/* </View> */}
              </Pressable>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                교통비
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.transportCost}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "transportCost");
                }}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text
                style={[
                  KRRegular.Subheadline,
                  { color: GlobalStyles.colors.gray03 },
                ]}
              >
                기타 특이 사항
              </Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.remark}
                onChangeText={(text) => {
                  handleSingleInputChange(text, "remark");
                }}
                multiline
              />
            </View>

            <View style={{ marginBottom: 60, marginTop: 69 }}>
              <ButtonBig
                text="확인"
                // onPress={option === "create" ? creatingLecture : updateLecture}
                onPress={updateLecture}
              />
            </View>

            {/* 일자, 시간 - 달력, 시간 선택 팝업 */}
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode={mode}
              onConfirm={onConfirm}
              onCancel={() => setDatePickerVisible(false)}
              date={new Date()}
              locale="ko"
              textColor={GlobalStyles.colors.gray01}
              confirmTextIOS="확인"
              cancelTextIOS="취소"
              customCancelButtonIOS={() => {
                <View></View>;
              }}
            />
            {/* 모집 인원 input 클릭 시 나오는 모달 */}
            <Modal transparent={true} visible={tutorModal}>
              <View style={styles.paymentModal}>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 5.41,
                  }}
                >
                  <Text style>모집 대상이 아니라면 칸을 비워주세요.</Text>
                  <Text>(숫자만 입력 가능)</Text>
                  <Text></Text>
                  <Text style={{ marginLeft: 3 }}>주강사</Text>
                  <View>
                    <TextInput
                      style={styles.paymentInput}
                      keyboardType="number-pad"
                      onChangeText={mainTutorHandler}
                      value={mainTutor}
                    />
                  </View>
                  <Text style={{ marginTop: 5, marginLeft: 3 }}>보조강사</Text>
                  <View>
                    <TextInput
                      style={styles.paymentInput}
                      keyboardType="number-pad"
                      onChangeText={subTutorHandler}
                      value={subTutor}
                    />
                  </View>
                  <Text style={{ marginTop: 5, marginLeft: 3 }}>스태프</Text>
                  <View>
                    <TextInput
                      style={styles.paymentInput}
                      keyboardType="number-pad"
                      onChangeText={staffHandler}
                      value={staff}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <ButtonSmall title="확인" onPress={tutorOnConfirm} />
                  </View>
                </View>
              </View>
            </Modal>
            {/* 강사 급여 input 클릭 시 나오는 모달 */}
            <Modal transparent={true} visible={paymentModal}>
              <View style={styles.paymentModal}>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 5.41,
                  }}
                >
                  <Text>급여가 없다면 칸을 비워주세요.</Text>
                  <Text>(숫자만 입력 가능)</Text>
                  <Text></Text>

                  <Text style={{ marginLeft: 3 }}>주강사</Text>
                  <View>
                    <TextInput
                      style={styles.paymentInput}
                      keyboardType="number-pad"
                      onChangeText={mainPaymentHandler}
                      value={mainPayment}
                    />
                  </View>
                  <Text style={{ marginTop: 5, marginLeft: 3 }}>보조강사</Text>
                  <View>
                    <TextInput
                      style={styles.paymentInput}
                      keyboardType="number-pad"
                      onChangeText={subPaymentHandler}
                      value={subPayment}
                    />
                  </View>
                  <Text style={{ marginTop: 5, marginLeft: 3 }}>스태프</Text>
                  <View>
                    <TextInput
                      style={styles.paymentInput}
                      keyboardType="number-pad"
                      onChangeText={staffPaymentHandler}
                      value={staffPayment}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <ButtonSmall title="확인" onPress={paymentOnConfirm} />
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        );

      default:
        return <View />;
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 44 + statusBarHeight : 0
        }
      >
        <View style={styles.containerTop}>
          <Text
            style={[
              KRBold.Subbody,
              { color: GlobalStyles.colors.gray05, marginBottom: 5 },
            ]}
          >
            메인타이틀
          </Text>
          <TextInput
            style={[styles.titleInput]}
            onChangeText={(text) => {
              handleSingleInputChange(text, "mainTitle");
            }}
            textAlignVertical="center"
            value={lecturedata.mainTitle ? lecturedata.mainTitle : ""}
            multiline
          />
          <Text
            style={[
              KRBold.Subbody,
              {
                color: GlobalStyles.colors.gray05,
                marginTop: 10,
                marginBottom: 5,
              },
            ]}
          >
            서브타이틀
          </Text>
          <TextInput
            style={styles.titleInput2}
            multiline
            // maxLength={44}
            onChangeText={(text) => {
              handleSingleInputChange(text, "subTitle");
            }}
            textAlignVertical="center"
            value={lecturedata.subTitle ? lecturedata.subTitle : ""}
          />
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              // 밑에 막대기(line) 스타일링
              indicatorStyle={{
                backgroundColor: GlobalStyles.colors.primaryDefault,
                height: 2,
                border: "none",
              }}
              style={{
                backgroundColor: "white",
                shadowOffset: { height: 0, width: 0 },
                shadowColor: "transparent",
                height: 31,
                borderBottomWidth: 0.5,
                borderBottomColor: GlobalStyles.colors.gray04,
              }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={
                    focused
                      ? [
                          KRRegular.Subheadline,
                          { color: GlobalStyles.colors.gray01 },
                        ]
                      : [
                          KRRegular.Subheadline,
                          { color: GlobalStyles.colors.gray05 },
                        ]
                  }
                >
                  {route.title}
                </Text>
              )}
              tabStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
              }}
              pressColor={"transparent"}
            />
          )}
        />
      </KeyboardAvoidingView>
    </>
  );
}

export default UpdateLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  containerTop: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  titleInput2: {
    width: "100%",
    // height: 45,
    paddingVertical: 7,
    textAlignVertical: "center",
    fontSize: 15,
    fontWeight: "600",
    // lineHeight: 20,
    letterSpacing: 0.3,
    paddingLeft: 19,

    borderRadius: 5.41,
    backgroundColor: GlobalStyles.colors.gray07,
    marginBottom: 39,
  },
  titleInput: {
    width: "100%",
    // height: 30,
    paddingVertical: 7,
    fontSize: 15,
    fontWeight: "600",
    // lineHeight: 20,
    letterSpacing: 0.3,
    paddingLeft: 19,

    borderRadius: 5.41,
    backgroundColor: GlobalStyles.colors.gray07,
  },
  boxContainer: {
    flexDirection: "row",
    gap: 7,
    marginTop: 7,
    // marginBottom: 6.99,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 78,
    backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  lectureInfoListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "white",
  },
  lectureInfoContainer: {
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
    width: 221,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    width: 221,
    // height: 28,
    minHeight: 28,
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 9,
    color: GlobalStyles.colors.gray01,
    paddingTop: 4,
    paddingBottom: 4,
    textAlignVertical: "center",
    backgroundColor: GlobalStyles.colors.gray07,
    justifyContent: "center",
    borderRadius: 5.41,
  },
  dataInputBox: {
    width: 221,
    height: 28,
    backgroundColor: GlobalStyles.colors.gray07,
    borderRadius: 5.41,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingLeft: 9,
  },
  multiLineInputBox: {
    width: 221,
    height: 70,
    backgroundColor: GlobalStyles.colors.gray07,
    textAlignVertical: "top",
    paddingLeft: 9,
    justifyContent: "center",
    borderRadius: 5.41,
  },
  timeInputBox: {
    width: 100,
    backgroundColor: GlobalStyles.colors.gray07,
    textAlignVertical: "top",
    height: 28,
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 9,
    color: GlobalStyles.colors.gray01,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5.41,
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalWhiteBox: {
    flex: 1,
    backgroundColor: "white",
  },
  modalTop: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray05,
  },
  modalList: {
    marginBottom: 35,
    maxHeight: 252,
  },
  modalTextContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray05,
  },
  modalText: {},
  modalButtonContainer: {
    // height: 45,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 0,
  },
  modalButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 5.41,
  },
  paymentModal: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.6)",
  },
  paymentInput: {
    backgroundColor: GlobalStyles.colors.gray07,
    height: 30,
    width: "100%",
    marginTop: 3,
    borderRadius: 5.41,
    paddingLeft: 9,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalWhiteBox: {
    backgroundColor: "white",
    paddingBottom: 14,
  },
  modalTop: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray05,
    height: 54,
    alignItems: "center",
  },

  modalTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 42,
    borderBottomWidth: 0.5,
    borderBottomColor: GlobalStyles.colors.gray05,
  },
  modalText: {
    fontSize: 16,
  },

  modalButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 5.41,
  },
  topButton: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
