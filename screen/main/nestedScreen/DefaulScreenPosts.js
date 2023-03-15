import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    route.params && setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);
  return (
    <View style={styles.container}>
      <View style={styles.user_data}>
        <Image
          style={styles.user_img}
          source={require("../../../assets/images/User.jpg")}
        />
        <View style={styles.user_info}>
          <Text style={styles.user_name}>Natali Romanova</Text>
          <Text style={styles.user_email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          console.log("list item", item.location);
          return (
            <View style={{ marginBottom: 32 }}>
              <Image
                source={{ uri: item.photo }}
                style={{ height: 200, marginBottom: 8 }}
              />
              <Text style={styles.item_name}>{item.title}</Text>
              <View style={styles.item_wrap}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  <Text style={styles.comment_title}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("Map", { ...item.location })
                  }
                >
                  <SimpleLineIcons
                    style={styles.local_icon}
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.item_map_title}>Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
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
  item_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  comment_title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  item_name: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  item_map_title: {
    color: "#212121",
    lineHeight: 19,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});

export default DefaultPostsScreen;
