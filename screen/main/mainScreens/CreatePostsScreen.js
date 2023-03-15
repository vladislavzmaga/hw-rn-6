import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  useWindowDimensions,
  Button,
} from "react-native";

import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import formReducer from "../../../reducers/formReducer";
const initialState = {
  photo: "",
  title: "",
  location: {},
};
const CreatePostsScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [snap, setSnap] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const window = useWindowDimensions().width;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      dispatch({
        type: "add input",
        field: "location",
        payload: coords,
      });
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await snap.takePictureAsync();
      dispatch({
        type: "add input",
        field: "photo",
        payload: photo.uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { ...state });
    dispatch({
      type: "refresh user data",
      payload: initialState,
    });
    console.log("state after", state);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.image_add_wrap}>
        <Camera
          style={styles.camera_wrap}
          ref={setSnap}
          type={Camera.Constants.Type.back}
        >
          {state.photo && (
            <View style={styles.image_wrap}>
              <Image
                source={{ uri: state.photo }}
                style={{ height: 238, width: window - 34 }}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              ...styles.add_photo,
              backgroundColor: state.photo
                ? "rgba(255, 255, 255, 0.3)"
                : "#fff",
            }}
            onPress={takePhoto}
          >
            <FontAwesome
              name="camera"
              size={24}
              color={state.photo ? "#fff" : "#BDBDBD"}
            />
          </TouchableOpacity>
        </Camera>
        <Text style={styles.image_load_title}>Загрузите фото</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.input_wrap}>
          <TextInput
            style={styles.input}
            placeholder="Название..."
            placeholderTextColor="#BDBDBD"
            value={state.title}
            onChangeText={(value) =>
              dispatch({
                type: "add input",
                field: "title",
                payload: value,
              })
            }
          />
        </View>
        <View>
          <TextInput
            style={styles.input_location}
            placeholder="Местность..."
            placeholderTextColor="#BDBDBD"
          />
          <SimpleLineIcons
            style={styles.local_icon}
            name="location-pin"
            size={24}
            color="#BDBDBD"
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.submit_btn,
            backgroundColor: state.photo ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendPhoto}
          disabled={state.photo ? false : true}
        >
          <Text
            style={{
              ...styles.submit_btn_title,
              color: state.photo ? "#fff" : "#BDBDBD",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
  },
  camera_wrap: {
    position: "relative",
    height: 240,
    // borderWidth: 1,
    borderRadius: 20,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image_wrap: {
    position: "absolute",
    top: 0,
    left: 0,

    // backgroundColor: "#F6F6F6",
    // borderRadius: 8,
    // borderColor: "#fff",
    // borderWidth: 1,
  },
  photo_wrap: {
    width: 60,
    height: 60,
    backgroundColor: "#000",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  add_photo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  image_load_title: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  image_add_wrap: {
    marginBottom: 32,
  },
  input_wrap: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  input_location: {
    position: "relative",
    paddingLeft: 28,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  form: {},
  submit_btn: {
    marginTop: 32,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  submit_btn_title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  local_icon: {
    position: "absolute",
    left: 0,
    top: 13,
    width: 24,
    height: 24,
  },
});

export default CreatePostsScreen;
