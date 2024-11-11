import {applySnapshot, getSnapshot, onSnapshot, types} from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";
import {UndoManager} from "mst-middlewares";


const getSelectedBoxes = self => self.boxes.filter(box => box.isSelected === true);

const MainStore = types
    .model("MainStore", {
        boxes: types.array(BoxModel),
    })
    .actions(self => {
        setUndoManager(self);
        return {
            addBox(box) {
                self.boxes.push(box);
            },
            deleteBox() {
                self.boxes.shift();

            }, toggleSelected(id) {
                self.boxes.filter(box => box.id === id).forEach(box => {
                    box.isSelected = !box.isSelected;

                });
            },
            changeColor(color) {
                getSelectedBoxes(self).forEach(box => {
                    box.color = color;

                });
            },
            moveBox(position, id) {
                const box = self.boxes.find(box => box.id === id);
                if (box) {
                    box.left = position.x;
                    box.top = position.y;
                }

            },
            moveSelectedBoxes(dx, dy, elementRef) {
                const limitRestriction = elementRef.current.parentNode.getBoundingClientRect();

                const newPositions = box => {
                    const positionLeft = Math.floor(Math.min(
                        Math.max(box.left + dx, 0),
                        limitRestriction.width - box.width)
                    );
                    const positionTop = Math.floor(Math.min(
                        Math.max(box.top + dy, 0),
                        limitRestriction.height - box.height
                    ));
                    return {positionLeft, positionTop};
                };

                getSelectedBoxes(self).forEach(box => {
                    const {positionLeft, positionTop} = newPositions(box);
                    box.left = positionLeft;
                    box.top = positionTop;

                });

            },
            repositionChild(parent) {
                for (let entry of parent) {
                    const newWidth = entry.contentRect.width;
                    const newHeight = entry.contentRect.height;

                    self.boxes.forEach(box => {
                        box.left = Math.floor(Math.min(Math.max(box.left, 0), newWidth - box.width));
                        box.top = Math.floor(Math.min(Math.max(box.top, 0), newHeight - box.height));
                    });
                }

            },
            saveToLocalStorage() {
                const data = getSnapshot(self.boxes);
                localStorage.setItem('boxes', JSON.stringify(data));
            },
            loadFromLocalStorage() {
                const data = localStorage.getItem('boxes');
                if (data) {
                    applySnapshot(self.boxes, JSON.parse(data));
                }
            },


        };
    })
    .views(self => ({
        get selectedBoxesCount() {
            return getSelectedBoxes(self).length;
        }
    }));
export let undoManager = {};
export const setUndoManager = (targetStore) => {
    undoManager = UndoManager.create({}, {targetStore, maxHistoryLength: 50, includeHooks: true});
};
const store = MainStore.create();

onSnapshot(store, snapshot => {
    localStorage.setItem('boxes', JSON.stringify(snapshot.boxes));
});

store.loadFromLocalStorage();
const createInitialBox = () => BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    left: 0,
    top: 0
});

if (store.boxes.length === 0) {
    const initialBox = createInitialBox()
    store.addBox(initialBox);
}


export default store;
