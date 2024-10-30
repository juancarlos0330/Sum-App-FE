import React from "react";
import { Image, View, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/image/loading.gif")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
});

export default Loading;
