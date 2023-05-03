import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import InputLine from "../components/ui/InputLine";

function ProfileEdit() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/profile.png")}
          />
          <View style={{ marginTop: 8 }}>
            <Pressable>
              <Text style={styles.imgEditText}>사진 수정</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.border, { marginTop: 16 }]}></View>
        <View>
          <Text style={styles.contentTitle}>기본정보</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>이름</Text>
            <Text style={styles.contentText}>김혜원</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>생년월일</Text>
            <Text style={styles.contentText}>2001.09.27</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>휴대전화번호</Text>
            <InputLine placeholder={"010-4478-1672"} />

            <Pressable>
              <Text style={styles.auth}>인증요청</Text>
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>인증번호</Text>
            <InputLine placeholder={"548342"} />
            <Pressable>
              <Text style={styles.auth}>인증확인</Text>
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>학교</Text>
            <InputLine placeholder={"한양대학교 ERICA"} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>전공</Text>
            <InputLine placeholder={"ICT융합학부"} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>학번</Text>
            <InputLine placeholder={"2020004257"} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>재학 유무</Text>
            <InputLine placeholder={"재학"} />
          </View>
          <View style={styles.border}></View>
        </View>
        <View>
          <Text style={styles.contentTitle}>로그인 정보</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>아이디</Text>
            <Text
              style={[
                styles.contentText,
                { color: GlobalStyles.colors.gray01 },
              ]}
            >
              hynnk0
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>비밀번호</Text>
            <Pressable>
              <Text
                style={[
                  styles.contentText,
                  { borderBottomWidth: 1, color: GlobalStyles.colors.gray01 },
                ]}
              >
                비밀번호 수정
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.border}></View>
      </ScrollView>
    </View>
  );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 99,
    height: 99,
  },
  imgEditText: {
    color: GlobalStyles.colors.primaryDefault,
    fontWeight: 400,
    fontSize: 12,
  },
  border: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 33,
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 33,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    width: 70,
    color: GlobalStyles.colors.gray03,
  },
  contentText: {
    marginLeft: 45,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  contentTitle: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
  },
  inputContainer: {
    marginLeft: 45,
  },
  auth: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray01,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray01,
    marginLeft: 10,
    width: 50,
    textAlign: "center",
  },
});
