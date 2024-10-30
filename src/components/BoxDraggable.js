import React, {useRef, useEffect} from "react";
import {observer} from "mobx-react";
import interact from "interactjs";
import store from "../stores/MainStore";

function BoxDraggable(props) {
    const elementRef = useRef(null);

    useEffect(() => {
        const position = {x: props.left, y: props.top};

        if (elementRef.current) {
            interact(elementRef.current).draggable({
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                    })
                ],
                listeners: {
                    move: event => {
                        position.x += event.dx
                        position.y += event.dy

                        event.target.style.transform =
                            `translate(${position.x}px, ${position.y}px)`

                        if (elementRef.current.classList.contains("selected")) {
                            store.moveSelectedBoxes(event.dx, event.dy,elementRef);
                        }

                    }
                }
            });
        }
    }, [props.left, props.top]);


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
                border: props.isSelected ? "3px inset #beff33" : "none"
            }}
            onClick={props.onSelect}
        >
            {props.children}
        </div>
    );
}

export default observer(BoxDraggable);
