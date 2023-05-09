import { useState, useEffect } from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import InputLectures from './../components/ui/InputLectures';

function NewLectureScreen({ screenBackButton }) {
  return (
    <>
      <Pressable onPress={screenBackButton}>
        <Text>백버튼</Text>
      </Pressable>
      <InputLectures />
    </>
  );
}

export default NewLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
