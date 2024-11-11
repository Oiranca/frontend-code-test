import React from "react";
import './box.css'
import { observer } from "mobx-react";
import BoxDraggable from "./components/BoxDraggable/BoxDraggable";

function Box(props) {
  return (
    <BoxDraggable {...props}>
      <div>Box</div>
    </BoxDraggable>
  );
}

export default observer(Box);
