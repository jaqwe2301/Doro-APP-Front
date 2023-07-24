import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  NativeModules,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { editAnnouncement, getAnnouncementId, getProfile } from "../utill/http";

import Camera from "../assets/camera.svg";

import * as ImagePicker from "expo-image-picker";
import { KeyboardAvoidingView } from "react-native";
import { HeaderContext } from "../store/header-context";

function EditNoticeScreen({ navigation, route }) {
  const data = route.params.data;
  const [body, setBody] = useState(data.body);
  const [title, setTitle] = useState(data.title);
  // const [formData, setFormData] = useState(new FormData());
  const [filename, setFileName] = useState("");
  const [type, setType] = useState("");
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const { isNoticeUpdate, setIsNoticeUpdate } = useContext(HeaderContext);

  async function completeHandler() {
    const response = await getProfile({ id: headerId });
    const formData = new FormData();
    formData.append("writer", response.data.name);
    formData.append("title", title);
    formData.append("body", body);
    // console.log(formData.get("announcementReq"));
    if (imageUrl && imageUrl !== data.picture) {
      formData.append("picture", {
        uri: imageUrl,
        type: type,
        name: filename,
      });
    } else if (
      imageUrl === data.picture &&
      imageUrl !== undefined &&
      imageUrl !== null
    ) {
      const imagePath = imageUrl.split("/").pop();
      const imageName = imagePath.split(".")[0];
      const imageType = imagePath.split(".")[1];
      formData.append("picture", {
        uri: imageUrl,
        type: imageType,
        name: imageName,
      });
      console.log("이미지 넣음요");
    }
    // }
    try {
      console.log(JSON.stringify(formData));
      const response = await editAnnouncement({
        formData: formData,
        id: data.id,
      });
      console.log(response);
      if (response.success) {
        try {
          const response = await getAnnouncementId({
            id: data.id,
          });
          setIsNoticeUpdate(!isNoticeUpdate);
          navigation.navigate("noticeDetail", { data: response });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={completeHandler}>
            <View style={styles.completeTextContainer}>
              <Text style={styles.completeText}>완료</Text>
            </View>
          </Pressable>
        );
      },
    });
  }, [completeHandler]);

  //camera
  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState(data.picture);

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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 44 + statusBarHeight : 0
        }
      >
        <View style={styles.container}>
          <View style={styles.headerBar} />
          <ScrollView>
            <View style={styles.contentContainer}>
              <TextInput
                value={title}
                style={styles.title}
                multiline
                onChangeText={(text) => setTitle(text)}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{data.writer} 매니저</Text>
                <Text style={styles.name}>
                  {moment(data.createdAt).format("YYYY-MM-DD")}
                </Text>
              </View>
              <TextInput
                value={body}
                onChangeText={(text) => setBody(text)}
                style={styles.subcontentContainer}
                multiline
              />
            </View>
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
            <Pressable onPress={cameraHandler}>
              <Camera width={24} height={24} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default EditNoticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  contentContainer: {
    margin: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: GlobalStyles.colors.gray01,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  subcontentContainer: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    color: GlobalStyles.colors.gray03,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  completeText: {
    fontWeight: "400",
    fontSize: 15,
    borderRadius: 5.41,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 20,
  },
  completeTextContainer: {
    paddingHorizontal: 11,
    paddingVertical: 5,

    borderRadius: 5.41,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: -4,
    backgroundColor: GlobalStyles.colors.primaryDefault,
  },
});
