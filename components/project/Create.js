import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import csv from "csvtojson";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { addData } from "./../actions/projectActions";

const Create = (props) => {
  const [loading, setLoading] = useState(false);

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
                  };
                  setLoading(false);
                  props.setprojectidfunc(res.data._id);
                  await props.addData(paramData);
                  props.setpageflagfunc("addprojectcode");
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

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>Upload Project</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Select an Excel document from your device:
        </Text>
      </View>
      <View style={styles.addbtnview}>
        <TouchableOpacity style={styles.addbtn} onPress={pickDocument}>
          {loading ? (
            <Image
              source={require("../../assets/image/loading.gif")}
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <FontAwesome name="upload" size={40} color="#fff" />
          )}
          <Text style={styles.addtext}>Add a file</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  addbtn: {
    backgroundColor: "#0071bc",
    flexDirection: "row",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  addtext: {
    marginLeft: 40,
    fontSize: 24,
    color: "#fff",
    letterSpacing: 1,
  },
});

Create.propTypes = {
  addData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.data,
  auth: state.auth,
});

export default connect(mapStateToProps, { addData })(Create);
