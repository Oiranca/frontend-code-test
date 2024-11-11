import React, {useEffect} from "react";
import './toolbar.css';
import {autorun} from "mobx"
import store, {undoManager} from "../../stores/MainStore";
import getRandomColor from "../../utils/getRandomColor";
import uuid from "uuid/v4";
import {useLimitRestriction} from "../../hooks/useLimitRestriction";

function Toolbar() {
    const [count, setCount] = React.useState(0);
    const {limits, elementRef} = useLimitRestriction();
    const undo = () => undoManager.canUndo && undoManager.undo();
    const redo = () => undoManager.canRedo && undoManager.redo();

    useEffect(() => {
        autorun(() => {
            const selectedBoxes = store.selectedBoxesCount;
            setCount(selectedBoxes);
        });
    }, []);

    const addNewBox = () => {
        const newBox = {
            id: uuid(),
            color: getRandomColor(),
            left: Math.floor(Math.random() * (limits.left - 200)),
            top: Math.floor(Math.random() * (limits.top - 100)),
        };
        store.addBox(newBox);
    };

    const deleteBox = () => {
        store.deleteBox();
    };


    const changeColor = (event) => {
        store.changeColor(event.target.value);
    };
    return (
        <div className="toolbar" ref={elementRef}>
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
