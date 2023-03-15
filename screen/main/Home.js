import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet } from "react-native";
import PostsScreen from "./mainScreens/PostsScreen.js";
import CreatePostsScreen from "./mainScreens/CreatePostsScreen.js";
import ProfileScreen from "./mainScreens/ProfileScreen";
import { SimpleLineIcons, Feather, AntDesign } from "@expo/vector-icons";
import { IsLoginContext } from "../../App.js";
import { useContext } from "react";
const MainTab = createBottomTabNavigator();

function Home() {
  return (
    <MainTab.Navigator
      inactiveColor="rgba(33, 33, 33, 0.8)"
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 70,
          paddingHorizontal: 82,
          paddingTop: 9,
        },
        tabBarItemStyle: {
          height: 40,
        },
        tabBarActiveTintColor: "#fff",
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#BDBDBD",
        },
        headerTitleAlign: "center",
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="grid" size={20} color={color} />
          ),
          headerShown: false,
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: {
            width: 70,
            height: 40,
            borderRadius: 20,
          },
        }}
        name="Post"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="plus" size={17} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: {
            width: 70,
            height: 40,
            borderRadius: 20,
          },
        }}
        name="Create Post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: {
            width: 70,
            height: 40,
            borderRadius: 20,
          },
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

export default Home;
const styles = StyleSheet.create({
  icon_logout_wrap: {
    marginRight: 16,
  },
});
