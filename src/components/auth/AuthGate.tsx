// Shows the sign-in screen until the user signs in, then the app. The signed-in flag lives in
// memory only, so a reload asks again; nothing is written to storage. Log out in the app clears it.
import { useState } from "react";
import App from "@/App";
import { SignIn } from "./SignIn";

export function AuthGate() {
    const [signedIn, setSignedIn] = useState(false);

    if (!signedIn) {
        return <SignIn onSignedIn={() => setSignedIn(true)} />;
    }

    return <App onSignOut={() => setSignedIn(false)} />;
}
