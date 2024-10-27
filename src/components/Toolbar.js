import React from "react";
import store from "../stores/MainStore";
import getRandomColor from "../utils/getRandomColor";
import uuid from "uuid/v4";

function Toolbar() {
    const addNewBox = () => {
        store.addBox({id: uuid(), color: getRandomColor(), left: 200, top: 50});
    };

    const deleteBox = () => {
        store.deleteBox();

    };

    const changeColor = (event) => {
        store.changeColor(event.target.value);
    };

    return (
        <div className="toolbar">
            <button onClick={addNewBox}>Add Box</button>
            <button onClick={deleteBox}>Remove Box</button>
            <input onChange={changeColor} type="color"/>
            <span>No boxes selected</span>
        </div>
    );
}

export default Toolbar;
