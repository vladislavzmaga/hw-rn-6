import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { IsLoginContext } from "../../../App";
const ProfileScreen = () => {
  const window = useWindowDimensions().width;
  const setIsLogin = useContext(IsLoginContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg_image}
        source={require("../../../assets/images/BG.png")}
      >
        <View style={styles.content_wrap}>
          <View style={{ ...styles.profile_img_wrap, left: window / 2 - 60 }}>
            <Image
              style={styles.profile_img}
              source={require("../../../assets/images/User.jpg")}
            />
            <TouchableOpacity style={styles.add_user_photo}>
              <AntDesign
                style={styles.icon_delete}
                name="close"
                size={15}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.icon_logout_wrap}
            onPress={() => setIsLogin(false)}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.profile_title_wrap}>
            <Text style={styles.profile_title}>User Name</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg_image: {
    flex: 1,
    resizeMode: "cover",
  },
  content_wrap: {
    position: "relative",
    marginTop: 147,
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  icon_logout_wrap: {
    marginTop: 22,
    alignItems: "flex-end",
  },

  add_user_photo: {
    position: "absolute",
    right: -12,
    bottom: 14,
    backgroundColor: "#FFF",
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  icon_delete: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  profile_img_wrap: {
    position: "absolute",
    top: -60,
  },
  profile_img: {
    borderRadius: 16,
    height: 120,
    width: 120,
  },
  profile_title_wrap: {
    marginTop: 46,
    alignItems: "center",
    marginBottom: 32,
  },
  profile_title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
});

export default ProfileScreen;
