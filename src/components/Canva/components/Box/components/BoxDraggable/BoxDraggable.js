import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react";
import interact from "interactjs";
import store from "../../../../../../stores/MainStore";

function BoxDraggable(props) {
    const [position, setPosition] = useState({x: props.left, y: props.top});
    const elementRef = useRef(null);
    useEffect(() => {
        setPosition({x: props.left, y: props.top});
    }, [props.left, props.top]);

    useEffect(() => {
        if (elementRef.current) {
            interact(elementRef.current).draggable({
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                    })
                ],
                listeners: {

                    move: event => {
                        if (elementRef.current.classList.contains("selected")) {
                            store.moveSelectedBoxes(event.dx, event.dy, elementRef);
                        } else {
                            setPosition(prevPosition => ({
                                x: prevPosition.x + event.dx,
                                y: prevPosition.y + event.dy
                            }));
                            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                        }

                    },
                    end: event => {
                        store.moveBox(position, event.target.id);


                    },
                }
            });
        }
    }, [position, props.left, props.top]);



    const handledSelectedBox = () => {
        store.isSelected(elementRef.current.id)
    };

    return (
        <div
            id={props.id}
            ref={elementRef}
            className={`box ${props.isSelected ? "selected" : ""}`}
            style={{
                backgroundColor: props.color,
                width: props.width,
                height: props.height,
                transform: `translate(${props.left}px, ${props.top}px)`,
                border: props.isSelected ? "3px inset #beff33" : "none",
            }}
            onClick={handledSelectedBox}
        >
            {props.children}
        </div>
    );
}

export default observer(BoxDraggable);
