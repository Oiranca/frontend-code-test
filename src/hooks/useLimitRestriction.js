import {useEffect, useRef, useState} from "react";

export const useLimitRestriction = () => {
    const elementRef = useRef(null);
    const [limits, setLimits] = useState({left: 0, top: 0});
    useEffect(() => {
        const parentLimitRestriction = elementRef.current.parentNode.querySelector('.canva').getBoundingClientRect();

        setLimits({left: Math.floor(parentLimitRestriction.width), top: Math.floor(parentLimitRestriction.height)});
    }, []);

    return {elementRef, limits};

};