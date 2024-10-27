import React, {useRef, useEffect} from "react";
import {observer} from "mobx-react";
import interact from "interactjs";

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
                    }
                }
            });
        }
    }, [props.left, props.top]);


    return (
        <div
            id={props.id}
            ref={elementRef}
            className="box"
            style={{
                backgroundColor: props.color,
                width: props.width,
                height: props.height,
                transform: `translate(${props.left}px, ${props.top}px)`,
                border: props.box.isSelected ? "3px inset #beff33" : "none"
            }}
            onClick={props.onSelect}
        >
            {props.children}
        </div>
    );
}

export default observer(BoxDraggable);
