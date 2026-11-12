// Segmented control (radio group) with one sliding thumb. Arrow keys move the selection.

import type { CSSProperties, KeyboardEvent } from "react";
import { useSegThumb } from "@/hooks/brief/useSegThumb";
import type { Filter } from "@/lib/brief/model";

type SegProps = { id: string; filters: Filter[]; value: string; onChange: (value: string) => void; label?: string };

export function Seg({ id, filters, value, onChange, label = "Filter" }: SegProps) {
    const { groupRef, thumb } = useSegThumb(value);
    const thumbStyle = { "--x": `${thumb.x}px`, "--w": `${thumb.w}px` } as CSSProperties;

    function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
            return;
        }

        const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>(".seg-btn"));
        const at = buttons.findIndex((b) => b === document.activeElement);
        const next = (at + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;

        e.preventDefault();
        buttons[next].focus();
        onChange(filters[next].id);
    }

    return (
        <div className="seg" role="radiogroup" aria-label={label} data-seg={id} ref={groupRef} onKeyDown={onKeyDown}>
            <span className={thumb.animate ? "seg-thumb" : "seg-thumb no-anim"} style={thumbStyle} />
            {filters.map((f) => (
                <button
                    key={f.id}
                    type="button"
                    className="seg-btn"
                    role="radio"
                    aria-checked={f.id === value}
                    tabIndex={f.id === value ? 0 : -1}
                    data-value={f.id}
                    onClick={() => {
                        onChange(f.id);
                    }}
                >
                    {f.label}
                    {f.count && <> <span className="seg-count">{f.count}</span></>}
                </button>
            ))}
        </div>
    );
}
