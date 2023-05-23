import { useState, useEffect } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "./../constants/styles";

function ManagerScreen() {
  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강사 목록" },
    { key: "second", title: "강의 목록" },
    { key: "third", title: "알림 발송" },
  ]);

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
                    <Pressable
                      onPress={() => {
                        addContentsModalHandler(true);
                      }}
                    >
                      <Text>+</Text>
                    </Pressable>
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
            <Modal visible={addContentsModal}>
              <Pressable onPress={() => addContentsModalHandler(false)}>
                <Text>모다아아아ㅏㅇㄹ</Text>
              </Pressable>
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
                value={lecturedata.institution}
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
                value={lecturedata.time}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "time");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>지역</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.city}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "city");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>장소</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.place}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "place");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강의 대상</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.studentGrade}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentGrade");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>인원수</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.studentNumber}
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
                  value={lecturedata.mainTutor}
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
                // value={lecturedata.lectureDate.enrollEndDate}
                onChangeText={(text) => {
                  enrollEndDateStateChange(text);
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강사 급여</Text>
              <View>
                <TextInput
                  style={[styles.multiLineInputBox]}
                  value={lecturedata.mainPayment}
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
              // onPress={creatingLecture}
              onPress={option === "create" ? creatingLecture : updateLecture}
              // onPress={choiceOption}
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

export default ManagerScreen;
