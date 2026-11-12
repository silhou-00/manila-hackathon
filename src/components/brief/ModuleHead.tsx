// Title row at the top of a module card: the title, with optional meta text and a control on the right.

import type { ReactNode } from "react";

type ModuleHeadProps = { title: string; meta?: ReactNode; extra?: ReactNode };

export function ModuleHead({ title, meta, extra }: ModuleHeadProps) {
    return (
        <div className="mod-head">
            <h2 className="mod-title">{title}</h2>
            {(meta || extra) && (
                <span className="mod-head-end">
                    {meta && <span className="mod-meta">{meta}</span>}
                    {extra}
                </span>
            )}
        </div>
    );
}
