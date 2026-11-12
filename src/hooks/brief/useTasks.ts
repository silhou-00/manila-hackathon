// Check-off state for the "Needs you today" list. A checked task strikes through first, then folds
// away into the done group 720ms later. Tells the page about the done list through the
// "md-tasks" document event, and accepts "md-task-complete" ({ id }) to finish a task from outside.

import { useEffect, useRef, useState } from "react";
import type { Task } from "@/lib/brief/model";

type Announce = { id: string; text: string };

export function useTasks(tasks: Task[]) {
    const [checked, setChecked] = useState<string[]>([]);
    const [done, setDone] = useState<string[]>([]);
    const [announce, setAnnounce] = useState<Announce | null>(null);
    const timers = useRef<Record<string, number>>({});
    const toggleRef = useRef<(id: string, value: boolean, speak: boolean) => void>(() => undefined);
    const total = tasks.length;
    const title = tasks.find((t) => t.id === announce?.id)?.title ?? "";
    const status = announce ? `${title} ${announce.text} ${done.length} of ${total} done.` : "";

    function toggle(id: string, value: boolean, speak: boolean) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (value && !checked.includes(id)) {
            setChecked((c) => [...c, id]);
            timers.current[id] = window.setTimeout(() => {
                setDone((d) => (d.includes(id) ? d : [...d, id]));
                setAnnounce(speak ? { id, text: "marked done." } : null);
            }, reduce ? 0 : 720);
        } else if (!value && done.includes(id)) {
            setDone((d) => d.filter((x) => x !== id));
            setChecked((c) => c.filter((x) => x !== id));
            setAnnounce(speak ? { id, text: "is open again." } : null);
        } else if (!value && checked.includes(id)) {
            window.clearTimeout(timers.current[id]);
            setChecked((c) => c.filter((x) => x !== id));
        }
    }

    useEffect(() => {
        toggleRef.current = toggle;
    });

    useEffect(() => {
        function onComplete(e: Event) {
            const id = (e as CustomEvent<{ id: string }>).detail.id;

            toggleRef.current(id, true, true);
        }

        document.addEventListener("md-task-complete", onComplete);

        return () => {
            document.removeEventListener("md-task-complete", onComplete);
        };
    }, []);

    useEffect(() => {
        document.dispatchEvent(new CustomEvent("md-tasks", { detail: { done } }));
    }, [done]);

    useEffect(() => {
        const pending = timers.current;

        return () => {
            Object.values(pending).forEach((t) => {
                window.clearTimeout(t);
            });
        };
    }, []);

    return { checked, done, status, total, toggle };
}
