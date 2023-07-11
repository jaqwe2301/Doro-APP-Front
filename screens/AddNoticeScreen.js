import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
  Image,
  Dimensions,
  NativeModules,
  KeyboardAvoidingView,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import {
  createAnnouncement,
  createAnnouncement2,
  pushNotification,
} from "../utill/http";
import { useEffect, useState } from "react";

import Camera from "../assets/camera.svg";
import { URL } from "../utill/config";

import * as ImagePicker from "expo-image-picker";
import NoticeScreen from "./NoticeScreen";
import axios from "axios";

function AddNoticeScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState();

  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFileName] = useState("");
  const [type, setType] = useState("");

  //camera

  const cameraHandler = async () => {
    if (!statusCamera?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFileName(result.assets[0].uri.split("/").pop());
      setImageUrl(result.assets[0].uri);
      let match = /\.(\w+)$/.exec(result.assets[0].uri.split("/").pop());
      let imageType = match ? `image/${match[1]}` : `image`;
      setType(imageType);
    } else {
      return null;
    }
  };

  async function completeHandler3() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("writer", "김동규");
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
      console.log(response);
      if (response.code === "NOTI001" || response.success) {
        navigation.replace("noticeScreen");
      }
    } catch (error) {
      console.log(JSON.stringify(formData));
      console.log(error);
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

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
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
          <View style={{ marginHorizontal: 20 }}>
            {imageUrl && (
              <Image
                source={{ uri: imageUrl }}
                style={{
                  width: "100%",
                  height: 500,
                  resizeMode: "contain",
                }}
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
