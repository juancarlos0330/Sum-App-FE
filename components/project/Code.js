import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addcodeData } from "../actions/projectActions";

const Code = (props) => {
  const [verifycode, setVerifycode] = useState("");
  const [verifystatus, setVerifystatus] = useState(true);

  const setcodetext = (e) => {
    setVerifycode(e);
  };

  const addwithcodefunc = async () => {
    if (verifycode === "") {
      setVerifystatus(false);
      if (Platform.OS === "android") {
        ToastAndroid.show("Please input code!", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("Please input code!");
      }
    } else {
      const paramData = {
        id: props.projectid,
        code: verifycode,
      };
      await props.addcodeData(paramData);
      setVerifystatus(true);
      if (Platform.OS === "android") {
        ToastAndroid.show("Upload Success!", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("Upload Success!");
      }
      props.setpageflagfunc("addproject");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>Add Project</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Add a project by typing the code you received:
        </Text>
      </View>
      <View style={styles.addbtnview}>
        <Text style={styles.codetext}>Code</Text>
        <TextInput
          style={verifystatus ? styles.TextInput : styles.errTextInput}
          onChangeText={setcodetext}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.addbtns}
          onPress={() => addwithcodefunc()}
        >
          <Text style={styles.addbtnstext}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  title: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titletext: {
    fontSize: 35,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    letterSpacing: 1,
  },
  addbtnview: {
    marginVertical: 30,
  },
  TextInput: {
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#000",
    width: "30%",
  },
  errTextInput: {
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "red",
    width: "30%",
  },
  codetext: {
    fontSize: 20,
  },
  addbtns: {
    backgroundColor: "#0071bc",
    paddingVertical: 15,
    borderRadius: 10,
  },
  addbtnstext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

Code.propTypes = {
  addcodeData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addcodeData })(Code);
