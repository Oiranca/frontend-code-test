import {types} from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";
import {UndoManager} from "mst-middlewares";
import {autorun} from "mobx";


const MainStore = types
    .model("MainStore", {
        boxes: types.array(BoxModel),
        history: types.optional(UndoManager, {}),
    })
    .actions(self => {
        setUndoManager(self);
        return {
            addBox(box) {
                self.boxes.push(box);
                store.saveToLocalStorage();
            },
            deleteBox() {
                self.boxes.shift();
                store.deletedToLocalStorage();
            },
            changeColor(color) {
                store.isSelected().forEach(box => {
                    box.color = color;
                    store.saveChanges(box);

                });
            },
            moveSelectedBoxes(dx, dy, elementRef) {
                const limitRestriction = elementRef.current.parentNode.getBoundingClientRect();

                const newPositions = box => {
                    const positionLeft = Math.min(
                        Math.max(box.left + dx, 0),
                        limitRestriction.width - box.width
                    );
                    const positionTop = Math.min(
                        Math.max(box.top + dy, 0),
                        limitRestriction.height - box.height
                    );
                    return {positionLeft, positionTop};
                };

                store.isSelected().forEach(box => {
                    const {positionLeft, positionTop} = newPositions(box);
                    box.left = positionLeft;
                    box.top = positionTop;
                    store.saveChanges(box);

                });

            },
            saveToLocalStorage() {
                localStorage.setItem('boxes', JSON.stringify(self.boxes));
            },
            deletedToLocalStorage() {
                const data = localStorage.getItem('boxes');
                if (data) {
                    const boxes = JSON.parse(data);
                    boxes.shift();
                    localStorage.setItem('boxes', JSON.stringify(boxes));
                }
            },
            loadFromLocalStorage() {
                const data = localStorage.getItem('boxes');
                if (data) {
                    const boxes = JSON.parse(data);
                    self.boxes.replace(boxes);
                }
            },
            saveChanges(box) {
                const data = localStorage.getItem('boxes');
                if (data) {
                    const boxes = JSON.parse(data);
                    const index = boxes.findIndex((item) => item.id === box.id);
                    if (index > -1) {
                        Object.assign(boxes[index], box);
                        localStorage.setItem('boxes', JSON.stringify(boxes));
                    }
                }
            },
            isSelected() {
                return self.boxes.filter(box => box.isSelected === true)
            },

        };
    })
    .views(self => ({
        get selectedBoxes() {
            return self.boxes.filter(box => box.isSelected === true).length;
        }
    }));

export let undoManager = {};
export const setUndoManager = (targetStore) => {
    undoManager = targetStore.history;
};
const store = MainStore.create({}, {maxHistoryLength: 10});


store.loadFromLocalStorage();

if (store.boxes.length === 0) {
    const box1 = BoxModel.create({
        id: uuid(),
        color: getRandomColor(),
        left: 0,
        top: 0
    });

    store.addBox(box1);
    store.saveToLocalStorage();
}


export default store;
