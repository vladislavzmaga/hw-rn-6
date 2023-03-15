import { useState, useEffect, useReducer, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import formReducer from "../../../reducers/formReducer";
const initialState = {
  email: "",
  password: "",
  emailInput: "#E8E8E8",
  passwordInput: "#E8E8E8",
};
import { IsLoginContext } from "../../../App";
export default function LoginScreen({ navigation }) {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [openPass, setOpenPass] = useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const setIsLogin = useContext(IsLoginContext);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  function onFormSubmit() {
    Keyboard.dismiss();
    console.log({ email: formState.email, password: formState.password });
    dispatch({
      type: "refresh user data",
      payload: initialState,
    });
    setIsLogin(true);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bg_image}
          source={require("../../../assets/images/BG.png")}
        >
          {/* <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
          <View style={styles.login_wrap}>
            <View style={styles.login_title_wrap}>
              <Text style={styles.login_enter}>Войти</Text>
            </View>
            <View style={styles.input_wrap}>
              <TextInput
                style={{ ...styles.input, borderColor: formState.emailInput }}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                value={formState.email}
                onFocus={() => {
                  dispatch({
                    type: "input focus",
                    field: "emailInput",
                    payload: "#FF6C00",
                  });
                }}
                onBlur={() =>
                  dispatch({
                    type: "input focus",
                    field: "emailInput",
                    payload: "#E8E8E8",
                  })
                }
                onChangeText={(value) => {
                  dispatch({
                    type: "add input",
                    field: "email",
                    payload: value,
                  });
                }}
              />
            </View>
            <View style={{ marginBottom: isKeyboardOpen ? 32 : 43 }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: formState.passwordInput,
                }}
                placeholder="Пароль"
                secureTextEntry={formState.showPassword}
                placeholderTextColor="#BDBDBD"
                value={formState.password}
                onFocus={() => {
                  dispatch({
                    type: "input focus",
                    field: "passwordInput",
                    payload: "#FF6C00",
                  });
                }}
                onBlur={() =>
                  dispatch({
                    type: "input focus",
                    field: "passwordInput",
                    payload: "#E8E8E8",
                  })
                }
                onChangeText={(value) => {
                  dispatch({
                    type: "add input",
                    field: "password",
                    payload: value,
                  });
                }}
              />
              <TouchableOpacity
                style={styles.show_btn}
                onPress={() => {
                  setOpenPass(openPass ? false : true);
                }}
              >
                <Text style={styles.show_btn_title}>Показать</Text>
              </TouchableOpacity>
            </View>

            {!isKeyboardOpen && (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.sbm_btn}
                  onPress={() => {
                    onFormSubmit();
                  }}
                >
                  <Text style={styles.sbm_title}>Войти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.registr_link,
                  }}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.registr_link_title}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bg_image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  login_wrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontWeight: "400",
  },
  login_title_wrap: {
    alignItems: "center",
    marginBottom: 33,
  },
  login_enter: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.01,
    lineHeight: 35,
  },
  input: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  input_wrap: {
    marginBottom: 16,
  },
  show_btn: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  show_btn_title: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  sbm_btn: {
    backgroundColor: "#FF6C00",
    padding: 16,
    alignItems: "center",
    borderRadius: 100,
    marginBottom: 16,
  },
  sbm_title: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  password_wrap: {
    marginBottom: 43,
  },
  registr_link: {
    alignItems: "center",
    marginBottom: 130,
  },
  registr_link_title: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
