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
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState, useEffect } from "react";

import { GlobalStyles } from "../../constants/styles";

function InputLectures() {
  const [lecturedata, setLecturedata] = useState({
    institution: "",
    city: "",
    lectureDate: {
      enrollEndDate: "2023-05-15T11:00:00.519Z",
      enrollStartDate: "2023-04-29T00:00:00.519Z",
    },
    lectureContentId: 1,
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
    mainTitle: "3D 코딩으로 떠나는 주말 농장 캠프",
    subTitle: "진로 체험 주간\n파이썬 고등대상",
    place: "",
    status: "ALLOCATION_COMP",
  });

  const [inputList, setInputList] = useState([{ text: "" }]);

  const toDateType = () => {
    let dateArray = [];
    inputList.map((item) => {
      const splitedDate = item.text.split(".");
      dateArray.push(
        new Date(
          splitedDate[0],
          splitedDate[1] === 1 ? 12 : splitedDate[1] - 1,
          splitedDate[2]
        )
      );
    });
    return dateArray;
  };

  const creatingLecture = () => {
    // setLecturedata();
    console.log(() => toDateType());
  };

  const consoleTest = () => {
    console.log(inputList);
  };

  const SingeInputStateChange = (data) => {
    setLecturedata(data);
  };

  const handleSingeInputChange = (text, item) => {
    let prevData = lecturedata;
    prevData[item] = text;
    SingeInputStateChange(prevData);
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
    { key: "first", title: "기본정보" },
    { key: "second", title: "강의 관련 정보" },
  ]);

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ScrollView style={styles.lectureInfoListContainer}>
            <View style={styles.lectureInfoContainer}>
              <Text>주최 및 주관</Text>
              <TextInput
                style={styles.inputBox}
                value={inputList.institution}
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
                value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "time");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>지역</Text>
              <TextInput
                style={styles.inputBox}
                value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "city");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>장소</Text>
              <TextInput
                style={styles.inputBox}
                value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "place");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강의 대상</Text>
              <TextInput
                style={styles.inputBox}
                value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentGrade");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>인원수</Text>
              <TextInput
                style={styles.inputBox}
                value={inputList.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentNumber");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>모집 인원</Text>
              <View>
                <TextInput
                  style={[styles.inputBox, { marginBottom: 8 }]}
                  value={inputList.institution}
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
              <Text>강사 급여</Text>
              <View>
                <TextInput
                  style={[styles.inputBox, { marginBottom: 8 }]}
                  value={inputList.institution}
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
              // onPress={creatingLecture}
              // onPress={consoleTest}
              onPress={(text) => handleSingeInputChange(text)}
              style={{ backgroundColor: "blue", height: 20, width: 20 }}
            />
          </ScrollView>
        );
      case "second":
        return <View style={{ flex: 1, backgroundColor: "white" }} />;

      default:
        return <View />;
    }
  };

  return (
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
  );
}

export default InputLectures;

const styles = StyleSheet.create({
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
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
