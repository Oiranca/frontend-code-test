import {types} from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";
import {UndoManager} from "mst-middlewares";

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
            },
            deleteBox() {
                self.boxes.shift();
            },
            changeColor(color) {
                const data = localStorage.getItem('boxes');

                self.boxes.filter(box => box.isSelected === true).forEach(box => {
                    document.getElementById(`${box.id}`).style.backgroundColor = color;
                    if (data) {
                        const boxes = JSON.parse(data);
                        const index = boxes.findIndex((item) => item.id === box.id);
                        boxes[index].color = color;
                        localStorage.setItem('boxes', JSON.stringify(boxes));
                    }

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
            }
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
