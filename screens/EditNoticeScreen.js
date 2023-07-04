import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { editAnnouncement } from "../utill/http";
import { WithLocalSvg } from "react-native-svg";
import Camera from "../assets/camera.svg";

import * as ImagePicker from "expo-image-picker";

function EditNoticeScreen({ navigation, route }) {
  const data = route.params.data;
  const [body, setBody] = useState(data.body);
  const [title, setTitle] = useState(data.title);
  // const [formData, setFormData] = useState(new FormData());

  async function completeHandler() {
    const formData = new FormData();
    const value = [
      {
        title: title,
        body: body,
      },
    ];

    const blob = new Blob([JSON.stringify(value)], {
      type: "application/json",
    });
    console.log(blob);
    formData.append("announcementReq", blob);
    // console.log(formData.get("announcementReq"));
    if (imageUrl) {
      formData.append("picture", null);
    }
    try {
      const response = await editAnnouncement({
        formData: formData,
        id: data.id,
      });
      console.log(response);
      // if (response.success) {
      //   navigation.replace("noticeScreen");
      // }
    } catch (error) {
      console.log(error);
    }
  }

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

  //camera
  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");

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
    console.log(!result.canceled);

    if (!result.canceled) {
      const filename = result.assets[0].uri.split("/").pop();
      console.log(filename);
      formData.append("picture", {
        uri: result.assets[0].uri,
        type: "multipart/form-data",
        name: filename,
      });
      setImageUrl(result.assets[0].uri);
    } else {
      return null;
    }
  };

  return (
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
            <Text style={styles.name}>김동규 매니저</Text>
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
        <WithLocalSvg asset={Camera} onPress={cameraHandler} />
      </View>
    </View>
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
    fontWeight: 400,
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
