// Shared frame for every full report: the assistant's conclusion first, an optional callout, then
// the graph and the full list side by side on wide screens (stacked below 1280px), then any extra
// sections. It renders the dialog's scrolling body and, below it, the fixed totals footer.

import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import type { Total } from "@/lib/brief/report";

export type ReportExtra = { label: string; body: ReactNode };

type ReportLayoutProps = {
    conclusion: string;
    callout?: ReactNode;
    graphLabel: string;
    graph: ReactNode;
    listLabel: string;
    list: ReactNode;
    extra?: ReportExtra[];
    totals: Total[];
};

export function ReportLayout({ conclusion, callout, graphLabel, graph, listLabel, list, extra = [], totals }: ReportLayoutProps) {
    return (
        <>
            {/* scrolling body */}
            <div className="report-body">
                {/* conclusion */}
                <section className="section" aria-label="What the assistant concluded">
                    <div className="sub">
                        <div className="place report-concl">
                            <div className="box report-concl-icon">
                                <Icon name="sparkles" size={16} />
                            </div>
                            <div className="box">
                                <h3 className="kicker">What the assistant concluded</h3>
                                <p className="report-concl-text">{conclusion}</p>
                            </div>
                        </div>
                    </div>
                    {callout && (
                        <div className="sub">
                            <div className="place">
                                <div className="box report-callout-box">{callout}</div>
                            </div>
                        </div>
                    )}
                </section>

                {/* graph and list */}
                <section className="section">
                    <div className="sub report-split">
                        <div className="place report-col">
                            <div className="box">
                                <h3 className="report-h">{graphLabel}</h3>
                            </div>
                            <div className="box">{graph}</div>
                        </div>
                        <div className="place report-col">
                            <div className="box">
                                <h3 className="report-h">{listLabel}</h3>
                            </div>
                            <div className="box">{list}</div>
                        </div>
                    </div>
                </section>

                {/* extra sections */}
                {extra.length > 0 && (
                    <section className="section report-extra">
                        <div className="sub report-extra-grid">
                            {extra.map((x) => (
                                <div key={x.label} className="place report-col">
                                    <div className="box">
                                        <h3 className="report-h">{x.label}</h3>
                                    </div>
                                    <div className="box">{x.body}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* fixed totals footer */}
            <footer className="report-footer" aria-label="Totals">
                <div className="sub">
                    <dl className="place report-totals">
                        {totals.map((t) => (
                            <div key={t.label} className="box report-total">
                                <dt>{t.label}</dt>
                                <dd className="num">{t.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </footer>
        </>
    );
}
