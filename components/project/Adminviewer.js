import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

const Adminviewer = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>Welcome Admin</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionview}>
          <TouchableOpacity
            style={styles.sectionitem}
            onPress={() => props.setpageflagfunc("adminviewprojects")}
          >
            <FontAwesome name="folder-open" size={70} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.sectiontext}>View Projects</Text>
        </View>
        <View style={styles.sectionview}>
          <TouchableOpacity
            style={styles.sectionitem}
            onPress={() => props.setpageflagfunc("addproject")}
          >
            <FontAwesome name="plus" size={70} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.sectiontext}>Add Project</Text>
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
  section: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  sectionview: {
    alignItems: "center",
  },
  sectionitem: {
    backgroundColor: "#0071bc",
    width: 130,
    height: 130,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sectiontext: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Adminviewer);
