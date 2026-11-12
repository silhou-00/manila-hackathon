// Overnight highlight: the standout post, with a closed-by-default fold holding the story, the key
// figures, the scrub chart and a bridge button that switches to the other role. The desktop
// Overnight page opens the fold from the start.

import { useState } from "react";
import { Icon } from "@/components/Icon";
import type { RoleId } from "@/lib/brief/data";
import type { Highlight } from "@/lib/brief/model";
import { AreaChart } from "./AreaChart";
import { Chip } from "./Chip";
import { FoldButton } from "./FoldButton";

type HighlightModuleProps = { data: Highlight; onRoleSwitch: (role: RoleId) => void; defaultOpen?: boolean };

export function HighlightModule({ data: h, onRoleSwitch, defaultOpen = false }: HighlightModuleProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <>
            <div className="mod-head">
                <p className="kicker">{h.kicker}</p>
                <FoldButton open={open} noun="details" onToggle={() => setOpen(!open)} />
            </div>
            <h2 className="hl-title">{h.title}</h2>
            <div className="fold" data-open={String(open)}>
                <div className="fold-in">
                    <div className="hl-fold">
                        <div className="hl-grid">
                            <div className="hl-copy">
                                <p>{h.lead}</p>
                                <p>
                                    <b>Take from it:</b> {h.takeaway}
                                </p>
                                <p className="hl-made">{h.made}</p>
                            </div>
                            <table className="figs">
                                <tbody>
                                    {h.figures.map((f) => (
                                        <tr key={f.label}>
                                            <th scope="row">{f.label}</th>
                                            <td className="num">{f.value}</td>
                                            <td>
                                                <Chip text={f.delta} tone={f.tone} arrow="up" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="hl-chart">
                            <div className="mod-head">
                                <h3 className="kicker">{h.chart.title}</h3>
                            </div>
                            <AreaChart values={h.chart.values} labels={h.chart.labels} prefix={h.chart.prefix} unit={h.chart.unit} label={h.chart.title} />
                        </div>
                        <div className="bridge">
                            <span>
                                <Icon name="layers" size={16} />
                                {h.bridge.text}
                            </span>
                            <button type="button" className="link-btn" data-role-switch={h.bridge.role} onClick={() => onRoleSwitch(h.bridge.role)}>
                                {h.bridge.label}
                                <Icon name="arrow" size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
