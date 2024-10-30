import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Register = (props) => {
  const [authflag, setAuthflag] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const signfunc = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      password2,
      flag: authflag,
    };
    props.registerUser(userData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logintitle}>
        <Text style={styles.logintitletext}>Register</Text>
      </View>
      <View style={styles.section}>
        <View style={authflag ? styles.sectionviewact : styles.sectionview}>
          <TouchableOpacity
            style={styles.sectionitem}
            onPress={() => setAuthflag(true)}
          >
            <FontAwesome name="user-secret" size={70} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.sectiontext}>Admin</Text>
        </View>
        <View style={authflag ? styles.sectionview : styles.sectionviewact}>
          <TouchableOpacity
            style={styles.sectionitem}
            onPress={() => setAuthflag(false)}
          >
            <FontAwesome name="user" size={70} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.sectiontext}>User</Text>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={styles.inputview}>
          <Text style={styles.inputtext}>Email</Text>
          <TextInput
            style={
              props.errors.email ? styles.ErrorTextInput : styles.TextInput
            }
            onChangeText={(e) => setEmail(e)}
          />
          {props.errors.email && (
            <Text style={styles.errortext}>{props.errors.email}</Text>
          )}
        </View>
        <View style={styles.inputview}>
          <Text style={styles.inputtext}>Password</Text>
          <TextInput
            style={
              props.errors.password ? styles.ErrorTextInput : styles.TextInput
            }
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
          {props.errors.password && (
            <Text style={styles.errortext}>{props.errors.password}</Text>
          )}
        </View>
        <View style={styles.inputview}>
          <Text style={styles.inputtext}>Repeat Password</Text>
          <TextInput
            style={
              props.errors.password2 ? styles.ErrorTextInput : styles.TextInput
            }
            secureTextEntry={true}
            onChangeText={(e) => setPassword2(e)}
          />
          {props.errors.password2 && (
            <Text style={styles.errortext}>{props.errors.password2}</Text>
          )}
        </View>
        <View style={styles.inputview}>
          <TouchableOpacity onPress={() => props.signflagfunc(true)}>
            <Text style={styles.linktext}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputview}>
          <TouchableOpacity style={styles.loginbtn} onPress={signfunc}>
            <Text style={styles.loginbtntext}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollview: {
    flex: 1,
  },
  logintitle: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logintitletext: {
    fontSize: 35,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionitem: {
    backgroundColor: "#0071bc",
    width: 130,
    height: 130,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionview: {
    opacity: 0.4,
    alignItems: "center",
  },
  sectionviewact: {
    opacity: 1,
    alignItems: "center",
  },
  sectiontext: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: "bold",
    paddingVertical: 3,
  },
  inputview: {
    marginVertical: 15,
  },
  inputtext: {
    fontSize: 20,
    color: "#141414",
  },
  errortext: {
    fontSize: 14,
    color: "red",
  },
  TextInput: {
    paddingVertical: 12,
    marginVertical: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#000",
  },
  ErrorTextInput: {
    paddingVertical: 12,
    marginVertical: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "red",
  },
  linktext: {
    fontWeight: "bold",
    textDecorationStyle: "double",
    textDecorationColor: "#000",
    textDecorationLine: "underline",
    fontSize: 20,
  },
  loginbtn: {
    backgroundColor: "#0071bc",
    borderRadius: 10,
    paddingVertical: 20,
  },
  loginbtntext: {
    fontSize: 20,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
