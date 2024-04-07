import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

import Xmark from "../../assets/xmark_gray.svg";
import { useEffect } from "react";

function ApplyingLectureBox({
  date,
  time,
  id,
  lectureIdHandler,
  backgroundColor,
  colors,
  subTitle,
  place,
  tutorRole,
  dateTypeValue,
  onPressX,
  onPress,
  matchingText,
}) {
  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  // const lectureDateControl = (date) => {
  //   let result = dateControl(date[0]).getMonth() + 1 + "월 ";
  //   for (let i = 0; i < date.length; i++) {
  //     if (i === date.length - 1) {
  //       result += dateControl(date[i]).getDate() + "일";
  //     } else {
  //       result += dateControl(date[i]).getDate() + "일 / ";
  //     }
  //   }
  //   return result;
  // };

  const lectureDateControl = (date) => {
    let result = "";
    let currentMonth = null;

    for (let i = 0; i < date.length; i++) {
      const currentDate = dateControl(date[i]);
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      if (currentMonth === null) {
        // 첫 번째 날짜일 경우
        currentMonth = month;
        result += `${month}월 ${day}일`;
      } else {
        if (month !== currentMonth) {
          // 이전 날짜와 다른 달인 경우
          currentMonth = month;
          result += ` / ${month}월 ${day}일`;
        } else {
          // 이전 날짜와 같은 달인 경우
          result += ` , ${day}일`;
        }
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

  const dateText = date
    ? date?.length > 1
      ? // 날짜가 하나 혹은 여러 개에 따라 다르게 주기
        `${lectureDateControl(date)} ${time}`
      : `${dateControl(date[0]).getMonth() + 1}월 ${dateControl(
          date[0]
        ).getDate()}일 (${days[dateControl(date[0]).getDay()]}) ${time}`
    : "";

  const layout = useWindowDimensions();

  return (
    <Pressable key={id} onPress={lectureIdHandler}>
      <View
        style={[
          styles.whiteBox,
          backgroundColor
            ? { backgroundColor: backgroundColor }
            : { backgroundColor: "white" },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text
            style={[styles.SubTitle, { maxWidth: layout.width - 110 }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {subTitle}
          </Text>

          {onPressX ? (
            <Pressable onPress={onPressX}>
              <Xmark width={20} height={20} />
            </Pressable>
          ) : (
            <Text style={{ fontSize: 10, marginTop: 5 }}>{matchingText}</Text>
          )}
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.role}>{tutorRole}</Text>
            <Text style={[styles.place, { maxWidth: layout.width - 230 }]}>
              {place}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 12,
            }}
          >
            {/* <View style={{ alignItems: "flex-end" }}> */}
            <Text style={styles.enrollEndDate}>
              {typeof dateTypeValue === "object"
                ? "신청마감 " +
                  `${
                    dateTypeValue?.getMonth() + 1
                  }월 ${dateTypeValue?.getDate()}일`
                : dateTypeValue}
            </Text>
            <Text style={[styles.date, { maxWidth: layout.width - 150 }]}>
              {dateText}
            </Text>
            {/* </View> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ApplyingLectureBox;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  whiteBox: {
    marginTop: 4,
    marginBottom: 8,
    // paddingVertical: 13,
    height: 128,
    borderRadius: 5.41,
    elevation: 3,
    paddingLeft: 15,
    paddingRight: 11,
    // backgroundColor: "white",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.3, // 그림자의 투명도
    shadowRadius: 1.5, // 그
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginTop: 12,
  },
  SubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray01,
  },
  role: {
    fontSize: 10,
    color: GlobalStyles.colors.gray03,
    fontWeight: "bold",
    // lineHeight: 20,
  },
  enrollEndDate: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
    // lineHeight: 20,
  },
  place: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
    // lineHeight: 20,
    fontWeight: "bold",

    // maxHeight: 100,
  },
  date: {
    fontSize: 12,

    // lineHeight: 20,
    // maxWidth: 200,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryDefault,
  },
});
