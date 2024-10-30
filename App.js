import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import Home from "./components";
import configureStore from "./components/configureStore";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Home />
      <StatusBar style="auto" />
    </Provider>
  );
};

export default App;
