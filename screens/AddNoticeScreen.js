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
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { createAnnouncement, pushNotification } from "../utill/http";
import { useEffect, useState } from "react";
import { WithLocalSvg } from "react-native-svg";
import Camera from "../assets/camera.svg";

import * as ImagePicker from "expo-image-picker";
import NoticeScreen from "./NoticeScreen";

function AddNoticeScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const formData = new FormData();
  const [filename, setFileName] = useState("");

  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");

  async function completeHandler() {
    try {
      const value = [
        {
          title: title,
          body: body,
        },
      ];
      // console.log(value[0]);

      const blob = new Blob([JSON.stringify(value)], {
        type: "application/json",
      });
      formData.append("announcementReq", blob);
      if (imageUrl) {
        formData.append("picture", {
          uri: imageUrl,
          type: "multipart/form-data",
          name: filename,
        });
      }

      const response = await createAnnouncement({
        formData: formData,
      });

      console.log(response);
      // if (response.success) {
      //   navigation.replace("noticeScreen");
      // }
    } catch (error) {
      console.log(error);
    }
  }

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
    } else {
      return null;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={completeHandler}>
            <Text style={styles.completeText}>완료</Text>
          </Pressable>
        );
      },
    });
  }, [completeHandler]);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  return (
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
          paddingLeft: 16,
        }}
      >
        <WithLocalSvg asset={Camera} onPress={cameraHandler} />
      </View>
    </View>
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
    // lineHeight: 20,
    width: 50,
    height: 30,
    borderRadius: 5.41,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    // marginLeft: -4,
    backgroundColor: GlobalStyles.colors.primaryDefault,

    lineHeight: 20,
  },
});
