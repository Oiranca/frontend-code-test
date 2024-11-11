import React from "react";
import store from "./stores/MainStore";
import Canvas from "./components/Canva/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import { observer } from "mobx-react";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Canvas store={store} />
    </div>
  );
}

export default observer(App);
