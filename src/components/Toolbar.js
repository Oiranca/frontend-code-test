import React, {useEffect, useRef, useState} from "react";
import {autorun} from "mobx"
import store, {undoManager} from "../stores/MainStore";
import getRandomColor from "../utils/getRandomColor";
import uuid from "uuid/v4";

function Toolbar() {
    const [count, setCount] = React.useState(0);
    const elementRef = useRef(null);
    const [leftLimit, setLeftLimit] = useState(0);
    const [topLimit, setTopLimit] = useState(0);
    useEffect(() => {
        const limitRestriction = elementRef.current.parentNode.querySelector('.canva').getBoundingClientRect();
        const leftLimit = Math.floor(limitRestriction.width);
        setLeftLimit(leftLimit);
        const topLimit = Math.floor(limitRestriction.height);
        setTopLimit(topLimit);
        autorun(() => {
            const selectedBoxes = store.selectedBoxes;
            setCount(selectedBoxes);
        });
    }, []);

    const addNewBox = () => {
        store.addBox({
            id: uuid(), color: getRandomColor(), left: Math.floor(Math.random() * (leftLimit - 200)),
            top: Math.floor(Math.random() * (topLimit - 100)),
        });
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
