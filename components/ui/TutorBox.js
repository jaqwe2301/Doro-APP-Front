import { View, Text, StyleSheet, Pressable } from "react-native";

function TutorBox({ name, generation, school, major, lecture }) {
  // generation : 기수
  // lecture : 최근 강의
  return (
    <View>
      <Text>{name}</Text>
      <Text>DORO {generation}기</Text>
      <Text>{school} {major}</Text>
      <Text>최근 강의</Text>
      {lecture?.map((item) => {
        <Text>- {item}</Text>
      })}
    </View>
  );
}

export default TutorBox;

const styles = StyleSheet.create({});
