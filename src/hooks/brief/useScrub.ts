// Scrub state for the charts: which point is shown, by pointer or arrow keys, and the draw-in flag.
// Without scrubbing the chart rests on its last point.

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export function useScrub(n: number) {
    const plotRef = useRef<HTMLDivElement>(null);
    const [idx, setIdx] = useState(n - 1);
    const [scrub, setScrub] = useState(false);
    const [drawing, setDrawing] = useState(true);
    const shown = Math.min(idx, n - 1);

    useEffect(() => {
        let frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => {
                setDrawing(false);
            });
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, []);

    function show(i: number, active: boolean) {
        setIdx(i);
        setScrub(active);
    }

    function onPointerMove(e: PointerEvent<HTMLDivElement>) {
        const box = plotRef.current?.getBoundingClientRect();

        if (!box || !box.width) {
            return;
        }

        show(Math.round(Math.min(Math.max((e.clientX - box.left) / box.width, 0), 1) * (n - 1)), true);
    }

    function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        const targets: Record<string, number> = {
            ArrowLeft: Math.max(0, shown - 1),
            ArrowRight: Math.min(n - 1, shown + 1),
            Home: 0,
            End: n - 1,
        };

        if (!(e.key in targets)) {
            return;
        }

        e.preventDefault();
        show(targets[e.key], true);
    }

    function rest() {
        show(n - 1, false);
    }

    return { plotRef, shown, scrub, drawing, handlers: { onPointerMove, onPointerLeave: rest, onBlur: rest, onKeyDown } };
}
