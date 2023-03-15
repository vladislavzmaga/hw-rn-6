import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nestedScreen/DefaulScreenPosts";
import MapScreen from "../nestedScreen/MapScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import { Feather } from "@expo/vector-icons";
import { IsLoginContext } from "../../../App";

const NestedScreen = createStackNavigator();
const PostsScreen = ({ route }) => {
  const setIsLogin = useContext(IsLoginContext);
  // const [posts, setPosts] = useState([]);
  // console.log(route);

  // useEffect(() => {
  //   route.params && setPosts((prevState) => [...prevState, route.params]);
  // }, [route.params]);
  // console.log(posts);
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#BDBDBD",
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <NestedScreen.Screen
        name="Posts"
        component={DefaultPostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.icon_logout_wrap}
              onPress={() => setIsLogin(false)}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
    // <View style={styles.container}>
    //   <View style={styles.user_data}>
    //     <Image
    //       style={styles.user_img}
    //       source={require("../../../assets/images/User.jpg")}
    //     />
    //     <View style={styles.user_info}>
    //       <Text style={styles.user_name}>Natali Romanova</Text>
    //       <Text style={styles.user_email}>email@example.com</Text>
    //     </View>
    //   </View>
    //   <FlatList
    //     data={posts}
    //     keyExtractor={(item, i) => i.toString()}
    //     renderItem={({ item }) => (
    //       <View style={{ marginBottom: 10 }}>
    //         <Image source={{ uri: item.photo }} style={{ height: 200 }} />
    //       </View>
    //     )}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  user_img: {
    width: 60,
    height: 60,
  },
  user_data: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  user_info: {
    marginLeft: 8,
  },
  user_name: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  user_email: {
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto-Regular",
  },
});

export default PostsScreen;
