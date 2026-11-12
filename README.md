# ParallelOS

The morning deck for a traffic studio. Manila Hack 2026, Craftsmanship bucket.

A traffic studio finds what's trending, makes content for it, posts it, measures what worked and does it again. Overnight that loop produces hundreds of runs, posts and numbers. ParallelOS has an assistant read the night and hand each side of the studio a short brief with decisions, instead of a wall of charts.

**Live demo:** https://silhou-00.github.io/manila-hackathon/

## Two roles, one data set

Sign in with any username and password (both are required; there are no accounts). Switch roles from the Demo pill in the top right corner (desktop) or by tapping the avatar (phone).

| Role | Who | What the brief answers |
|---|---|---|
| Studio | Migs Santos, operator of an agent-run studio in Makati, about 40 accounts | What the agents made and posted overnight, which runs failed and why, which pods and phones need attention, what waits for approval |
| Brand | Carla Mendoza, growth lead at Kalma Skincare, the studio's client | Which videos sold on TikTok Shop, what Meta Ads spent and returned, what to scale, stop or brief next |

The same rainy-day skincare video runs through both: Migs sees it as last night's top performer, Carla sees it as her best seller.

## What to try

- **Needs you today:** each item opens a draft and confirms with a toast. Check items off and the ring fills.
- **Less to read first:** the top performer shows its headline and folds the rest. The loop (Find trend, Make, Post, Measure, Repeat) stays folded until you open it.
- **Graph or list:** every list card opens on a graph and switches to the full list with one tap. All list cards share one height and scroll inside.
- **Live flow:** every 10 seconds the agents post a little more and Kalma's sales tick up.
- **Phone:** below 768px it becomes an app with a bottom tab bar and the main action within thumb reach.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer and pnpm. If you don't have pnpm, install it once:

```
npm install -g pnpm
```

Then:

```
git clone https://github.com/silhou-00/manila-hackathon.git
cd manila-hackathon
pnpm install
pnpm dev
```

Open the address it prints, usually http://localhost:5173. The page reloads by itself when you change the code.

To see the phone version, narrow the browser window below 768px, or open the browser's device toolbar (F12, then Ctrl+Shift+M).

To view the finished build the way GitHub Pages serves it:

```
pnpm build
pnpm preview
```

`pnpm preview` prints its own address, usually http://localhost:4173.

## Stack

React 19, TypeScript (strict), Vite, Tailwind CSS v4 (tokens in `@theme`), shadcn/ui on Radix (dialog, toasts), pnpm.

| Command | Does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server with live reload |
| `pnpm build` | Type-check and build the site into `docs/` for GitHub Pages |
| `pnpm preview` | Serve the built site from `docs/` |
| `pnpm typecheck` | Type-check the project |
| `pnpm lint` | Check the code with ESLint |

GitHub Pages serves the built site from `main` / `docs`.

## Not yet in this version

The first build was plain HTML. These parts of it are not ported to React yet:

- Detail screens that slide in on phones (the open buttons on runs and ads).
- Designed loading, empty and error states for each card.
- The stacked look for several toasts at once.
- Exit animations for the dialog and the notifications popover.

## About the data

All people, companies and numbers are made up for the demo. This demo is inspired by how a traffic studio runs, but it does not connect to TikTok Shop, Kalodata, Meta Ads or any AI model. The assistant's runs are scripted.
