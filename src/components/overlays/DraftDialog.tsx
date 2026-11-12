// Draft dialog on the shadcn dialog: a centred dialog on wide screens and a bottom sheet on phones.
// The operator edits the drafted note and sends it; an empty note is rejected before it goes out.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Icon } from "@/components/Icon";
import { useMedia } from "@/hooks/brief/use-media";
import type { DraftCfg } from "@/lib/brief/view";

type DraftDialogProps = {
    cfg: DraftCfg | null;
    onClose: () => void;
    onSent: (cfg: DraftCfg) => void;
};

type DraftFormProps = {
    cfg: DraftCfg;
    phone: boolean;
    onClose: () => void;
    onSent: (cfg: DraftCfg) => void;
};

const HINT = "Your assistant drafted this. Change anything before it goes out.";

function DraftForm({ cfg, phone, onClose, onSent }: DraftFormProps) {
    const [text, setText] = useState(cfg.draft);
    const [invalid, setInvalid] = useState(false);
    const [sending, setSending] = useState(false);
    const areaRef = useRef<HTMLTextAreaElement>(null);
    const timer = useRef<number | undefined>(undefined);

    // timer cleanup
    useEffect(() => {
        return () => {
            window.clearTimeout(timer.current);
        };
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (sending) {
            return;
        }

        if (!text.trim()) {
            setInvalid(true);
            areaRef.current?.focus();

            return;
        }

        setSending(true);
        timer.current = window.setTimeout(() => {
            onSent(cfg);
        }, 650);
    }

    return (
        <form className="draft" noValidate onSubmit={handleSubmit}>
            {phone ? <button type="button" className="grab" aria-label="Close" onClick={onClose}></button> : null}
            <div className="draft-head">
                <div>
                    <p className="kicker">{cfg.kicker}</p>
                    <DialogTitle className="draft-title">{cfg.title}</DialogTitle>
                </div>
                <button type="button" className="icon-btn icon-btn--sm" aria-label="Close" onClick={onClose}>
                    <Icon name="x" size={18} />
                </button>
            </div>
            <DialogDescription className="draft-to">{cfg.to}</DialogDescription>
            <div className="field">
                <label className="field-label" htmlFor="md-draft-text">
                    {cfg.label ?? "Message"}
                </label>
                <textarea
                    id="md-draft-text"
                    ref={areaRef}
                    value={text}
                    aria-invalid={invalid ? "true" : undefined}
                    aria-describedby="md-draft-hint"
                    onChange={(e) => {
                        setText(e.target.value);
                        setInvalid(false);
                    }}
                />
                <p className={invalid ? "field-hint is-error" : "field-hint"} id="md-draft-hint">
                    {invalid ? "Write something before it goes out." : HINT}
                </p>
            </div>
            <div className="draft-foot">
                <button type="button" className="btn btn-ghost" onClick={onClose}>
                    Not now
                </button>
                <button type="submit" className="btn btn-primary" aria-busy={sending ? "true" : undefined}>
                    <span>{cfg.confirm}</span>
                    {sending ? <span className="spinner"></span> : null}
                </button>
            </div>
        </form>
    );
}

export function DraftDialog({ cfg, onClose, onSent }: DraftDialogProps) {
    const phone = useMedia("(max-width: 767px)");
    const position = phone
        ? "sheet"
        : "dialog fixed top-1/2 left-1/2 z-[86] -translate-x-1/2 -translate-y-1/2";

    return (
        <Dialog
            open={cfg !== null}
            onOpenChange={(next) => {
                if (!next) {
                    onClose();
                }
            }}
        >
            <DialogContent className={position} showCloseButton={false}>
                {cfg ? <DraftForm key={cfg.title} cfg={cfg} phone={phone} onClose={onClose} onSent={onSent} /> : null}
            </DialogContent>
        </Dialog>
    );
}
