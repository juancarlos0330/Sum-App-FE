import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Header = (props) => {
  const userlogoutfunc = () => {
    props.logoutUser();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.setadminpageflagfunc("adminview")}
        >
          <FontAwesome name="bars" size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setpageflagfunc("viewproject")}>
          <MaterialIcons
            name="workspaces-filled"
            size={36}
            color="#fff"
            style={{ transform: [{ rotateX: "180deg" }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => userlogoutfunc()}>
          <FontAwesome name="gear" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#0071bc",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
});

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
