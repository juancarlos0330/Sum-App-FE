import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Adminlist from "./project/Adminlist";
import Adminviewer from "./project/Adminviewer";
import Admindetail from "./project/Admindetail";
import Adminroomdetail from "./project/Adminroomdetail";
import Code from "./project/Code";
import Create from "./project/Create";

const Admin = (props) => {
  const [projectid, setProjectid] = useState("");

  const setprojectidfunc = (id) => {
    setProjectid(id);
  };

  return (
    <View style={styles.container}>
      {props.pageflag === "adminview" ? (
        <Adminviewer setpageflagfunc={props.setadminpageflagfunc} />
      ) : props.pageflag === "adminviewprojects" ? (
        <Adminlist setpageflagfunc={props.setadminpageflagfunc} />
      ) : props.pageflag === "admindetailproject" ? (
        <Admindetail setpageflagfunc={props.setadminpageflagfunc} />
      ) : props.pageflag === "adminroomdetailproject" ? (
        <Adminroomdetail setpageflagfunc={props.setadminpageflagfunc} />
      ) : props.pageflag === "addproject" ? (
        <Create
          setprojectidfunc={setprojectidfunc}
          setpageflagfunc={props.setadminpageflagfunc}
        />
      ) : props.pageflag === "addprojectcode" ? (
        <Code
          projectid={projectid}
          setpageflagfunc={props.setadminpageflagfunc}
        />
      ) : (
        <Adminviewer setpageflagfunc={props.setadminpageflagfunc} />
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

export default Admin;
