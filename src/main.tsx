// Entry point. Mounts the sign-in gate, which shows the app once signed in, with the global styles.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthGate } from "@/components/auth/AuthGate";

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <AuthGate />
        </StrictMode>,
    );
}
