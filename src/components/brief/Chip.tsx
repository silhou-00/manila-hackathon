// Small status pill. The tone sets its colour through data-tone; an up arrow is optional.

type ChipProps = { text: string; tone?: string; arrow?: string };

export function Chip({ text, tone = "neutral", arrow }: ChipProps) {
    return (
        <span className="chip" data-tone={tone}>
            {arrow === "up" && (
                <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M6 2.5 10 8H2z" fill="currentColor" />
                </svg>
            )}
            {text}
        </span>
    );
}
