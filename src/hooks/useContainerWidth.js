import { useState, useEffect } from "react";

export const useContainerWidth = (ref) => {
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (ref.current) {
                setContainerWidth(ref.current.clientWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return containerWidth;
};