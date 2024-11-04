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
                        endOnly: true
                    })
                ],
                listeners: {
                    move: event => {
                        if (elementRef.current.classList.contains("selected")) {
                            store.moveSelectedBoxes(event.dx, event.dy, elementRef);
                        } else {

                            store.moveBox(event, position);
                        }

                    }
                }
            });
        }
    }, [props.left, props.top]);

    useEffect(() => {
        const parentNode = elementRef.current?.parentNode;
        if (!parentNode) return;
        const resizeObserver = new ResizeObserver(parent => {
            store.repositionChild(parent);

        });
        resizeObserver.observe(parentNode);

        return () => resizeObserver.disconnect();
    }, []);

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
