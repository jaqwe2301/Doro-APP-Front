import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

function LectureBox(props) {
  return (
    <Pressable key={props.id} onPress={props.lectureIdHandler}>
      <View style={[styles.colorCover, { backgroundColor: props.colors }]}>
        <View style={styles.whieBox}>
          <View style={styles.titleContainer}>
            <Text style={styles.SubTitle}>{props.subTitle}</Text>
            <Text style={styles.enrollEndDate}>
              신청마감 {props.dateTypeValue?.getMonth() + 1}월{" "}
              {props.dateTypeValue?.getDate()}일{" "}
            </Text>
          </View>
          <Text style={styles.tutor}>{props.mainTutor}</Text>
          <View style={styles.placeContainer}>
            <Text style={styles.place}>{props.place}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12 }}>
              {props.tutorRole === "MAIN_TUTOR"
                ? "주강사 신청중"
                : props.tutorRole === "SUB_TUTOR"
                ? "보조강사 신청중"
                : props.tutorRole === "STAFF"
                ? "스태프 신청중"
                : ""}
            </Text>
            <Text style={[styles.date, { color: props.colors }]}>
              {props.date}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
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
    paddingLeft: 5,
    overflow: "hidden",
    height: 120,
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
  placeContainer: {
    marginTop: 7.61,
    alignItems: "flex-end",
  },
  place: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
  },
  date: {
    fontSize: 12,
  },
});
