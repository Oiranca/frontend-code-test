import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react";
import Box from "./components/Box/Box";
import './canvas.css';

function Canvas({store}) {
    const referent = useRef(null);
    useEffect(() => {
        const canvasReferent = referent.current;
        if (!canvasReferent) return;
        const resizeObserver = new ResizeObserver(parent => {
            store.repositionChild(parent);

        });
        resizeObserver.observe(canvasReferent);

        return () => resizeObserver.disconnect();
    }, [])
    return (
        <div className="canva" ref={referent}>
            {store.boxes.map((box, index) => (
                <Box
                    id={box.id}
                    key={index}
                    color={box.color}
                    left={box.left}
                    top={box.top}
                    width={box.width}
                    height={box.height}
                    box={box}
                    isSelected={box.isSelected}
                />
            ))}
        </div>
    );
}

export default observer(Canvas);
