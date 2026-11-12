// Tracks whether a CSS media query currently matches, so the shell can switch between the phone and
// desktop behaviour (dock, bottom sheet) without reading the window width by hand.
import { useEffect, useState } from "react";

export function useMedia(query: string): boolean {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const list = window.matchMedia(query);

        function onChange() {
            setMatches(list.matches);
        }

        onChange();
        list.addEventListener("change", onChange);

        return () => {
            list.removeEventListener("change", onChange);
        };
    }, [query]);

    return matches;
}
