// Run log replay. Walks the steps one at a time: pending, then running, then done, 520ms apart.
// Calls onFinish after the last step is marked done.

import { useEffect, useRef, useState } from "react";

export type StepState = "pending" | "running" | "done";

export function useReplay(count: number, onFinish: () => void) {
    const [states, setStates] = useState<StepState[]>(() => Array<StepState>(count).fill("done"));
    const [busy, setBusy] = useState(false);
    const timer = useRef(0);
    const finish = useRef(onFinish);

    useEffect(() => {
        finish.current = onFinish;
    });

    useEffect(() => {
        return () => {
            window.clearTimeout(timer.current);
        };
    }, []);

    function step(i: number) {
        setStates((prev) => prev.map((s, k) => (k < i ? "done" : k === i ? "running" : s)));

        if (i >= count) {
            setBusy(false);
            finish.current();

            return;
        }

        timer.current = window.setTimeout(() => {
            step(i + 1);
        }, 520);
    }

    function start() {
        if (busy) {
            return;
        }

        setBusy(true);
        setStates(Array<StepState>(count).fill("pending"));
        step(0);
    }

    return { states, busy, start };
}
