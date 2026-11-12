// Segmented radio group with a sliding thumb. Used for the role switch and the notification filter.
// The thumb is placed from the active button's measured offset and width.
import { useLayoutEffect, useRef } from "react";

export type SegOption = { id: string; label: string };

type SegProps = {
    label: string;
    options: SegOption[];
    value: string;
    onChange: (id: string) => void;
};

export function Seg({ label, options, value, onChange }: SegProps) {
    const groupRef = useRef<HTMLDivElement>(null);
    const placed = useRef(false);

    // thumb placement
    useLayoutEffect(() => {
        function place(animate: boolean) {
            const group = groupRef.current;
            const on = group?.querySelector<HTMLElement>('[aria-checked="true"]');
            const thumb = group?.querySelector<HTMLElement>(".seg-thumb");

            if (!on || !thumb || !on.offsetWidth) {
                return;
            }

            thumb.classList.toggle("no-anim", !animate);
            thumb.style.setProperty("--x", on.offsetLeft + "px");
            thumb.style.setProperty("--w", on.offsetWidth + "px");
        }

        function onResize() {
            place(false);
        }

        place(placed.current);
        placed.current = true;
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [value]);

    return (
        <div className="seg" role="radiogroup" aria-label={label} ref={groupRef}>
            <span className="seg-thumb"></span>
            {options.map((o) => (
                <button
                    key={o.id}
                    type="button"
                    className="seg-btn"
                    role="radio"
                    aria-checked={o.id === value}
                    tabIndex={o.id === value ? 0 : -1}
                    onClick={() => {
                        onChange(o.id);
                    }}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}
