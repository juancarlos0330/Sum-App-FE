import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "./project/List";
import Viewer from "./project/Viewer";
import Detail from "./project/Detail";
import Roomdetail from "./project/Roomdetail";
import Downproject from "./project/Downproject";
import Downroomproject from "./project/Downroomproject";

const Main = (props) => {
  const [verifycode, setVerifycode] = useState("");

  const setverifycodefunc = (code) => {
    setVerifycode(code);
  };

  return (
    <View style={styles.container}>
      {props.pageflag === "viewproject" ? (
        <Viewer
          setpageflagfunc={props.setpageflagfunc}
          setverifycodefunc={setverifycodefunc}
        />
      ) : props.pageflag === "listproject" ? (
        <List
          verifycodes={verifycode}
          setpageflagfunc={props.setpageflagfunc}
        />
      ) : props.pageflag === "detailproject" ? (
        <Detail setpageflagfunc={props.setpageflagfunc} />
      ) : props.pageflag === "roomdetailproject" ? (
        <Roomdetail setpageflagfunc={props.setpageflagfunc} />
      ) : props.pageflag === "downloadproject" ? (
        <Downproject setpageflagfunc={props.setpageflagfunc} />
      ) : props.pageflag === "downloadroomproject" ? (
        <Downroomproject setpageflagfunc={props.setpageflagfunc} />
      ) : (
        <Viewer setpageflagfunc={props.setpageflagfunc} />
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Main);
