import React, {useEffect} from "react";
import {autorun} from "mobx"
import store from "../stores/MainStore";
import getRandomColor from "../utils/getRandomColor";
import uuid from "uuid/v4";

function Toolbar() {
    const [count, setCount] = React.useState(0);
    useEffect(() => {

        autorun(() => {
            const selectedBoxes = store.selectedBoxes;
            setCount(selectedBoxes);
        });
    }, []);

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
            <span>Box selected = {count} </span>
        </div>
    );
}

export default Toolbar;
