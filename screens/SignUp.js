import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import AuthPhone from "../components/signUp/AuthPhone";

function SignUp({ navigation }) {
  const [isPhoneNum, setIsPhoneNum] = useState(false);
  const [isId, setIsId] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <AuthPhone navigation={navigation} />
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({});
