import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/auth/LoginScreen/LoginScreen.js";
import RegistrationScreen from "../screen/auth/RegistrationScreen/RegistrationScreen.js";
import Home from "../screen/main/Home.js";
const AuthStack = createStackNavigator();
const Route = ({ isAuth }) => {
  return !isAuth ? (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  ) : (
    <Home />
  );
};

export default Route;
