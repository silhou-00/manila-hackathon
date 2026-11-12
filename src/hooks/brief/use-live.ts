// Live flow hook. Every 10 seconds, while the tab is visible, the agents post a little more and sales
// tick up. Returns the cumulative offsets by key, which the cards add on top of their base figures.
import { useEffect, useState } from "react";
import type { RoleId } from "@/lib/brief/data";

type Rule = { keys: string[]; min: number; max: number };

const RULES: Record<RoleId, Rule[]> = {
    studio: [
        { keys: ["made", "loop-1"], min: 0, max: 2 },
        { keys: ["posted", "loop-2"], min: 0, max: 2 },
    ],
    brand: [
        { keys: ["sales"], min: 240, max: 1480 },
        { keys: ["orders"], min: 0, max: 2 },
    ],
};

export function useLive(role: RoleId): Record<string, number> {
    const [live, setLive] = useState<Record<string, number>>({});

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (document.hidden) {
                return;
            }

            setLive((prev) => {
                const next = { ...prev };

                RULES[role].forEach((rule) => {
                    const add = rule.min + Math.round(Math.random() * (rule.max - rule.min));

                    rule.keys.forEach((key) => {
                        next[key] = (next[key] ?? 0) + add;
                    });
                });

                return next;
            });
        }, 10000);

        return () => {
            window.clearInterval(timer);
        };
    }, [role]);

    return live;
}
