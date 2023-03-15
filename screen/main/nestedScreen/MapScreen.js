import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
function MapScreen({ route }) {
  console.log("Map route ", route);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: route.params.longitude,
          latitude: route.params.latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
