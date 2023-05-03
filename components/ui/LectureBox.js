import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

function LectureBox(props) {
  const recruitingData = props.LectureData.filter(
    (item) => item.lectureStatus === null
  );

  // for (let i = 0; i < recruitingData.length; i++) {
  //   let splitedTitle = recruitingData[i].title.split("#");
  //   recruitingData[i].mainTitle = splitedTitle[0];
  //   recruitingData[i].subTitle = splitedTitle[1];
  // }

  const allTitleArray = [
    ...new Set(recruitingData.map((item) => item.mainTitle)),
  ];

  let LectureElements = [];

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const lectureDateControl = (date) => {
    let result = dateControl(date[0]).getMonth() + 1 + "월 ";
    for (let i = 0; i < date.length; i++) {
      if (i === date.length - 1) {
        result += dateControl(date[i]).getDate() + "일";
      } else {
        result += dateControl(date[i]).getDate() + "일 / ";
      }
    }
    return result;
  };

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  for (let i = 0; i < allTitleArray.length; i++) {
    let SelectedColor = GlobalStyles.indicationColors[i % 4];

    LectureElements.push(
      <View key={i}>
        <Text style={[styles.mainTitle, { color: SelectedColor }]}>
          {allTitleArray[i]}
        </Text>

        {recruitingData
          .filter((item) => item.mainTitle === allTitleArray[i])
          .map((filteringItem, i) => {
            let dateTypeValue = dateControl(filteringItem.enrollEndDate);

            let dateHours =
              dateControl(filteringItem.lectureDates[0]).getHours().length === 2
                ? dateControl(filteringItem.lectureDates[0]).getHours()
                : "0" + dateControl(filteringItem.lectureDates[0]).getHours();

            let dateMinutes =
              dateControl(filteringItem.lectureDates[0]).getMinutes().length ===
              2
                ? dateControl(filteringItem.lectureDates[0]).getMinutes()
                : "0" + dateControl(filteringItem.lectureDates[0]).getMinutes();

            let EndTime =
              Number(dateHours) + Number(filteringItem.time) >= 10
                ? Number(dateHours) + Number(filteringItem.time)
                : "0" + (Number(dateHours) + Number(filteringItem.time));

            let dateText =
              // 날짜 텍스트
              filteringItem.lectureDates.length > 1
                ? // 날짜가 하나 혹은 여러 개에 따라 다르게 주기
                  `${lectureDateControl(
                    filteringItem.lectureDates
                  )} ${dateHours}:${dateMinutes} - ${EndTime}:${dateMinutes}`
                : `${
                    dateControl(filteringItem.lectureDates[0]).getMonth() + 1
                  }월 ${dateControl(
                    filteringItem.lectureDates[0]
                  ).getDate()}일 (${
                    days[dateControl(filteringItem.lectureDates[0]).getDay()]
                  }) ${dateHours}:${dateMinutes} - ${EndTime}:${dateMinutes}`;

            const lectureIdHandler = () => {
              props.onPresslectureId(filteringItem.id);
            };

            return (
              <Pressable key={filteringItem.id} onPress={lectureIdHandler}>
                <View
                  style={[
                    styles.colorCover,
                    { backgroundColor: SelectedColor },
                  ]}
                >
                  <View style={styles.whieBox}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.SubTitle}>
                        {filteringItem.subTitle}
                      </Text>
                      <Text style={styles.enrollEndDate}>
                        신청마감 {dateTypeValue.getMonth() + 1}월{" "}
                        {dateTypeValue.getDate()}일{" "}
                      </Text>
                    </View>
                    <Text style={styles.tutor}>
                      주강사 {filteringItem.mainTutor}명 · 보조강사{" "}
                      {filteringItem.subTutor}명
                    </Text>
                    <View style={styles.placeDateContainer}>
                      <Text style={styles.place}>{filteringItem.place}</Text>
                      <Text style={[styles.date, { color: SelectedColor }]}>
                        {dateText}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
      </View>
    );
  }

  return (
    <ScrollView style={styles.lectureListContainer}>
      {LectureElements}
    </ScrollView>
  );
}

export default LectureBox;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  lectureListContainer: {
    paddingHorizontal: 20,
  },
  colorCover: {
    marginTop: 8,
    // marginBottom: 8,
    paddingLeft: 5,
    overflow: "hidden",
    height: 120,
    // width: 335,
    // backgroundColor: GlobalStyles.colors.green,
    borderRadius: 5.41,
    shadowColor: "Black",
    elevation: 2,
  },
  whieBox: {
    paddingLeft: 15,
    paddingRight: 11,
    backgroundColor: "white",
    height: 120,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SubTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray01,
  },
  enrollEndDate: {
    marginTop: 10,
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
  },
  tutor: {
    fontSize: 10,
    color: GlobalStyles.colors.gray03,
  },
  placeDateContainer: {
    marginTop: 7.61,
    alignItems: "flex-end",
  },
  place: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
  },
  date: {
    // color: GlobalStyles.colors.green,
    fontSize: 12,
  },
});
