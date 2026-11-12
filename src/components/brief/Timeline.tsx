// Step-by-step timeline of how the brief was made. Each step is pending, running or done.

import { Icon } from "@/components/Icon";
import type { StepState } from "@/hooks/brief/useReplay";
import type { Step } from "@/lib/brief/model";
import { Chip } from "./Chip";

type TimelineProps = { steps: Step[]; states: StepState[] };

function Marker({ state }: { state: StepState }) {
    if (state === "done") {
        return <Icon name="check" size={14} />;
    }

    if (state === "running") {
        return <span className="spinner" />;
    }

    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="6" />
        </svg>
    );
}

export function Timeline({ steps, states }: TimelineProps) {
    return (
        <ol className="tl">
            {steps.map((s, i) => (
                <li key={i} className="tl-item" data-step={states[i] ?? "done"}>
                    <span className="tl-marker">
                        <Marker state={states[i] ?? "done"} />
                    </span>
                    <div className="tl-body">
                        <span className="tl-time">{s.time}</span>
                        <p className="tl-text">{s.text}</p>
                        {s.sources.length > 0 && (
                            <div className="tl-sources">
                                {s.sources.map((src) => (
                                    <Chip key={src} text={src} tone="neutral" />
                                ))}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}
