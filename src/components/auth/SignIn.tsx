// Sign-in screen shown before the deck. There are no accounts in this demo: any username and
// password pass, but both must be filled in. Missing fields show an error under each input.
// On wide screens a brand panel sits on the left with a peek at what the morning holds.
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Icon } from "@/components/Icon";

type SignInProps = { onSignedIn: () => void };
type Errors = { username?: string; password?: string };

const SCHEMA = z.object({
    username: z.string().trim().min(1, "Enter your username."),
    password: z.string().min(1, "Enter your password."),
});

export function SignIn({ onSignedIn }: SignInProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [busy, setBusy] = useState(false);

    // submit handler
    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (busy) {
            return;
        }

        const parsed = SCHEMA.safeParse({ username, password });

        if (!parsed.success) {
            const flat = parsed.error.flatten().fieldErrors;

            setErrors({ username: flat.username?.[0], password: flat.password?.[0] });

            return;
        }

        setErrors({});
        setBusy(true);
        window.setTimeout(onSignedIn, 500);
    }

    return (
        <main className="signin">
            {/* sign-in card */}
            <section className="signin-card" aria-labelledby="signin-title">
                {/* brand panel */}
                <div className="signin-hero">
                    <div className="signin-brand">
                        <span className="signin-dot" aria-hidden="true"></span>
                        <span>ParallelOS</span>
                    </div>
                    <div className="signin-pitch">
                        <p className="signin-pitch-title">The morning deck for a traffic studio.</p>
                        <p className="signin-pitch-sub">Your assistant read the night. Here is what needs you.</p>
                        <ul className="signin-peek">
                            <li><b className="num">214</b> runs overnight</li>
                            <li><b className="num">6</b> drafts to approve</li>
                            <li><b className="num">4.1x</b> top post</li>
                        </ul>
                    </div>
                    <svg className="signin-arcs" viewBox="0 0 400 400" aria-hidden="true">
                        <circle cx="60" cy="400" r="220" />
                        <circle cx="140" cy="420" r="230" />
                    </svg>
                </div>

                {/* form panel */}
                <div className="signin-form-wrap">
                    <h1 id="signin-title" className="signin-title">Good morning</h1>
                    <p className="signin-lead">Sign in to open today's brief.</p>

                    <form className="signin-form" noValidate onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="field-label" htmlFor="signin-user">Username</label>
                            <div className="signin-input-wrap">
                                <Icon name="user" size={16} />
                                <input
                                    id="signin-user"
                                    className="signin-input"
                                    autoComplete="username"
                                    value={username}
                                    aria-invalid={errors.username ? "true" : undefined}
                                    aria-describedby={errors.username ? "signin-user-error" : undefined}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            {errors.username ? <p id="signin-user-error" className="field-hint is-error">{errors.username}</p> : null}
                        </div>

                        <div className="field">
                            <label className="field-label" htmlFor="signin-pass">Password</label>
                            <div className="signin-input-wrap">
                                <Icon name="lock" size={16} />
                                <input
                                    id="signin-pass"
                                    className="signin-input"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    aria-invalid={errors.password ? "true" : undefined}
                                    aria-describedby={errors.password ? "signin-pass-error" : undefined}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errors.password ? <p id="signin-pass-error" className="field-hint is-error">{errors.password}</p> : null}
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg btn-block" aria-busy={busy ? "true" : undefined}>
                            {busy ? "Signing in" : "Sign in"}
                        </button>
                        <p className="signin-note">Demo: any username and password work.</p>
                    </form>
                </div>
            </section>
        </main>
    );
}
