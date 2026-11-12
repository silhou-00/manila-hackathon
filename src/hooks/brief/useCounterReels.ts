// State for the rolling digit reels of a Counter. Each digit keeps its own wheel position, so a
// changed value spins only the digits that differ, up when it grows and down when it shrinks.

import { useEffect, useRef, useState } from "react";
import { fmt } from "@/lib/brief/helper";

export type Reel = { digit: number; pos: number; anim: boolean };

function rollReels(prev: Reel[], digits: number[], dir: number): Reel[] {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prev.length !== digits.length) {
        return digits.map((d) => ({ digit: d, pos: 10 + d, anim: false }));
    }

    return prev.map((reel, i) => {
        const next = digits[i];
        const cur = reel.digit;

        if (cur === next) {
            return reel;
        }

        if (reduce) {
            return { digit: next, pos: 10 + next, anim: false };
        }

        const step = dir >= 0 ? (next - cur + 10) % 10 : -((cur - next + 10) % 10);

        return { digit: next, pos: 10 + cur + step, anim: true };
    });
}

export function useCounterReels(value: number, decimals: number) {
    const text = fmt(value, decimals);
    const [reels, setReels] = useState<Reel[]>(() => text.replace(/\D/g, "").split("").map((ch) => ({ digit: Number(ch), pos: 10 + Number(ch), anim: false })));
    const last = useRef(0);

    useEffect(() => {
        const digits = text.replace(/\D/g, "").split("").map(Number);
        const dir = value >= last.current ? 1 : -1;
        let frame = 0;

        last.current = value;
        frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => {
                setReels((prev) => rollReels(prev, digits, dir));
            });
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [value, text]);

    // park a wheel on its middle copy once its roll ends
    function settle(index: number) {
        setReels((prev) => prev.map((r, i) => (i === index ? { ...r, pos: 10 + r.digit, anim: false } : r)));
    }

    return { text, reels, settle };
}
