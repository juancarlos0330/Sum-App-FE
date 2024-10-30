import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Sign = (props) => {
  const [signflag, setSignflag] = useState(true);

  const signflagfunc = (flag) => {
    setSignflag(flag);
  };

  return (
    <View style={styles.container}>
      {signflag ? (
        <Login signflagfunc={signflagfunc} />
      ) : (
        <Register signflagfunc={signflagfunc} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Sign;
