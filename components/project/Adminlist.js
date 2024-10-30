import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import isEmpty from "./../../is-empty";
import { getAdminData, getDetailData } from "./../actions/projectActions";

const Adminlist = (props) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    props.getAdminData();
  }, []);

  const getAryfunc = async (data) => {
    var allary = [];
    isEmpty(data)
      ? []
      : await data.map(async (items) => {
          allary.push({
            pid: items._id,
            name: items.filename + " " + items.datas.length,
            status: 2,
          });
        });
    setResult(allary);
  };

  useEffect(() => {
    getAryfunc(props.project);
  }, [props.project]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>All projects</Text>
      </View>
      <View>
        <View style={styles.tableheader}>
          <View style={styles.tabletr}>
            <Text style={styles.tabletrtext}>Projects:</Text>
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
                  <Text style={styles.tabletdtext}>{item.name}</Text>
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
                {item.status !== 2 ? (
                  <TouchableOpacity
                    style={styles.tabletd2}
                    onPress={() => props.setpageflagfunc("downloadproject")}
                  >
                    <FontAwesome name="edit" size={40} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.tabletd2}
                    onPress={() => {
                      props.getDetailData({ id: item.pid });
                      props.setpageflagfunc("admindetailproject");
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
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "flex-start",
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
    width: "35%",
  },
  tabletr2: {
    width: "20%",
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
    paddingHorizontal: 10,
    marginRight: 15,
    justifyContent: "center",
    minHeight: 80,
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

Adminlist.propTypes = {
  getAdminData: PropTypes.func.isRequired,
  getDetailData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.data,
  projectdetail: state.projectdetail.data,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAdminData, getDetailData })(
  Adminlist
);
