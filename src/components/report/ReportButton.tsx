// "View full report" at the foot of a data card. Owns the dialog's open state; the button's backing
// shape shares a layoutId with the report panel, so the panel grows out of it and shrinks back into it.
// Renders nothing for modules without a report (summary, needs) or that the role does not have.

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/Icon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { RoleId } from "@/lib/brief/data";
import { hasReport } from "@/lib/brief/report";
import { ReportDialog } from "./ReportDialog";

type FullReportProps = { role: RoleId; m: string; title: string };

export function FullReport({ role, m, title }: FullReportProps) {
    const [open, setOpen] = useState(false);
    const reduce = useReducedMotion();
    const layoutId = reduce ? undefined : `report-${role}-${m}`;

    if (!hasReport(role, m)) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="place report-foot">
                <div className="box report-foot-box">
                    <DialogTrigger asChild>
                        <button type="button" className="report-btn">
                            {!open && (
                                <motion.span
                                    className="report-btn-bg"
                                    layoutId={layoutId}
                                    transition={{ type: "spring", duration: 0.42, bounce: 0.12 }}
                                    aria-hidden="true"
                                />
                            )}
                            <span className="report-btn-label">
                                View full report
                                <Icon name="arrow" size={16} />
                            </span>
                        </button>
                    </DialogTrigger>
                </div>
            </div>
            <ReportDialog role={role} m={m} title={title} open={open} layoutId={layoutId} />
        </Dialog>
    );
}
