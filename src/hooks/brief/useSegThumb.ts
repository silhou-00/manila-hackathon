// Position of the sliding thumb behind a segmented control. Re-measures when the value changes
// and when the control is resized or revealed (it can start hidden inside the List view).

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export function useSegThumb(value: string) {
    const groupRef = useRef<HTMLDivElement>(null);
    const placed = useRef(false);
    const [thumb, setThumb] = useState({ x: 0, w: 0, animate: false });

    const place = useCallback((animate: boolean) => {
        const on = groupRef.current?.querySelector<HTMLElement>('[aria-checked="true"]');

        if (!on || !on.offsetWidth) {
            return;
        }

        placed.current = true;
        setThumb((prev) => (prev.x === on.offsetLeft && prev.w === on.offsetWidth && prev.animate === animate ? prev : { x: on.offsetLeft, w: on.offsetWidth, animate }));
    }, []);

    useLayoutEffect(() => {
        place(placed.current);
    }, [value, place]);

    useEffect(() => {
        const el = groupRef.current;

        if (!el) {
            return;
        }

        const observer = new ResizeObserver(() => {
            place(false);
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [place]);

    return { groupRef, thumb };
}
