import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ToastAndroid,
  Platform,
  AlertIOS,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import csv from "csvtojson";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import {
  addData,
  addcodehistory,
  gethistoryData,
} from "./../actions/projectActions";
import isEmpty from "../../is-empty";

const Viewer = (props) => {
  const [sectionflag, setSectionflag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifycode, setVerifycode] = useState("");
  const [textinputstatus, setTextinputstatus] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const paramData = {
      uid: props.auth.user.id,
    };
    props.gethistoryData(paramData);
  }, []);

  useEffect(() => {
    setResult(isEmpty(props.userhistory) ? [] : props.userhistory);
  }, [props.userhistory]);

  const pickDocument = async () => {
    setLoading(true);
    let result = await DocumentPicker.getDocumentAsync({});
    const savesArray = [];

    if (result.type === "success") {
      // set file name without file type
      const filenames = result.name.substr(0, result.name.indexOf(".csv"));

      axios
        .post("http://10.10.11.13:5000/api/projects/savefilename", {
          filename: filenames,
          uid: props.auth.user.id,
        })
        .then((res) => {
          fetch(result.uri)
            .then(async (response) => {
              const resp = await response.text();
              csv({
                noheader: true,
                output: "csv",
              })
                .fromString(resp)
                .then(async (csvRow) => {
                  await csvRow.slice(1).map((item) => {
                    savesArray.push({
                      project: item[0],
                      room: item[1],
                      unit: item[2],
                      airflow1: item[3],
                      airflow2: item[4],
                      airflow3: item[5],
                      min_humidity: item[6],
                      max_humidity: item[7],
                      max_airflow: item[8],
                      boost_timer: item[9],
                      fire_contact: item[10],
                      configuration: item[11],
                      positioning: item[12],
                    });
                  });
                  const paramData = {
                    id: res.data._id,
                    datas: savesArray,
                    uid: props.auth.user.id,
                  };
                  setLoading(false);
                  await props.addData(paramData);
                  if (Platform.OS === "android") {
                    ToastAndroid.show("Upload Success!", ToastAndroid.SHORT);
                  } else {
                    AlertIOS.alert("Upload Success!");
                  }
                });
            })
            .catch((error) => {
              setLoading(false);
              console.error("some error occurred", error);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  };

  const viewprojectfunc = () => {
    setModalVisible(true);
    setTextinputstatus(false);
    setVerifycode("");
  };

  const closemodalfunc = () => {
    setModalVisible(false);
  };

  const changetextfunc = (e) => {
    setVerifycode(e);
  };

  const viewfunc = () => {
    if (verifycode === "") {
      setTextinputstatus(true);
      if (Platform.OS === "android") {
        ToastAndroid.show("Please input code!", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("Please input code!");
      }
    } else {
      setModalVisible(false);
      setTextinputstatus(false);
      props.addcodehistory({ uid: props.auth.user.id, code: verifycode });
      props.setverifycodefunc(verifycode);
      props.setpageflagfunc("listproject");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>Welcome {props.auth.user.email}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionview}>
          <TouchableOpacity
            style={styles.sectionitem}
            onPress={() => viewprojectfunc()}
          >
            <FontAwesome name="folder-open" size={70} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.sectiontext}>View Projects</Text>
        </View>
        {!props.auth.user.flag ? null : sectionflag ? (
          <View style={styles.sectionview}>
            <TouchableOpacity style={styles.sectionitem} onPress={pickDocument}>
              {loading ? (
                <Image
                  source={require("../../assets/image/loading.gif")}
                  style={{ width: 70, height: 70 }}
                />
              ) : (
                <FontAwesome name="upload" size={70} color="#fff" />
              )}
            </TouchableOpacity>
            <Text style={styles.sectiontext}>Upload Project</Text>
          </View>
        ) : (
          <View style={styles.sectionview}>
            <TouchableOpacity
              style={styles.sectionitem}
              onPress={() => setSectionflag(!sectionflag)}
            >
              <FontAwesome name="plus" size={70} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.sectiontext}>Add Project</Text>
          </View>
        )}
      </View>
      <View style={styles.recentsection}>
        <View style={styles.recenttitle}>
          <Text style={styles.recenttitletext}>Recent Code</Text>
        </View>
        <View>
          {isEmpty(result) ? (
            <Text style={{ textAlign: "center" }}>No Data</Text>
          ) : (
            result.map((item, key) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 3,
                  }}
                  key={key}
                >
                  <TouchableOpacity
                    style={{ flex: 2 }}
                    onPress={() => {
                      props.setverifycodefunc(item.code);
                      props.setpageflagfunc("listproject");
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#0071bc" }}>
                      {item.code}
                    </Text>
                  </TouchableOpacity>

                  <View style={{ flex: 3 }}>
                    <Text>
                      {new Date(item.created_date).getFullYear() +
                        "/" +
                        Number(new Date(item.created_date).getMonth() + 1) +
                        "/" +
                        new Date(item.created_date).getDate() +
                        "  " +
                        new Date(item.created_date).getHours() +
                        ":" +
                        new Date(item.created_date).getMinutes() +
                        ":" +
                        new Date(item.created_date).getSeconds()}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalview}>
          <View style={styles.modalmain}>
            <View style={styles.addbtnview}>
              <Text style={styles.codetext}>Code</Text>
              <TextInput
                style={textinputstatus ? styles.errTextInput : styles.TextInput}
                onChangeText={changetextfunc}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.addbtns}
                onPress={() => viewfunc()}
              >
                <Text style={styles.addbtnstext}>VIEW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addbtns}
                onPress={() => closemodalfunc()}
              >
                <Text style={styles.addbtnstext}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalmain: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "90%",
    maxWidth: "90%",
    minWidth: "90%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  TextInput: {
    paddingVertical: 5,
    marginVertical: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#000",
    width: "30%",
    textAlign: "center",
  },
  errTextInput: {
    paddingVertical: 5,
    marginVertical: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "red",
    width: "30%",
    textAlign: "center",
  },
  addbtnview: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  codetext: {
    fontSize: 20,
    marginBottom: 5,
  },
  addbtns: {
    backgroundColor: "#0071bc",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  addbtnstext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  recentsection: {
    flex: 1,
  },
  recenttitle: {
    margin: 20,
    marginTop: 30,
  },
  recenttitletext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

Viewer.propTypes = {
  addData: PropTypes.func.isRequired,
  addcodehistory: PropTypes.func.isRequired,
  gethistoryData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.data,
  userhistory: state.userhistory.data,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addData,
  addcodehistory,
  gethistoryData,
})(Viewer);
