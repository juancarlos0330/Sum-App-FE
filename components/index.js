import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import Header from "./Layout/Header";
import Main from "./Main";
import Loading from "./Loading";
import Sign from "./Sign";
import Admin from "./Admin";

const Home = (props) => {
  const [pageflag, setPageflag] = useState("viewproject");
  const [adminpageflag, setAdminpageflag] = useState("adminview");

  const setpageflagfunc = (flag) => {
    setPageflag(flag);
  };

  const setadminpageflagfunc = (flag) => {
    setAdminpageflag(flag);
  };

  return (
    <View style={styles.allcontainer}>
      <View style={styles.container}>
        <Header
          setpageflagfunc={setpageflagfunc}
          setadminpageflagfunc={setadminpageflagfunc}
        />
        <View style={styles.main}>
          <ScrollView style={styles.scrollview}>
            <View style={styles.sections}>
              {props.auth.isAuthenticated ? (
                props.auth.user.flag ? (
                  <Admin
                    pageflag={adminpageflag}
                    setadminpageflagfunc={setadminpageflagfunc}
                  />
                ) : (
                  <Main pageflag={pageflag} setpageflagfunc={setpageflagfunc} />
                )
              ) : (
                <Sign />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {props.loading.loading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
  sections: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  loading: state.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Home);
