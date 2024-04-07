import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
  // Image,
  Dimensions,
  NativeModules,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { createAnnouncement2, getProfile } from "../utill/http";
import { useContext, useEffect, useState } from "react";

import Camera from "../assets/camera.svg";
import { URL } from "../utill/config";

import Image from "react-native-scalable-image";
import * as ImagePicker from "expo-image-picker";
import NoticeScreen from "./NoticeScreen";
import axios from "axios";
import { HeaderContext } from "../store/header-context";

function AddNoticeScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState();
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFileName] = useState("");
  const [type, setType] = useState("");
  const [randomKey, setRandomKey] = useState("");
  //camera

  const cameraHandler = async () => {
    if (!statusCamera?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          "카메라 권한 요청",
          "이 기능을 사용하려면 카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.",
          [
            {
              text: "닫기",
              style: "cancel",
            },
          ]
        );
        return null;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setFileName(result.assets[0].uri.split("/").pop());
      setImageUrl(result.assets[0].uri);
      setRandomKey(Math.random().toString());
      let match = /\.(\w+)$/.exec(result.assets[0].uri.split("/").pop());
      let imageType = match ? `image/${match[1]}` : `image`;
      setType(imageType);
    } else {
      return null;
    }
  };

  async function completeHandler3() {
    try {
      const response = await getProfile({ id: headerId });
      const formData = new FormData();
      formData.append("writer", response.data.name);
      formData.append("title", title);
      formData.append("body", body);

      if (imageUrl) {
        formData.append("picture", {
          uri: imageUrl,
          type: type,
          name: filename,
        });
      }
      try {
        const response = await createAnnouncement2({
          formData: formData,
        });
        if (response.code === "NOTI001" || response.success) {
          navigation.replace("noticeScreen");
        }
      } catch (error) {
        if (error.isRefreshError) {
          // RefreshToken 관련 에러 시 로그아웃
          authCtx.logout();
        }
      }
    } catch (error) {
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={completeHandler3}>
            <View style={styles.completeContainer}>
              <Text style={styles.completeText}>완료</Text>
            </View>
          </Pressable>
        );
      },
    });
  }, [completeHandler3]);

  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 44 + statusBarHeight : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerBar} />
          <ScrollView>
            <Pressable onPress={() => Keyboard.dismiss()}>
              <View style={styles.titleContainer}>
                <TextInput
                  placeholder="제목"
                  style={styles.title}
                  placeholderTextColor={GlobalStyles.colors.gray03}
                  multiline
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                ></TextInput>
              </View>
              <View style={styles.contentContainer}>
                <TextInput
                  placeholder="내용을 입력하세요."
                  style={styles.content}
                  multiline
                  value={body}
                  onChangeText={(text) => setBody(text)}
                  placeholderTextColor={GlobalStyles.colors.gray03}
                ></TextInput>
              </View>
            </Pressable>
            <View
              style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 40 }}
            >
              {imageUrl && (
                <Image
                  key={randomKey}
                  source={{ uri: imageUrl }}
                  width={Dimensions.get("window").width - 40}
                />
              )}
            </View>
          </ScrollView>
          <View
            style={{
              height: 42,
              borderTopWidth: 0.8,
              borderTopColor: GlobalStyles.colors.gray04,
              justifyContent: "center",
              paddingLeft: 6,
            }}
          >
            <Pressable onPress={cameraHandler}>
              <View style={{ margin: 10 }}>
                <Camera width={24} height={24} />
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default AddNoticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  title: {
    fontSize: 22,
  },
  content: {
    fontSize: 17,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 15,
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  contentContainer: {
    margin: 20,
    marginBottom: 0,
  },
  completeText: {
    fontWeight: "400",
    fontSize: 15,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 20,
  },
  completeContainer: {
    borderRadius: 5.41,
    backgroundColor: GlobalStyles.colors.primaryDefault,

    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
});
