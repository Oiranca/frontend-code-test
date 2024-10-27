import {types} from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
    .model("MainStore", {
        boxes: types.array(BoxModel)
    })
    .actions(self => {
        return {
            addBox(box) {
                self.boxes.push(box);
            },
            deleteBox() {
                self.boxes.shift();
            },
            changeColor(color) {
                self.boxes.filter(box => box.isSelected === true).forEach(box => {
                    document.getElementById(`${box.id}`).style.backgroundColor = color;
                });
            }
        };
    })
    .views(self => ({get selectedBoxes() {
        return self.boxes.filter(box => box.isSelected === true).length;
    }}));

const store = MainStore.create();

const box1 = BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    left: 0,
    top: 0
});

store.addBox(box1);

export default store;
