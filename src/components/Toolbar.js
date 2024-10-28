import React, {useEffect} from "react";
import {autorun} from "mobx"
import store, {undoManager} from "../stores/MainStore";
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
        store.saveToLocalStorage();
    };

    const deleteBox = () => {
        store.deleteBox();
        store.deletedToLocalStorage();

    };

    const undo = () => undoManager.canUndo && undoManager.undo();
    const redo = () => undoManager.canRedo && undoManager.redo();

    const changeColor = (event) => {
        store.changeColor(event.target.value);
    };
    return (
        <div className="toolbar"  style={{
            display: "flex",
            flexDirection:'row',
            justifyContent: "center",
            padding: "10px",
            columnGap: "10px",
            width: "100%",
        }}>
            <button onClick={addNewBox}>Add Box</button>
            <button onClick={deleteBox}>Remove Box</button>
            <input onChange={changeColor} type="color"/>
            <button onClick={undo} disabled={!undoManager.canUndo}>Undo</button>
            <button onClick={redo} disabled={!undoManager.canRedo}>Redo</button>
            <span>Box selected = {count} </span>
        </div>
    );
}

export default Toolbar;
