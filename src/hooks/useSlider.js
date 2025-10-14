import { useState, useEffect, useCallback } from "react";

export const useSlider = (dataLength) => {
    const [index, setIndex] = useState(0);

    const next = useCallback(() => {
        setIndex((prev) => Math.min(prev + 1, dataLength - 1));
    }, [dataLength]);

    const prev = useCallback(() => {
        setIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const goto = useCallback((i) => {
        setIndex(i);
    }, []);

    // Lắng nghe phím mũi tên
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keyup", handleKey);
        return () => window.removeEventListener("keyup", handleKey);
    }, [next, prev]);

    return { index, next, prev, goto };
};