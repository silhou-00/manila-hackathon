// Rolling number. One wheel per digit; when the value prop changes, only the digits that differ
// spin, 35ms apart per place. A screen-reader copy carries the real number.

import type { CSSProperties } from "react";
import { useCounterReels } from "@/hooks/brief/useCounterReels";

type CounterProps = { value: number; prefix?: string; suffix?: string; decimals?: number };

const WHEEL = Array.from({ length: 30 }, (_, i) => i % 10);

export function Counter({ value, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
    const { text, reels, settle } = useCounterReels(value, decimals);
    let place = 0;

    return (
        <span className="counter">
            <span className="sr">{prefix + text + suffix}</span>
            <span className="counter-vis" aria-hidden="true">
                {prefix}
                {text.split("").map((ch, i) => {
                    if (!/\d/.test(ch)) {
                        return <span key={i}>{ch}</span>;
                    }

                    const index = place;
                    const d = Number(ch);
                    const reel = reels[index] ?? { digit: d, pos: 10 + d, anim: false };
                    const style = { "--pos": reel.pos, "--delay": `${Math.min(index * 35, 250)}ms` } as CSSProperties;

                    place += 1;

                    return (
                        <span key={i} className="counter-col">
                            <span
                                className={reel.anim ? "counter-reel" : "counter-reel no-anim"}
                                style={style}
                                onTransitionEnd={(e) => {
                                    if (e.target === e.currentTarget) {
                                        settle(index);
                                    }
                                }}
                            >
                                {WHEEL.map((n, k) => (
                                    <span key={k}>{n}</span>
                                ))}
                            </span>
                        </span>
                    );
                })}
                {suffix}
            </span>
        </span>
    );
}
