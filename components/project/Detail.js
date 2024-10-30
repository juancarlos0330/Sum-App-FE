import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getRoomdetaildata } from "../actions/projectActions";
import isEmpty from "./../../is-empty";

const Detail = (props) => {
  const [result, setResult] = useState([]);
  const [title, setTitle] = useState("");
  const [projectid, setProjectid] = useState("");

  useEffect(() => {
    setProjectid(isEmpty(props.projectdetail) ? "" : props.projectdetail._id);
    setResult(isEmpty(props.projectdetail) ? [] : props.projectdetail.datas);
    setTitle(
      isEmpty(props.projectdetail)
        ? "No Title"
        : props.projectdetail.filename + " " + props.projectdetail.datas.length
    );
  }, [props.projectdetail]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.subtitletext}>Your projects</Text>
        <Text style={styles.titletext}>{title}</Text>
      </View>
      <View>
        <View style={styles.tableheader}>
          <View style={styles.tabletr}>
            <Text style={styles.tabletrtext}>Rooms:</Text>
          </View>
          <View style={styles.tabletr}>
            <Text style={styles.tabletrtext}>Status:</Text>
          </View>
          <View style={styles.tabletr2}></View>
        </View>
        {isEmpty(result) ? (
          <View>
            <Text style={{ textAlign: "center" }}>No Data</Text>
          </View>
        ) : (
          result.map((item, key) => {
            return (
              <View style={styles.tablecontent} key={key}>
                <View style={styles.tabletd}>
                  <Text style={styles.tabletdtext}>Room {item.room}</Text>
                </View>
                <View
                  style={
                    item.status === 0
                      ? styles.tabletdtodo1
                      : item.status === 1
                      ? styles.tabletdrun1
                      : styles.tabletdcom1
                  }
                >
                  <Text style={styles.tabletdtext1}>
                    {item.status === 0
                      ? "Not done"
                      : item.status === 1
                      ? "Partial"
                      : "Completed"}
                  </Text>
                </View>
                {item.status === 2 ? (
                  <TouchableOpacity
                    style={styles.tabletd2}
                    onPress={() => props.setpageflagfunc("downloadroomproject")}
                  >
                    <FontAwesome name="edit" size={40} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.tabletd2}
                    onPress={() => {
                      props.getRoomdetaildata({
                        pid: projectid,
                        dataid: item._id,
                      });
                      props.setpageflagfunc("roomdetailproject");
                    }}
                  >
                    <FontAwesome name="edit" size={40} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
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
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  subtitletext: {
    fontSize: 20,
    letterSpacing: 1,
  },
  titletext: {
    fontSize: 35,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  tableheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabletr: {
    flex: 4,
  },
  tabletr2: {
    flex: 2,
  },
  tablecontent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
  },
  tabletd: {
    width: "35%",
    backgroundColor: "#0071bc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 15,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  tabletdcom1: {
    width: "35%",
    marginRight: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#0071bc",
  },
  tabletdrun1: {
    width: "35%",
    marginRight: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#0071bc",
    backgroundColor: "#c9dfee",
  },
  tabletdtodo1: {
    width: "35%",
    marginRight: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#0071bc",
    backgroundColor: "#99c6e4",
  },
  tabletd2: {
    width: "20%",
    borderRadius: 20,
    backgroundColor: "#0071bc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  tabletrtext: {
    fontSize: 20,
    textDecorationColor: "#000",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  tabletdtext: {
    color: "#fff",
    fontSize: 20,
  },
  tabletdtext1: {
    color: "#0071bc",
    fontSize: 20,
  },
});

Detail.propTypes = {
  getRoomdetaildata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projectdetail: state.projectdetail.data,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRoomdetaildata })(Detail);
