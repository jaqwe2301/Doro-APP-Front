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
import axios from "axios";

function AddNoticeScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filename, setFileName] = useState("");
  const [result, setResult] = useState();

  const [statusCamera, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("");

  async function completeHandler2() {
    const formData = new FormData();
    const value = [
      {
        title: title,
        body: body,
      },
    ];

    var json = JSON.stringify({ title: title, body: body });
    // var json = JSON.stringify(value);

    // // // Blob 객체로 JSON 데이터 생성
    var blob = new Blob([json], { type: "application/json" });

    // FormData에 Blob 객체 추가
    formData.append(
      "announcementReq",
      // blob
      json
      // // { title: title, body: body }
      // {
      //   contentType: "application/json",
      // }
    );
    console.log(formData);
    // formData.append(
    //   "announcementReq",
    //   new Blob([JSON.stringify(value)], { type: "application/json" })
    // );
    // formData.append("announcementReq.title", title);
    // // );
    // formData.append("announcementReq.body", body);
    // formData.append("announcementReq", "hi");

    // for (const key of formData.keys()) {
    //   console.log(key); // 각 키(key)를 출력
    // }

    // for (const value of formData.values()) {
    //   console.log(value); // 각 값(value)을 출력
    // }

    // if (imageUrl) {
    //   formData.append("picture", {
    //     uri: imageUrl,
    //     type: type,
    //     name: filename,
    //   });
    //   // const response = await fetch(imageUrl);
    //   // const blob = await response.blob();
    //   // formData.append("picture", json);
    // } else {
    //   formData.append("picture", "");
    // }
    // console.log(formData);

    // console.log(formData.get("announcementReq"));
    // console.log(formData.keys);

    // const response = await createAnnouncement({
    //   formData: formData,
    //   title: title,
    //   body: body,
    // });
    // const boundary = "----ExpoBoundary" + Math.random().toString(16).slice(2);
    try {
      const response = await axios.post(
        "http://10.0.2.2:8080/announcements",
        // {
        //   announcementReq: [
        //     {
        //       title: title,
        //       body: body,
        //     },
        //   ],
        //   picture: [
        //     {
        //       uri: imageUrl,
        //       type: type,
        //       name: filename,
        //     },
        //   ],
        // },
        // formData,
        { announcementReq: json },
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            //  boundary=${boundary}`,
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      // fetch("http://10.0.2.2:8080/announcements/", {
      //   method: "POST",
      //   // headers: {
      //   //   // "Content-Type": "multipart/form-data",
      //   //   Accept: "application/json",
      //   // },
      //   body: formData,
      // })
      //   .then((response) => response.json()) // JSON 형식으로 응답 데이터를 파싱
      //   .then((data) => {
      //     // 응답 데이터 처리
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     // 에러 처리
      //     console.log(error);
      //   });
      // console.log("성공?" + response);

      // console.log(response);
      // if (response.success) {
      //   navigation.replace("noticeScreen");
      // }

      // let data = new FormData();
      // data.append(
      //   "announcementReq",
      //   '{"title":"되냐 안되 ","body":"진아 모르겠나"}',
      //   { contentType: "application/json" }
      // );
      // data.append("picture", {
      //   uri: imageUrl,
      //   type: type,
      //   name: filename,
      // });

      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: "http://10.0.2.2:8080/announcements",
      //   headers: {
      //     ...data.getHeaders(),
      //   },
      //   data: data,
      // };

      // axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } catch (error) {
      console.log(error + "여기");
    }
  }

  // async function completeHandler() {
  //   var formdata = new FormData();
  //   formdata.append(
  //     "announcementReq",
  //     '{"title":"되냐 안되 ","body":"진아 모르겠나"}'
  //   );
  //   formdata.append("picture", fileInput.files[0], "/path/to/file");

  //   var requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:8080/announcements", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // }

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={completeHandler2}>
            <Text style={styles.completeText}>완료</Text>
          </Pressable>
        );
      },
    });
  }, [completeHandler2]);

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
