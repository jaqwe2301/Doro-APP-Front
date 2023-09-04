import { useState, useEffect, useContext } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from "react-native-collapsible-tab-view";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import SwitchToggle from "react-native-switch-toggle";
import axios from "axios";

import { getProfile } from "../utill/http";
import { GlobalStyles } from "../constants/styles";

import { URL } from "../utill/config";
import { HeaderContext } from "../store/header-context";
import ApplyingTutorBox from "../components/ui/ApplyingTutorBox";
import ButtonOneThird from "../components/ui/ButtonOneThird";
import FilterBox from "../components/ui/FilterBox";
import LectureTop from "../components/ui/LectureTop";
import AddLecture from "../assets/creatingLecture.svg";
import Delete from "../assets/delete.svg";

import Interceptor from "../utill/Interceptor";
import { errorHandler } from "../utill/etc";
import { KRRegular } from "../constants/fonts";

function DetailLectureScreen({ route, navigation }) {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);

  const { isLectureUpdate, setIsLectureUpdate } = useContext(HeaderContext);
  const instance = Interceptor();
  /** 강의 수정 후 리렌더링을 위해 사용 */
  const isFocused = useIsFocused();

  const [lectureBasicInfo, setLectureBasicInfo] = useState({
    city: "",
    enrollEndDate: "",
    enrollStartDate: "",
    institution: "",
    lectureDates: [],
    mainPayment: "",
    mainTitle: "",
    mainTutor: "",
    place: "",
    staff: "",
    staffPayment: "",
    studentGrade: ",",
    studentNumber: "",
    subPayment: "",
    subTitle: "",
    subTutor: "",
    time: "",
    transportCost: "",
    status: "",
  });
  const [lectureContent, setLectureContent] = useState({
    detail: "",
    kit: "",
    remark: "",
    requirement: "",
    content: "",
  });

  const [tutor, setTutor] = useState([]);
  const [assign, setAssign] = useState([]); // 강사 배정되었는지 체크
  const [assignList, setAssignList] = useState([]); // 강의 배정 정보
  const [apply, setApply] = useState([false, false, false]); // 강사가 강의를 신청했는지 체크
  const [after, setAfter] = useState(false); // 강사 신청 후 리렌더링 위해 사용

  const data = route.params;

  useEffect(() => {
    // 기본 정보
    instance
      .get(`/lectures/${data.id}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectureBasicInfo(() => {
          let lecture = {
            ...res.data?.data.lectureDto,
            id: data.id,
            lectureContentId: res.data.data.lectureContentDto.id,
          };
          return lecture;
        });
        setLectureContent(res.data.data.lectureContentDto);

        const assignedTutors = res.data.data.assignedTutors;

        /** 강사 배정되었는지 체크 */
        if (assignedTutors) {
          setAssign(() => {
            return assignedTutors.some((data) => {
              const check =
                data.userId === headerId && data.tutorStatus === "ASSIGNED";
              if (check) {
                setAssignList(() => {
                  const mainTutor = assignedTutors
                    .filter(
                      (item) =>
                        item.tutorRole === "MAIN_TUTOR" &&
                        item.tutorStatus === "ASSIGNED"
                    )
                    .map((item) => {
                      return item.name;
                    })
                    .join(", ");

                  const subTutor = assignedTutors
                    .filter(
                      (item) =>
                        item.tutorRole === "SUB_TUTOR" &&
                        item.tutorStatus === "ASSIGNED"
                    )
                    .map((item) => {
                      return item.name;
                    })
                    .join(", ");

                  const staff = assignedTutors
                    .filter(
                      (item) =>
                        item.tutorRole === "STAFF" &&
                        item.tutorStatus === "ASSIGNED"
                    )
                    .map((item) => {
                      return item.name;
                    })
                    .join(", ");

                  return [mainTutor, subTutor, staff];
                });
              }
              return check;
            });
          });
        }

        /** 로그인한 강사가 강의를 신청했는지 체크 */
        if (assignedTutors) {
          setApply(() => {
            return [
              assignedTutors.some((item) => {
                return (
                  item.userId === headerId && item.tutorRole === "MAIN_TUTOR"
                );
              }),
              assignedTutors.some((item) => {
                return (
                  item.userId === headerId && item.tutorRole === "SUB_TUTOR"
                );
              }),
              assignedTutors.some((item) => {
                return item.userId === headerId && item.tutorRole === "STAFF";
              }),
            ];
          });
        }
      })
      .catch((error) => {
        console.log("강의 세부 못 불러옴");
        console.log(error);
      });

    if (headerRole === "ROLE_ADMIN") {
      // 신청 강사 불러오기
      instance
        .get(`${URL}/users-lectures/lectures/${data.id}`, {
          headers: {
            // 헤더에 필요한 데이터를 여기에 추가
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("신청 강사 불러옴");
          // console.log(res.data.data);
          setTutor(res.data.data);
        })
        .catch((error) => {
          console.log("에러");
          console.log("신청 강사 못 불러옴");
          console.log(error);
        });
    }

    setStatus(data.status === "RECRUITING" ? true : false);
  }, [isFocused, after]);

  /** 강의 신청 */
  const applyingTutor = (roles) => {
    let role = "";
    let applyStatus = false;
    if (roles === "MAIN_TUTOR") {
      role = "주 강사";
      applyStatus = apply[0];
    } else if (roles === "SUB_TUTOR") {
      role = "보조 강사";
      applyStatus = apply[1];
    } else {
      role = "스태프";
      applyStatus = apply[2];
    }
    if (applyStatus) {
      Alert.alert(
        `이미 ${role}를 신청하셨습니다.`,
        `취소는 신청내역에서 해주세요.`,
        [
          {
            text: "확인",
            onPress: () => {},
            style: "destructive",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    } else {
      Alert.alert(
        lectureBasicInfo.subTitle,
        `'${role}' 신청하시겠습니까?`,
        [
          { text: "취소", onPress: () => {}, style: "cancel" },
          {
            text: "확인",
            onPress: () => {
              instance
                .post(
                  `${URL}/users-lectures/lectures/${data.id}`,
                  {
                    tutorRole: roles,
                    userId: headerId,
                  },
                  {
                    headers: {
                      // 헤더에 필요한 데이터를 여기에 추가
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  // console.log(res);
                  // console.log("성공");
                  // console.log("강사 신청 완료");

                  Alert.alert(
                    lectureBasicInfo.subTitle,
                    `${role} 신청이 완료되었습니다.`,
                    [
                      {
                        text: "확인",
                        onPress: () => {
                          // console.log("강사 신청 완료");
                          setAfter((prev) => !prev);
                        },
                        style: "destructive",
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () => {},
                    }
                  );
                })
                .catch((error) => {
                  // console.log("강사 신청 실패");
                  Alert.alert(
                    lectureBasicInfo.subTitle,
                    `강의 신청에 실패하였습니다. 다시 시도해주세요.`,
                    [
                      {
                        text: "확인",
                        onPress: () => {
                          // console.log("강사 신청 완료");
                        },
                        style: "destructive",
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () => {},
                    }
                  );
                  if (error.response) {
                    // 서버가 응답을 반환한 경우
                    console.log("Error response:", error.response.data);
                  } else if (err.request) {
                    // 요청이 만들어졌지만, 응답을 받지 못한 경우
                    console.log("Error request:", error.request);
                  } else {
                    // 그 외의 에러
                    console.log("Error", error.message);
                  }
                });
            },
            style: "destructive",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    }
  };

  const day = ["일", "월", "화", "수", "목", "금", "토"];

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(
    headerRole === "ROLE_ADMIN"
      ? [
          { key: "first", title: "기본정보" },
          { key: "second", title: "강의 관련 정보" },
          { key: "third", title: "신청 강사" },
        ]
      : [
          { key: "first", title: "기본정보" },
          { key: "second", title: "강의 관련 정보" },
        ]
  );

  const onLayout = (e) => {
    const { layout } = e.nativeEvent; // layout 추출
    // console.log("onLayout", layout); // layout 출력
  };

  /** 강사 배정 */
  const assignment = (roles, role, id, name, status) => {
    Alert.alert(
      lectureBasicInfo.subTitle,
      `${role} '${name}' ${
        status === "ASSIGNED" ? "배정취소하겠습니까 ?" : "확정하겠습니까 ?"
      }`,
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "확인",
          onPress: () => {
            console.log("강사 배정 혹은 취소 완료");
            instance
              .patch(
                `${URL}/users-lectures/lectures/${data.id}`,
                {
                  tutorRole: roles,
                  userId: id,
                },
                {
                  headers: {
                    // 헤더에 필요한 데이터를 여기에 추가
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                // console.log(res);

                Alert.alert(
                  lectureBasicInfo.subTitle,
                  `${role} '${name}' ${
                    status === "ASSIGNED" ? "배정취소가 " : "확정이 "
                  } 완료되었습니다.`,
                  [
                    {
                      text: "확인",
                      onPress: () => {
                        // console.log("강사 신청 완료");
                        setAfter((prev) => !prev);
                      },
                      style: "destructive",
                    },
                  ],
                  {
                    cancelable: true,
                    onDismiss: () => {},
                  }
                );
              })
              .catch((error) => {
                console.log("에러");
                console.log(error);
              });
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const [toggle, setToggle] = useState(true);
  const [status, setStatus] = useState();

  const deleteLecture = () => {
    console.log(data.id);
    Alert.alert(
      lectureBasicInfo.subTitle,
      "강의를 삭제하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            instance
              .delete(`${URL}/lectures/${data.id}`, {
                headers: {
                  // 헤더에 필요한 데이터를 여기에 추가
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                Alert.alert(
                  lectureBasicInfo.subTitle,
                  "강의가 삭제되었습니다.",
                  [
                    {
                      text: "확인",
                      onPress: () => {
                        // console.log("강사 신청 완료");
                        data.navi
                          ? navigation.navigate("historyScreen")
                          : navigation.navigate("HomePage");
                        setIsLectureUpdate(!isLectureUpdate);
                      },
                      style: "default",
                    },
                  ]
                );
              })
              .catch((error) => {
                // console.log("강사 신청 실패");
                Alert.alert(
                  lectureBasicInfo.subTitle,
                  "강의 삭제에 실패하였습니다. 다시 시도해주세요.",
                  [
                    {
                      text: "확인",
                      onPress: () => {},
                      style: "default",
                    },
                  ]
                );
                console.log(error);
              });
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ marginTop: 40, flex: 1 }} onLayout={onLayout}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                기본정보
              </Text>
              <View style={styles.infoContainer}>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>주최 및 주관</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.institution}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>일자</Text>
                  <View>
                    {lectureBasicInfo.lectureDates.map((item, i) => {
                      const date = new Date(item);
                      const month =
                        date.getMonth() >= 9
                          ? date.getMonth() + 1
                          : "0" + (date.getMonth() + 1);
                      const days =
                        date.getDate() > 9
                          ? date.getDate()
                          : "0" + date.getDate();

                      return (
                        <Text key={i} style={[styles.infoText]}>
                          {date.getFullYear()}.{month}.{days} (
                          {day[date.getDay()]})
                        </Text>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>시간</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.time}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>지역</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.city}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>장소</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.place}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>강의 대상</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.studentGrade}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>인원수</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.studentNumber}명
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>모집 인원</Text>
                  {/* <Text style={styles.infoText}>
                    주강사 {lectureBasicInfo.mainTutor}
                    {lectureBasicInfo.subTutor === "0"
                      ? ""
                      : ", 보조강사 " + lectureBasicInfo.subTutor}
                    {lectureBasicInfo.staff === "0"
                      ? ""
                      : ", 스태프 " + lectureBasicInfo.staff}
                  </Text> */}
                  <View>
                    <Text style={styles.infoText}>
                      주 강사 : {lectureBasicInfo.mainTutor}
                    </Text>
                    {lectureBasicInfo.subTutor === "0" ? (
                      ""
                    ) : (
                      <Text style={[styles.infoText, { marginTop: 2 }]}>
                        보조 강사 : {lectureBasicInfo.subTutor}
                      </Text>
                    )}
                    {lectureBasicInfo.staff === "0" ? (
                      ""
                    ) : (
                      <Text style={[styles.infoText, { marginTop: 2 }]}>
                        스태프 : {lectureBasicInfo.staff}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>강사 급여</Text>
                  <View>
                    <Text style={styles.infoText}>
                      주 강사 : {lectureBasicInfo.mainPayment}원
                    </Text>
                    {lectureBasicInfo.subPayment === "0" ? (
                      ""
                    ) : (
                      <Text style={[styles.infoText, { marginTop: 2 }]}>
                        보조 강사 : {lectureBasicInfo.subPayment}원
                      </Text>
                    )}
                    {lectureBasicInfo.staffPayment === "0" ? (
                      ""
                    ) : (
                      <Text style={[styles.infoText, { marginTop: 2 }]}>
                        스태프 : {lectureBasicInfo.staffPayment}원
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>기타 특이사항</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureBasicInfo.remark}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 0.5,
                width: layout.width,
                backgroundColor: GlobalStyles.colors.gray04,
                marginBottom: 9,
              }}
            />
          </View>
        );
      case "second":
        return (
          <View style={{ marginTop: 40, flex: 1, paddingHorizontal: 20 }}>
            <View style={{ marginBottom: 0 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                강의 관련 정보
              </Text>
              <View style={styles.infoContainer}>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>교육 내용</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureContent.content}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>키트</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureContent.kit}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>기본 강의 구성</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureContent.detail}
                  </Text>
                </View>
                {/* <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>기타 특이사항</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureContent.remark}
                  </Text>
                </View> */}
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>자격 요건</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureContent.requirement}
                  </Text>
                </View>
              </View>
            </View>
            {assign ? (
              <View>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: GlobalStyles.colors.gray04,
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    marginTop: 44,
                    marginBottom: 34,
                  }}
                >
                  강의 배정 정보
                </Text>
                <View style={{ gap: 18 }}>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>주 강사</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {assignList[0]}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>보조 강사</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {assignList[1]}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>스태프</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {assignList[2]}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              ""
            )}
          </View>
        );

      case "third":
        /** 토글 관련 함수 */
        const statusHandler = () => {
          let lecture = lectureBasicInfo;
          if (!lecture) {
            console.error("lecture is undefined");
            // return prev;
          }

          delete lecture.id;
          if (status) {
            lecture.status = "ALLOCATION_COMP";
          } else {
            lecture.status = "RECRUITING";
          }

          instance
            .patch(`${URL}/lectures/${data.id}`, lecture, {
              headers: {
                // 헤더에 필요한 데이터를 여기에 추가
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              setIsLectureUpdate(!isLectureUpdate);
              console.log(
                status
                  ? "ALLOCATION_COMP" + "변경완료"
                  : "RECRUITING" + "변경완료"
              );
              setStatus((prev) => !prev);
            })
            .catch((error) => {
              console.log("에러");
              console.log(error);
            });
        };

        return (
          <View style={{ marginTop: 40, flex: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                신청 강사
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={[
                    styles.flexDirectionRow,
                    { gap: 8, marginBottom: 28 },
                  ]}
                >
                  <Pressable>
                    <FilterBox text="강사 타입" color="black" />
                  </Pressable>
                  <Pressable onPress={() => console.log(status)}>
                    <FilterBox text="정렬 순서" color="black" />
                  </Pressable>
                </View>
                {/* SwitchToggle 참고 링크 */}
                {/* https://github.com/yujong-lee/react-native-switch-toggle */}

                <SwitchToggle
                  switchOn={status}
                  onPress={() => {
                    data.status === "FINISH"
                      ? Alert.alert(
                          "해당 강의는 끝난 강의입니다.",
                          "상태를 변경할 수 없습니다.",
                          [
                            {
                              text: "확인",
                              onPress: () => {
                                // console.log("강사 신청 완료");
                              },
                              style: "default",
                            },
                          ]
                        )
                      : statusHandler();
                  }}
                  containerStyle={{
                    width: 80,
                    height: 36,
                    borderRadius: 100,
                    padding: 4,
                  }}
                  circleStyle={{
                    width: 22,
                    height: 22,
                    borderRadius: 23,
                  }}
                  backgroundColorOn={GlobalStyles.colors.primaryDefault}
                  backgroundColorOff={GlobalStyles.colors.gray05}
                  buttonStyle={
                    !status
                      ? {
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                          marginLeft: 8,
                        }
                      : {
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                        }
                  }
                  rightContainerStyle={{
                    flex: 1,
                    position: "absolute",
                    marginLeft: 10,
                    paddingBottom: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  leftContainerStyle={{
                    flex: 1,
                    alignItems: "flex-end",
                    marginRight: 8,
                    marginBottom: 2,
                    justifyContent: "center",
                  }}
                  backTextRight={status ? "모집중" : ""}
                  backTextLeft={!status ? "진행중" : ""}
                  textRightStyle={{
                    fontSize: 12,
                    color: "white",
                    fontWeight: "bold",
                  }}
                  textLeftStyle={{ fontSize: 12 }}
                />
              </View>

              {tutor.map((item) => {
                const role =
                  item.tutorRole === "MAIN_TUTOR"
                    ? "주강사"
                    : item.tutorRole === "SUB_TUTOR"
                    ? "보조강사"
                    : "스태프";
                return (
                  <ApplyingTutorBox
                    key={item.id}
                    name={item.name}
                    role={role}
                    major={item.degree.major}
                    onPress={() =>
                      assignment(
                        item.tutorRole,
                        role,
                        item.userId,
                        item.name,
                        item.tutorStatus
                      )
                    }
                    status={item.tutorStatus}
                  />
                );
              })}
            </View>
          </View>
        );
    }
  };

  const MyHeader = () => {
    return (
      <LectureTop
        subTitle={lectureBasicInfo.subTitle}
        mainPayment={lectureBasicInfo.mainPayment}
        subPayment={lectureBasicInfo.subPayment}
        staffPayment={lectureBasicInfo.staffPayment}
        city={lectureBasicInfo.city}
        date={lectureBasicInfo.lectureDates}
        time={lectureBasicInfo.time}
        transportCost={lectureBasicInfo.transportCost}
      />
    );
  };

  const statusHandler = () => {
    let lecture = lectureBasicInfo;
    if (!lecture) {
      console.error("lecture is undefined");
    }

    delete lecture.id;
    if (status) {
      lecture.status = "ALLOCATION_COMP";
    } else {
      lecture.status = "RECRUITING";
    }

    instance
      .patch(`${URL}/lectures/${data.id}`, lecture, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(
          status ? "ALLOCATION_COMP" + "변경완료" : "RECRUITING" + "변경완료"
        );
        setStatus((prev) => !prev);
        setIsLectureUpdate(!isLectureUpdate);
      })
      .catch((error) => {
        errorHandler(error, "강의 상태 변경 오류");
      });
  };

  return (
    <>
      <Tabs.Container renderHeader={MyHeader}>
        <Tabs.Tab name="기본 정보">
          <Tabs.ScrollView>
            <View style={{ marginTop: 40, flex: 1 }} onLayout={onLayout}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
                >
                  기본정보
                </Text>
                <View style={styles.infoContainer}>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>주최 및 주관</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.institution}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>일자</Text>
                    <View>
                      {lectureBasicInfo.lectureDates.map((item, i) => {
                        const date = new Date(item);
                        const month =
                          date.getMonth() >= 9
                            ? date.getMonth() + 1
                            : "0" + (date.getMonth() + 1);
                        const days =
                          date.getDate() > 9
                            ? date.getDate()
                            : "0" + date.getDate();

                        return (
                          <Text key={i} style={[styles.infoText]}>
                            {date.getFullYear()}.{month}.{days} (
                            {day[date.getDay()]})
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>시간</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.time}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>지역</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.city}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>장소</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.place}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>강의 대상</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.studentGrade}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>인원수</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.studentNumber}명
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>모집 인원</Text>
                    {/* <Text style={styles.infoText}>
                    주강사 {lectureBasicInfo.mainTutor}
                    {lectureBasicInfo.subTutor === "0"
                      ? ""
                      : ", 보조강사 " + lectureBasicInfo.subTutor}
                    {lectureBasicInfo.staff === "0"
                      ? ""
                      : ", 스태프 " + lectureBasicInfo.staff}
                  </Text> */}
                    <View>
                      <Text style={styles.infoText}>
                        주 강사 : {lectureBasicInfo.mainTutor}
                      </Text>
                      {lectureBasicInfo.subTutor === "0" ? (
                        ""
                      ) : (
                        <Text style={[styles.infoText, { marginTop: 2 }]}>
                          보조 강사 : {lectureBasicInfo.subTutor}
                        </Text>
                      )}
                      {lectureBasicInfo.staff === "0" ? (
                        ""
                      ) : (
                        <Text style={[styles.infoText, { marginTop: 2 }]}>
                          스태프 : {lectureBasicInfo.staff}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>강사 급여</Text>
                    <View>
                      <Text style={styles.infoText}>
                        주 강사 : {lectureBasicInfo.mainPayment}원
                      </Text>
                      {lectureBasicInfo.subPayment === "0" ? (
                        ""
                      ) : (
                        <Text style={[styles.infoText, { marginTop: 2 }]}>
                          보조 강사 : {lectureBasicInfo.subPayment}원
                        </Text>
                      )}
                      {lectureBasicInfo.staffPayment === "0" ? (
                        ""
                      ) : (
                        <Text style={[styles.infoText, { marginTop: 2 }]}>
                          스태프 : {lectureBasicInfo.staffPayment}원
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>기타 특이사항</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureBasicInfo.remark}
                    </Text>
                  </View>
                </View>
              </View>

              {headerRole === "ROLE_ADMIN" ||
              lectureBasicInfo.status === "ALLOCATION_COMP" ||
              lectureBasicInfo.status === "FINISH" ? (
                ""
              ) : (
                <View style={styles.buttonContainer}>
                  {lectureBasicInfo.mainTutor === "0" ? (
                    ""
                  ) : (
                    <ButtonOneThird
                      onPress={() => applyingTutor("MAIN_TUTOR")}
                      text="주 강사 신청"
                      backgroundColor={
                        apply[0]
                          ? GlobalStyles.colors.gray05
                          : GlobalStyles.colors.primaryDefault
                      }
                    />
                  )}
                  {lectureBasicInfo.subTutor === "0" ? (
                    ""
                  ) : (
                    <ButtonOneThird
                      onPress={() => applyingTutor("SUB_TUTOR")}
                      text="보조 강사 신청"
                      backgroundColor={
                        apply[1]
                          ? GlobalStyles.colors.gray05
                          : GlobalStyles.colors.primaryDefault
                      }
                    />
                  )}
                  {lectureBasicInfo.staff === "0" ? (
                    ""
                  ) : (
                    <ButtonOneThird
                      onPress={() => applyingTutor("STAFF")}
                      text="스태프 신청"
                      backgroundColor={
                        apply[2]
                          ? GlobalStyles.colors.gray05
                          : GlobalStyles.colors.primaryDefault
                      }
                    />
                  )}
                </View>
              )}
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="강의 관련 정보">
          <Tabs.ScrollView>
            <View style={{ marginTop: 40, flex: 1, paddingHorizontal: 20 }}>
              <View style={{ marginBottom: 0 }}>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
                >
                  강의 관련 정보
                </Text>
                <View style={styles.infoContainer}>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>교육 내용</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureContent.content}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>키트</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureContent.kit}
                    </Text>
                  </View>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>기본 강의 구성</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureContent.detail}
                    </Text>
                  </View>
                  {/* <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>기타 특이사항</Text>
                  <Text
                    style={[styles.infoText, { maxWidth: layout.width - 170 }]}
                  >
                    {lectureContent.remark}
                  </Text>
                </View> */}
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.infoTitle}>자격 요건</Text>
                    <Text
                      style={[
                        styles.infoText,
                        { maxWidth: layout.width - 170 },
                      ]}
                    >
                      {lectureContent.requirement}
                    </Text>
                  </View>
                </View>
              </View>
              {assign ? (
                <View>
                  <View
                    style={{
                      height: 0.5,
                      backgroundColor: GlobalStyles.colors.gray04,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginTop: 44,
                      marginBottom: 34,
                    }}
                  >
                    강의 배정 정보
                  </Text>
                  <View style={{ gap: 18 }}>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.infoTitle}>주 강사</Text>
                      <Text
                        style={[
                          styles.infoText,
                          { maxWidth: layout.width - 170 },
                        ]}
                      >
                        {assignList[0]}
                      </Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.infoTitle}>보조 강사</Text>
                      <Text
                        style={[
                          styles.infoText,
                          { maxWidth: layout.width - 170 },
                        ]}
                      >
                        {assignList[1]}
                      </Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.infoTitle}>스태프</Text>
                      <Text
                        style={[
                          styles.infoText,
                          { maxWidth: layout.width - 170 },
                        ]}
                      >
                        {assignList[2]}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                ""
              )}
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
        {headerRole === "ROLE_ADMIN" ? (
          <Tabs.Tab name="신청 강사">
            <Tabs.ScrollView>
              <View style={{ marginTop: 40, flex: 1 }}>
                <View style={{ paddingHorizontal: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={[
                        styles.flexDirectionRow,
                        { gap: 8, marginBottom: 28 },
                      ]}
                    >
                      {/* <Pressable>
                        <FilterBox text="강사 타입" color="black" />
                      </Pressable>
                      <Pressable onPress={() => console.log(status)}>
                        <FilterBox text="정렬 순서" color="black" />
                      </Pressable> */}
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          paddingTop: 4,
                          // marginBottom: 32,
                        }}
                      >
                        신청 강사
                      </Text>
                    </View>
                    {/* SwitchToggle 참고 링크 */}
                    {/* https://github.com/yujong-lee/react-native-switch-toggle */}

                    <SwitchToggle
                      switchOn={status}
                      onPress={() => {
                        data.status === "FINISH"
                          ? Alert.alert(
                              "해당 강의는 끝난 강의입니다.",
                              "상태를 변경할 수 없습니다.",
                              [
                                {
                                  text: "확인",
                                  onPress: () => {
                                    // console.log("강사 신청 완료");
                                  },
                                  style: "default",
                                },
                              ]
                            )
                          : statusHandler();
                      }}
                      containerStyle={{
                        width: 80,
                        height: 36,
                        borderRadius: 100,
                        padding: 4,
                      }}
                      circleStyle={{
                        width: 22,
                        height: 22,
                        borderRadius: 23,
                      }}
                      backgroundColorOn={GlobalStyles.colors.primaryDefault}
                      backgroundColorOff={GlobalStyles.colors.gray05}
                      buttonStyle={
                        !status
                          ? {
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                              marginLeft: 8,
                            }
                          : {
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                            }
                      }
                      rightContainerStyle={{
                        flex: 1,
                        position: "absolute",
                        marginLeft: 10,
                        paddingBottom: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      leftContainerStyle={{
                        flex: 1,
                        alignItems: "flex-end",
                        marginRight: 8,
                        marginBottom: 2,
                        justifyContent: "center",
                      }}
                      backTextRight={status ? "모집중" : ""}
                      backTextLeft={!status ? "진행중" : ""}
                      textRightStyle={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                      }}
                      textLeftStyle={{ fontSize: 12 }}
                    />
                  </View>

                  {tutor.map((item) => {
                    const role =
                      item.tutorRole === "MAIN_TUTOR"
                        ? "주강사"
                        : item.tutorRole === "SUB_TUTOR"
                        ? "보조강사"
                        : "스태프";
                    return (
                      <ApplyingTutorBox
                        key={item.id}
                        name={item.name}
                        role={role}
                        major={item.degree.major}
                        onPress={() =>
                          assignment(
                            item.tutorRole,
                            role,
                            item.userId,
                            item.name,
                            item.tutorStatus
                          )
                        }
                        status={item.tutorStatus}
                      />
                    );
                  })}
                </View>
              </View>
            </Tabs.ScrollView>
          </Tabs.Tab>
        ) : (
          ""
        )}
      </Tabs.Container>
      {headerRole === "ROLE_ADMIN" ? (
        <View style={styles.btnContainer}>
          <Pressable
            onPress={() =>
              navigation.push("UpdateLectureScreen", {
                data: {
                  lectureContentDto: lectureContent,
                  lectureDto: lectureBasicInfo,
                },
                navi: data?.navi,
                option: "update",
              })
            }
          >
            <View style={[styles.btn, { marginRight: 2 }]}>
              <AddLecture width={22} height={22} />
            </View>
          </Pressable>
          <Pressable onPress={deleteLecture}>
            <View style={styles.btn}>
              <Delete width={26} height={26} />
            </View>
          </Pressable>
        </View>
      ) : (
        ""
      )}

      {/* <ScrollView
        style={{ backgroundColor: "white", flex: 1 }}
        // contentContainerStyle={{ flexGrow: 1 }}
        >
        <LectureTop
          subTitle={lectureBasicInfo.subTitle}
          mainPayment={lectureBasicInfo.mainPayment}
          subPayment={lectureBasicInfo.subPayment}
          staffPayment={lectureBasicInfo.staffPayment}
          city={lectureBasicInfo.city}
          date={lectureBasicInfo.lectureDates}
          time={lectureBasicInfo.time}
          transportCost={lectureBasicInfo.transportCost}
        />

        <TabView
          style={{
            marginTop: 28,
            flex: 1,
            height:
              layout["height"] - (headerRole === "ROLE_ADMIN" ? 188 : 174),
          }}
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
                border: "none",
              }}
              style={{
                backgroundColor: "white",
                shadowOffset: { height: 0, width: 0 },
                shadowColor: "transparent",
                height: 34,
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
        {headerRole === "ROLE_ADMIN" ||
        lectureBasicInfo.status === "ALLOCATION_COMP" ||
        lectureBasicInfo.status === "FINISH" ? (
          ""
        ) : (
          <View style={styles.buttonContainer}>
            {lectureBasicInfo.mainTutor === "0" ? (
              ""
            ) : (
              <ButtonOneThird
                onPress={() => applyingTutor("MAIN_TUTOR")}
                text="주 강사 신청"
                backgroundColor={
                  apply[0]
                    ? GlobalStyles.colors.gray05
                    : GlobalStyles.colors.primaryDefault
                }
              />
            )}
            {lectureBasicInfo.subTutor === "0" ? (
              ""
            ) : (
              <ButtonOneThird
                onPress={() => applyingTutor("SUB_TUTOR")}
                text="보조 강사 신청"
                backgroundColor={
                  apply[1]
                    ? GlobalStyles.colors.gray05
                    : GlobalStyles.colors.primaryDefault
                }
              />
            )}
            {lectureBasicInfo.staff === "0" ? (
              ""
            ) : (
              <ButtonOneThird
                onPress={() => applyingTutor("STAFF")}
                text="스태프 신청"
                backgroundColor={
                  apply[2]
                    ? GlobalStyles.colors.gray05
                    : GlobalStyles.colors.primaryDefault
                }
              />
            )}
          </View>
        )}
      </ScrollView> */}

      {/* {headerRole === "ROLE_ADMIN" ? (
        <View style={styles.btnContainer}>
          <Pressable
            onPress={() =>
              navigation.push("UpdateLectureScreen", {
                data: {
                  lectureContentDto: lectureContent,
                  lectureDto: lectureBasicInfo,
                },
                option: "update",
                navi: data.navi,
              })
            }
          >
            <View style={[styles.btn, { marginRight: 2 }]}>
              <AddLecture width={22} height={22} />
            </View>
          </Pressable>
          <Pressable onPress={deleteLecture}>
            <View style={styles.btn}>
              <Delete width={26} height={26} />
            </View>
          </Pressable>
        </View>
      ) : (
        ""
      )} */}
    </>

    // </View>
  );
}

export default DetailLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    // position: "absolute",
    // bottom: -10,
    // flex: 1,
    // marginBottom: 14,
    // height: 40,
    marginTop: 70,
    marginBottom: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    // marginBottom: 30.84,
  },
  BottomButton: {
    // position: "absolute",
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    // bottom: 27,
    // right: 20,
  },
  infoContainer: {
    gap: 18,
    // marginBottom: 56,
    // paddingBottom: 56,
    // borderBottomColor: GlobalStyles.colors.gray04,
    // borderBottomWidth: 0.5,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  infoTitle: {
    width: 130,
    fontSize: 15,

    color: GlobalStyles.colors.gray03,
  },
  infoText: {
    fontSize: 15,
    // maxWidth: 200,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 6,
    right: 6,
  },
  btn: {
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 100,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
