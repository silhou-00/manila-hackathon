// The full report panel, rendered inside the Radix dialog root that FullReport owns. Radix gives the
// focus trap, Escape and ARIA; motion grows the panel out of the card's button through a shared
// layoutId and shrinks it back on close. With reduced motion it only fades. A centred dialog from
// 768px up, a full-height bottom sheet below. The header and the totals footer stay put while the
// body scrolls between them.

import { AnimatePresence, motion } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Icon } from "@/components/Icon";
import { DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { DATA, type RoleId } from "@/lib/brief/data";
import { AdsReport } from "./AdsReport";
import { CapacityReport } from "./CapacityReport";
import { ClientsReport } from "./ClientsReport";
import { HighlightReport } from "./HighlightReport";
import { LoopReport } from "./LoopReport";
import { QueueReport } from "./QueueReport";
import { RequestsReport } from "./RequestsReport";
import { RunlogReport } from "./RunlogReport";
import { RunsReport } from "./RunsReport";
import { SalesReport } from "./SalesReport";
import { TrendsReport } from "./TrendsReport";

type ReportDialogProps = {
    role: RoleId;
    m: string;
    title: string;
    open: boolean;
    layoutId?: string;
};

type ReportBodyProps = { role: RoleId; m: string };

// report body by module name
function ReportBody({ role, m }: ReportBodyProps) {
    const bodies: Record<string, typeof RunsReport> = {
        runs: RunsReport,
        queue: QueueReport,
        clients: ClientsReport,
        sales: SalesReport,
        ads: AdsReport,
        trends: TrendsReport,
        runlog: RunlogReport,
        capacity: CapacityReport,
        highlight: HighlightReport,
        loop: LoopReport,
        requests: RequestsReport,
    };
    const Body = bodies[m];

    if (!Body) {
        return null;
    }

    return <Body role={role} />;
}

export function ReportDialog({ role, m, title, open, layoutId }: ReportDialogProps) {
    const fade = layoutId === undefined;
    const roleLabel = DATA.roles[role].label;

    return (
        <AnimatePresence>
            {open && (
                <DialogPortal forceMount>
                    <DialogOverlay forceMount asChild className="report-scrim">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
                    </DialogOverlay>
                    <div className="report-wrap">
                        <DialogPrimitive.Content forceMount asChild>
                            <motion.div
                                className="report-panel"
                                layoutId={layoutId}
                                initial={fade ? { opacity: 0 } : undefined}
                                animate={fade ? { opacity: 1 } : undefined}
                                exit={fade ? { opacity: 0 } : undefined}
                                transition={fade ? { duration: 0.2 } : { type: "spring", duration: 0.42, bounce: 0.12 }}
                            >
                                <motion.div
                                    className="report-inner"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.2, delay: fade ? 0 : 0.14 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                >
                                    {/* header */}
                                    <div className="report-head">
                                        <div className="report-head-text">
                                            <p className="kicker">Full report · {roleLabel}</p>
                                            <DialogTitle className="report-title">{title}</DialogTitle>
                                            <DialogDescription className="report-desc">
                                                {DATA.date}. {DATA.mockNote}
                                            </DialogDescription>
                                        </div>
                                        <DialogClose asChild>
                                            <button type="button" className="icon-btn icon-btn--bordered" aria-label="Close report">
                                                <Icon name="x" size={18} />
                                            </button>
                                        </DialogClose>
                                    </div>

                                    {/* scrolling body and fixed totals footer */}
                                    <ReportBody role={role} m={m} />
                                </motion.div>
                            </motion.div>
                        </DialogPrimitive.Content>
                    </div>
                </DialogPortal>
            )}
        </AnimatePresence>
    );
}
