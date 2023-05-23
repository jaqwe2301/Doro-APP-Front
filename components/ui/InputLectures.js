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
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState, useEffect } from "react";
import axios from "axios";

import { GlobalStyles } from "../../constants/styles";

function InputLectures() {
  const [lecturedata, setLecturedata] = useState({
    institution: "",
    city: "",
    lectureDate: {
      enrollEndDate: "2023-05-15T11:00:00.519Z",
      enrollStartDate: new Date(),
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
    status: "ALLOCATION_COMP",
  });

  const [lectureContents, setLectureContents] = useState();
  const [selectedLectureContents, setSelectedLectureContents] = useState({
    kit: "",
    detail: "",
    remark: "",
    requirement: "",
    composition: "",
  });

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8080/lecture-contents", {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectureContents(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  const [inputList, setInputList] = useState([{ text: "" }]);

  const singleToDateType = () => {
    const splitedDate = lecturedata.lectureDate.enrollEndDate.split(".");
    const date = new Date(
      "20" + splitedDate[0],
      splitedDate[1] === 1 ? 12 : splitedDate[1] - 1,
      splitedDate[2]
    );

    return date;
  };

  const arrayToDateType = () => {
    const dateArray = [];
    inputList.map((item) => {
      const splitedDate = item.text.split(".");
      dateArray.push(
        new Date(
          "20" + splitedDate[0],
          splitedDate[1] === 1 ? 12 : splitedDate[1] - 1,
          splitedDate[2]
        )
      );
    });
    return dateArray;
  };

  const creatingLecture = () => {
    typeof lecturedata.lectureDate.enrollEndDate === "string"
      ? handleSingeInputChange(singleToDateType(), "enrollEndDate")
      : "";
    // 신청 마감 input을 수정 안 하면 타입이 date일 거니까...

    handleSingeInputChange(arrayToDateType(), "lectureDates");

    console.log(lecturedata);

    axios
      .post("http://10.0.2.2:8080/lectures/", lecturedata, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  };

  const SingeInputStateChange = (data) => {
    setLecturedata(data);
  };

  const handleSingeInputChange = (text, item) => {
    let prevData = lecturedata;
    if (item === "enrollEndDate") {
      prevData["lectureDate"][item] = text;
    } else {
      prevData[item] = text;
    }
    SingeInputStateChange(prevData);
    console.log(lecturedata);
  };

  const handleDateInputChange = (text, index) => {
    const newList = [...inputList];
    newList[index].text = text;
    setInputList(newList);
  };

  const handleAddInput = () => {
    const newList = [...inputList, { text: "" }];
    setInputList(newList);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강의 관련 정보" },
    { key: "second", title: "기본정보" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const modalHandler = (visible) => {
    setModalVisible(visible);
  };

  const selectingLectureContents = (id) => {
    const lectureContentsData = lectureContents.filter(
      (item) => item.id === id
    );
    const writingData = lecturedata;
    writingData["lectureContentId"] = id;
    setLecturedata(writingData);
    setSelectedLectureContents(lectureContentsData[0]);
    modalHandler(false);
  };

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={styles.lectureInfoListContainer}>
            <Text>강의 관련 정보</Text>
            <View style={styles.lectureInfoContainer}>
              <Text>교육 내용</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.content}
              </Text>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>교육 키트</Text>
              <View style={[styles.inputBox, styles.dateBox]}>
                <Text style={{ flex: 1 }}>{selectedLectureContents.kit}</Text>
                <Pressable onPress={() => modalHandler(true)}>
                  <Text style={{ marginRight: 8.03 }}>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>기본 강의 구성</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.detail}
              </Text>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>기타 특이 사항</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.remark}
              </Text>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>자격 요건</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.requirement}
              </Text>
            </View>

            {/* 교육 키트 플러스(+) 버튼 누르면 나오는 하단 모달 */}
            <Modal transparent={true} visible={modalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.modalWhiteBox}>
                  <View style={styles.modalTop}>
                    <Pressable onPress={() => modalHandler(false)}>
                      <Text>X</Text>
                    </Pressable>
                    <Text>교육 목록</Text>
                    <Text>+</Text>
                  </View>
                  <FlatList
                    style={styles.modalList}
                    data={lectureContents}
                    renderItem={(data) => {
                      return (
                        <Pressable
                          onPress={() => selectingLectureContents(data.item.id)}
                        >
                          <View style={styles.modalTextContainer}>
                            <Text style={styles.modalText}>
                              {data.item.kit}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    }}
                  />
                  <View style={styles.modalButtonContainer}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => modalHandler(false)}
                    >
                      <Text>확인</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      case "second":
        return (
          <ScrollView style={styles.lectureInfoListContainer}>
            <View style={styles.lectureInfoContainer}>
              <Text>주최 및 주관</Text>
              <TextInput
                style={styles.inputBox}
                // value={lecturedata.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "institution");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>일자</Text>
              <View>
                {inputList.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.inputBox,
                      styles.dateBox,
                      index > 0 ? { marginTop: 8 } : "",
                    ]}
                  >
                    <TextInput
                      value={item.text}
                      style={{ flex: 1 }}
                      onChangeText={(text) =>
                        handleDateInputChange(text, index)
                      }
                    />
                    {index === 0 ? (
                      <Pressable onPress={handleAddInput}>
                        <Text style={{ marginRight: 8.03 }}>+</Text>
                      </Pressable>
                    ) : (
                      ""
                    )}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>시간</Text>
              <TextInput
                style={styles.inputBox}
                // value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "time");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>지역</Text>
              <TextInput
                style={styles.inputBox}
                // value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "city");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>장소</Text>
              <TextInput
                style={styles.inputBox}
                // value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "place");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강의 대상</Text>
              <TextInput
                style={styles.inputBox}
                // value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentGrade");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>인원수</Text>
              <TextInput
                style={styles.inputBox}
                // value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentNumber");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>모집 인원</Text>
              <View>
                <TextInput
                  style={styles.inputBox}
                  // value={inputList.institution}
                  onChangeText={(text) => {
                    handleSingeInputChange(text, "mainTutor");
                  }}
                />
                {/* <TextInput
                    style={[styles.inputBox, { marginBottom: 8 }]}
                    value={inputList.institution}
                    onChangeText={(text) => {
                      handleSingeInputChange(text, "institution");
                    }}
                    />
                    <TextInput
                    style={styles.inputBox}
                    value={inputList.institution}
                    onChangeText={(text) => {
                      handleSingeInputChange(text, "institution");
                    }}
                  /> */}
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>신청 마감</Text>
              <TextInput
                style={styles.inputBox}
                // value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "enrollEndDate");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강사 급여</Text>
              <View>
                <TextInput
                  style={[styles.multiLineInputBox]}
                  // value={inputList.institution}
                  multiline={true}
                  onChangeText={(text) => {
                    handleSingeInputChange(text, "mainPayment");
                  }}
                />
                {/* <TextInput
                    style={[styles.inputBox, { marginBottom: 8 }]}
                    value={inputList.institution}
                    onChangeText={(text) => {
                      handleSingeInputChange(text, "institution");
                    }}
                  />
                  <TextInput
                    style={styles.inputBox}
                    value={inputList.institution}
                    onChangeText={(text) => {
                      handleSingeInputChange(text, "institution");
                    }}
                  /> */}
              </View>
            </View>
            <Pressable
              onPress={creatingLecture}
              // onPress={consoleTest}
              // onPress={(text) => handleSingeInputChange(text)}
              style={{ backgroundColor: "blue", height: 20, width: 20 }}
            />
          </ScrollView>
        );

      default:
        return <View />;
    }
  };

  return (
    <>
      <View style={styles.containerTop}>
        <Text>메인타이틀</Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={(text) => {
            handleSingeInputChange(text, "mainTitle");
          }}
        />
        <Text>서브타이틀</Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={(text) => {
            handleSingeInputChange(text, "subTitle");
          }}
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
            indicatorStyle={{
              backgroundColor: GlobalStyles.colors.primaryDefault,
              border: "none",
            }}
            style={{
              backgroundColor: "white",
              shadowOffset: { height: 0, width: 0 },
              shadowColor: "transparent",
            }}
            labelStyle={{
              // 폰트 컬러
              color: "black",
            }}
            pressColor={"transparent"}
          />
        )}
      />
    </>
  );
}

export default InputLectures;

const styles = StyleSheet.create({
  containerTop: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  titleInput: {
    height: 28,
    borderRadius: 5.41,
    backgroundColor: GlobalStyles.colors.gray07,
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
    backgroundColor: "white",
  },
  lectureInfoContainer: {
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  inputBox: {
    width: 221,
    backgroundColor: GlobalStyles.colors.gray07,
    justifyContent: "center",
  },
  multiLineInputBox: {
    width: 221,
    height: 62,
    backgroundColor: GlobalStyles.colors.gray07,
    textAlignVertical: "top",
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalWhiteBox: {
    backgroundColor: "white",
    // height: 200,
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
    // flex: 1,
    height: 45,
    paddingHorizontal: 20,
  },
  modalButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 5.41,
  },
});
