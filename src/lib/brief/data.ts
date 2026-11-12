// MarketDeck mock content for both roles (Studio and Brand). Every name and figure is fictional;
// nothing here reads ParallelOS, TikTok Shop, Kalodata, Meta Ads or any model.

export const DATA = {
    product: "MarketDeck",
    date: "Thursday, November 12",
    dateShort: "Thu, Nov 12",
    mockNote: "Demo data. Every figure is mock; nothing here reads a live account.",

    // module names used by the state gallery and the error, empty copy
    moduleNames: {
        summary: "Summary strip", loop: "Loop strip", highlight: "Overnight highlight", needs: "Needs you today",
        capacity: "Capacity", queue: "Content queue", runs: "Agent runs", clients: "Per-client results",
        trends: "Trending", runlog: "Run log", sales: "TikTok Shop sales", ads: "Meta Ads", requests: "Studio requests",
        notifications: "Notifications"
    },

    copy: {
        empty: {
            summary: ["Nothing to sum up yet", "The first brief lands tomorrow at 5:40 AM. You can also run it now.", "Run the brief now"],
            loop: ["The loop has not started", "Once agents find a trend, each stage shows its count here.", "Find trends now"],
            highlight: ["No standout overnight", "Nothing moved more than usual since 11:40 PM. Quiet nights happen.", "Compare with last week"],
            needs: ["Nothing needs you today", "You are clear. Approvals, failures and alerts show up here.", "Open the queue"],
            capacity: ["No pods connected", "Add a pod or phone to see what is online and busy.", "Add a pod"],
            queue: ["The queue is empty", "Drafts move through trend, script, make, review and post here.", "Find a trend"],
            runs: ["No runs overnight", "Agent runs and their results land here as they finish.", "Start a run"],
            clients: ["No client results yet", "Results show per client once posts are measured.", "Measure now"],
            trends: ["No trends picked up", "Rising searches and sounds in your category show here.", "Scan again"],
            runlog: ["No run yet today", "The assistant runs at 5:40 AM, or you can start it now.", "Run now"],
            sales: ["No sales yesterday", "Videos that sell on TikTok Shop show here with their orders.", "Check again"],
            ads: ["No ad sets running", "Ad sets show here with their spend and return.", "Check again"],
            requests: ["No open requests", "Briefs you send the studio show here with their status.", "Write a brief"],
            notifications: ["You are all caught up", "Alerts about runs, approvals and spend land here.", "Check again"]
        },
        error: {
            summary: ["Could not build your summary", "One of the sources did not answer in time. Nothing is lost."],
            loop: ["Could not load the loop", "The stage counts did not load. The agents are still running."],
            highlight: ["Could not load overnight numbers", "The views feed did not answer in time. Your other data is fine."],
            needs: ["Could not load today's list", "Your tasks are safe. The list just did not load."],
            capacity: ["Could not reach your pods", "Status may be out of date until this loads."],
            queue: ["Could not load the queue", "Your drafts are safe. The list just did not load."],
            runs: ["Could not load agent runs", "The run history stopped loading at 5:39 AM."],
            clients: ["Could not load client results", "Measurement did not finish for every account."],
            trends: ["Could not load trends", "The trend scan did not finish this morning."],
            runlog: ["The 5:40 AM run stopped at step 3", "One source did not answer, so this brief may be missing numbers."],
            sales: ["Could not load sales", "The sales export did not arrive. Nothing was changed."],
            ads: ["Could not load ad sets", "Spend and return did not load. No budget was moved."],
            requests: ["Could not load requests", "Your briefs are safe. The list just did not load."],
            notifications: ["Could not load notifications", "Check your connection, then try again."]
        }
    },

    roles: {
        studio: {
            id: "studio",
            label: "Studio",
            person: { name: "Migs Santos", title: "Studio operator, Makati", initials: "MS" },
            nav: [
                {
                    group: "Today",
                    items: [
                        { id: "overview", label: "Overview", icon: "layers", modules: ["summary", "loop", "highlight", "needs", "capacity"] },
                        { id: "brief", label: "Brief", icon: "sun", modules: ["summary", "needs"] },
                        { id: "overnight", label: "Overnight", icon: "moon", modules: ["highlight", "loop"] }
                    ]
                },
                { id: "content", label: "Content", icon: "kanban", modules: ["queue", "trends"], count: "6" },
                { id: "studio", label: "Studio", icon: "bot", modules: ["capacity", "runs"], count: "3 failed", tone: "danger" },
                { id: "clients", label: "Clients", icon: "store", modules: ["clients"] },
                { id: "assistant", label: "Assistant", icon: "sparkles", modules: ["runlog"], count: "5:40 AM" }
            ],
            clientCards: [
                { id: "kalma", name: "Kalma Skincare", accounts: 3, posts: 46, views: "612,300", best: "4.1x", top: { title: "Rainy-day skincare routine", views: "186,400" }, waiting: "6 drafts to approve before 9 AM", tone: "warning" },
                { id: "lakad", name: "Lakad Footwear", accounts: 2, posts: 38, views: "284,900", best: "1.8x", top: { title: "Puddle-proof sneakers", views: "61,700" }, waiting: "Ride \"ulan ootd\" today on both accounts", tone: "info" },
                { id: "sinag", name: "Sinag Coffee", accounts: 2, posts: 28, views: "151,200", best: "1.3x", top: { title: "Jeepney commute coffee", views: "38,900" }, waiting: "Nothing waiting, steady", tone: "neutral" }
            ],
            tabs: [
                { id: "today", label: "Today", icon: "sun" },
                { id: "queue", label: "Queue", icon: "kanban", badge: "6" },
                { id: "runs", label: "Runs", icon: "bot", badge: "3" },
                { id: "assistant", label: "Assistant", icon: "sparkles" }
            ],
            layout: [
                { cols: "1", slots: [{ m: "summary", tab: "today" }] },
                { cols: "main-side", slots: [{ stack: [{ m: "highlight", tab: "today" }, { m: "loop", tab: "today" }, { m: "capacity", tab: "runs" }] }, { m: "needs", tab: "today" }] },
                { cols: "wide-3", slots: [{ m: "queue", tab: "queue" }, { m: "runs", tab: "runs" }, { m: "clients", tab: "runs" }] },
                { cols: "2", slots: [{ m: "trends", tab: "queue" }, { m: "runlog", tab: "assistant" }] }
            ],
            note: { prepared: "Prepared by your assistant at 5:40 AM", from: "from 214 runs across 12 pods" },
            summary: [
                { id: "made", label: "Posts made overnight", value: 128, delta: "14 vs usual", tone: "success", arrow: "up", note: "Across 40 accounts", icon: "film" },
                { id: "posted", label: "Posted", value: 112, delta: "88%", tone: "neutral", note: "7 more scheduled for later", icon: "send" },
                { id: "approval", label: "Waiting for approval", value: 6, delta: "Kalma Skincare", tone: "warning", note: "Best approved before 9 AM", icon: "check-square" },
                { id: "failed", label: "Runs failed", value: 3, delta: "Pod 07", tone: "danger", note: "TikTok login lost at 2:14 AM", icon: "alert" }
            ],
            loop: {
                title: "The loop, overnight",
                meta: "11:40 PM to 5:40 AM",
                stages: [
                    { id: "find", label: "Find trend", value: 14, unit: "trends", icon: "search" },
                    { id: "make", label: "Make", value: 128, unit: "made", icon: "film" },
                    { id: "post", label: "Post", value: 112, unit: "posted", icon: "send" },
                    { id: "measure", label: "Measure", value: 96, unit: "measured", icon: "chart" },
                    { id: "repeat", label: "Repeat", value: 11, unit: "remakes queued", icon: "repeat" }
                ]
            },
            highlight: {
                kicker: "Top performer overnight · Kalma Skincare",
                title: "Kalma's rainy-day skincare routine pulled 4.1x the account's usual views",
                lead: "The agent opened on rain against a jeepney window, then the serum. Viewers stayed past the hook, and the video kept climbing after midnight.",
                takeaway: "Remake it for Kalma's other two accounts while \"ulan\" is trending.",
                figures: [
                    { label: "Views", value: "186,400", delta: "4.1x usual", tone: "success" },
                    { label: "Held past 3 sec", value: "68%", delta: "21 pts", tone: "success" },
                    { label: "Shop clicks", value: "3,912", delta: "5.2x usual", tone: "success" }
                ],
                made: "Made and posted by an agent on Pod 03, Phone 17, at 9:10 PM.",
                bridge: { text: "On Kalma's side, the same video sold ₱61,200 in 138 orders.", label: "See it as Brand", role: "brand" },
                chart: {
                    title: "Views since posting",
                    unit: "views",
                    labels: ["9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"],
                    values: [2100, 14800, 41300, 78900, 112600, 139200, 158700, 174100, 186400]
                }
            },
            needs: [
                { id: "approve", kicker: "Approvals · Kalma Skincare", due: "Before 9 AM", title: "Approve 6 drafts for Kalma Skincare", sub: "Agents made them from last night's winner. Two use the rain hook.", quote: "Remake A: \"Umuulan na naman? Ito ang 3-step routine ko bago lumabas.\"", cite: "Draft 1 of 6 · 28 sec · @kalmaskin.ph", primary: { label: "Approve 6 drafts", draft: "approve" }, aside: "5 more in the queue", tile: { id: "approval", value: 0 } },
                { id: "pod07", kicker: "Pod 07 · TikTok", due: "3 runs failed", title: "Pod 07 lost its TikTok login", sub: "3 runs failed at 2:14 AM. Four phones on that pod are idle.", secondary: { label: "Reconnect Pod 07", action: "reconnect" }, detail: "pod07", tile: { id: "failed", value: 0 } },
                { id: "ulan", kicker: "Trend alert", due: "Rising fast", title: "\"ulan ootd\" is rising fast", sub: "Two Lakad Footwear accounts can ride it today.", secondary: { label: "Brief the agents", draft: "trend" } }
            ],
            capacity: [
                { id: "pods", label: "Pods online", value: 11, of: 12, note: "Pod 07 needs a TikTok login", warn: 1 },
                { id: "phones", label: "Phones online", value: 38, of: 40, note: "2 charging, back by 7 AM", warn: 0 },
                { id: "agents", label: "Agents busy", value: 9, of: 12, note: "3 idle, waiting on Pod 07", warn: 0 }
            ],
            queue: {
                title: "Content queue",
                stages: { trend: "Trend", script: "Script", make: "Make", review: "Review", scheduled: "Scheduled", posted: "Posted" },
                filters: [{ id: "all", label: "All" }, { id: "review", label: "Review" }, { id: "scheduled", label: "Scheduled" }, { id: "posted", label: "Posted" }],
                items: [
                    { id: "q1", title: "Rainy-day routine, remake A", client: "Kalma Skincare", stage: "review", when: "Before 9 AM" },
                    { id: "q2", title: "Rainy-day routine, remake B", client: "Kalma Skincare", stage: "review", when: "Before 9 AM" },
                    { id: "q3", title: "Serum in 10 seconds", client: "Kalma Skincare", stage: "review", when: "Before 9 AM" },
                    { id: "q4", title: "Night routine, jeepney edition", client: "Kalma Skincare", stage: "review", when: "Before 9 AM" },
                    { id: "q5", title: "Ingredient myth #4", client: "Kalma Skincare", stage: "review", when: "Before 9 AM" },
                    { id: "q6", title: "Rain-proof sunscreen test", client: "Kalma Skincare", stage: "review", when: "Before 9 AM" },
                    { id: "q7", title: "Ulan ootd: shoes that survive", client: "Lakad Footwear", stage: "trend", when: "Today" },
                    { id: "q8", title: "Rainy café crawl", client: "Sinag Coffee", stage: "script", when: "Today" },
                    { id: "q9", title: "Mall walk test", client: "Lakad Footwear", stage: "make", when: "Today" },
                    { id: "q10", title: "Latte art, three ways", client: "Sinag Coffee", stage: "scheduled", when: "11:00 AM" },
                    { id: "q11", title: "Rainy-day skincare routine", client: "Kalma Skincare", stage: "posted", when: "9:10 PM" }
                ]
            },
            runs: {
                title: "Agent runs",
                meta: "214 overnight",
                filters: [{ id: "all", label: "All" }, { id: "failed", label: "Failed", count: "3" }],
                items: [
                    { id: "r1", task: "Post · Ulan ootd teaser", where: "Pod 07 · Phone 31", status: "error", time: "2:14 AM", note: "TikTok asked for a new login", detail: "pod07" },
                    { id: "r2", task: "Post · Mall walk test", where: "Pod 07 · Phone 32", status: "error", time: "2:15 AM", note: "Same login error", detail: "pod07" },
                    { id: "r3", task: "Post · Shoe care in rain", where: "Pod 07 · Phone 33", status: "error", time: "2:15 AM", note: "Same login error", detail: "pod07" },
                    { id: "r4", task: "Make · Latte art, three ways", where: "Pod 05 · Phone 12", status: "running", time: "Now", note: "Cutting 2 of 3 versions" },
                    { id: "r5", task: "Measure · 96 posts", where: "Pod 01", status: "done", time: "5:38 AM", note: "Compared with each account's usual" },
                    { id: "r6", task: "Post · Rainy-day routine", where: "Pod 03 · Phone 17", status: "done", time: "9:10 PM", note: "4.1x usual views by 5 AM" }
                ]
            },
            clients: {
                title: "Per client, overnight",
                items: [
                    { id: "kalma", name: "Kalma Skincare", posts: 46, views: "612,300", best: "4.1x", values: [310, 342, 298, 365, 401, 388, 612] },
                    { id: "lakad", name: "Lakad Footwear", posts: 38, views: "284,900", best: "1.8x", values: [240, 251, 262, 230, 270, 268, 285] },
                    { id: "sinag", name: "Sinag Coffee", posts: 28, views: "151,200", best: "1.3x", values: [150, 141, 160, 152, 149, 158, 151] }
                ],
                note: "Views in thousands per night, last 7 nights."
            },
            trends: {
                title: "Trending",
                meta: "Mock trend scan",
                items: [
                    { id: "t1", term: "ulan ootd", growth: "312%", fit: "Fits 2 Lakad Footwear accounts", tone: "success" },
                    { id: "t2", term: "rainy-day skincare", growth: "184%", fit: "Kalma is already riding it", tone: "success" },
                    { id: "t3", term: "jeepney commute", growth: "62%", fit: "Fits Sinag Coffee", tone: "success" },
                    { id: "t4", term: "sunscreen myths", growth: "41%", fit: "Fits Kalma Skincare", tone: "success" },
                    { id: "t5", term: "budget latte", growth: "8%", fit: "Cooling off", tone: "neutral" }
                ]
            },
            runlog: {
                title: "How this brief was made",
                summary: "5 steps · 4 min 12 s",
                steps: [
                    { time: "5:36 AM", text: "Read 214 agent runs across 12 pods", sources: ["Run history"] },
                    { time: "5:37 AM", text: "Pulled overnight views for 112 posts", sources: ["Demo data"] },
                    { time: "5:38 AM", text: "Compared each post with its account's 30-day usual", sources: ["30 days of posts"] },
                    { time: "5:39 AM", text: "Grouped 3 failed runs on Pod 07: one login error", sources: ["Pod 07 logs"] },
                    { time: "5:40 AM", text: "Wrote this brief, queued 6 drafts for approval", sources: [] }
                ],
                errorAt: 2,
                errorText: "Could not read the views feed. Stopped here."
            },
            notifications: [
                { id: "n1", tone: "danger", icon: "alert", title: "Pod 07 lost its TikTok login", sub: "3 runs failed · 2:14 AM", unread: true },
                { id: "n2", tone: "success", icon: "trending", title: "Kalma rainy-day routine hit 4.1x usual", sub: "186,400 views · 5:00 AM", unread: true },
                { id: "n3", tone: "warning", icon: "clock", title: "6 drafts are waiting for approval", sub: "Kalma Skincare · before 9 AM", unread: true },
                { id: "n4", tone: "info", icon: "sparkles", title: "Your brief is ready", sub: "214 runs read · 5:40 AM", unread: false },
                { id: "n5", tone: "neutral", icon: "calendar", title: "Latte art, three ways is scheduled", sub: "Sinag Coffee · 11:00 AM", unread: false }
            ],
            drafts: {
                approve: { kicker: "Kalma Skincare · 6 drafts", title: "Approve 6 drafts", to: "The agents post them on Kalma's schedule, starting 11:00 AM.", label: "Note for the agents", draft: "Approved. Keep the rain sound in the first 2 seconds, and show the serum label clearly in remake B.", confirm: "Approve all 6", pending: "Approving 6 drafts", done: "6 drafts approved", desc: "Kalma's posts start at 11:00 AM.", task: "approve" },
                trend: { kicker: "Trend alert · ulan ootd", title: "Brief the agents", to: "Goes to the agents on Pods 02 and 04 for the Lakad Footwear accounts.", label: "Brief", draft: "Ride \"ulan ootd\" today on both Lakad accounts. Open on wet pavement and the shoes, not a face. Under 20 seconds, post by 6 PM before the evening rain.", confirm: "Send to agents", pending: "Sending the brief", done: "Brief sent to 2 agents", desc: "Drafts come back for review by 2 PM.", task: "ulan" }
            },
            actions: {
                reconnect: { pending: "Reconnecting Pod 07", done: "Pod 07 reconnected", desc: "3 failed runs are queued again.", task: "pod07" }
            },
            details: {
                pod07: { kicker: "Pod 07 · Run failed", title: "Pod 07 lost its TikTok login", status: "3 runs failed", tone: "danger", facts: [["Pod", "Pod 07"], ["Phones", "31 to 34"], ["Failed runs", "3"], ["First error", "2:14 AM"]], thread: [["2:14 AM", "Phone 31 failed", "TikTok asked for a new login."], ["2:15 AM", "Phones 32 and 33 failed", "Same login error."], ["2:16 AM", "Agent paused the pod", "To keep the accounts safe."], ["Now", "Waiting for you", "Reconnect to queue the 3 runs again."]], action: { label: "Reconnect Pod 07", action: "reconnect" } }
            },
            mobileDetail: "pod07"
        },

        brand: {
            id: "brand",
            label: "Brand",
            person: { name: "Carla Mendoza", title: "Growth lead, Kalma Skincare", initials: "CM" },
            nav: [
                {
                    group: "Today",
                    items: [
                        { id: "overview", label: "Overview", icon: "layers", modules: ["summary", "highlight", "needs", "ads"] },
                        { id: "brief", label: "Brief", icon: "sun", modules: ["summary", "needs"] },
                        { id: "overnight", label: "Overnight", icon: "moon", modules: ["highlight"] }
                    ]
                },
                { id: "content", label: "Content", icon: "trending", modules: ["trends"] },
                { id: "sales", label: "Sales", icon: "bag", modules: ["sales", "ads"], count: "1 alert", tone: "danger" },
                { id: "studio", label: "Studio", icon: "inbox", modules: ["requests"], count: "3" },
                { id: "assistant", label: "Assistant", icon: "sparkles", modules: ["runlog"], count: "5:40 AM" }
            ],
            tabs: [
                { id: "today", label: "Today", icon: "sun" },
                { id: "sales", label: "Sales", icon: "bag", badge: "1" },
                { id: "requests", label: "Requests", icon: "inbox", badge: "3" },
                { id: "assistant", label: "Assistant", icon: "sparkles" }
            ],
            layout: [
                { cols: "1", slots: [{ m: "summary", tab: "today" }] },
                { cols: "main-side", slots: [{ stack: [{ m: "highlight", tab: "today" }, { m: "ads", tab: "sales" }] }, { m: "needs", tab: "today" }] },
                { cols: "2", slots: [{ m: "sales", tab: "sales" }, { m: "requests", tab: "requests" }] },
                { cols: "2", slots: [{ m: "trends", tab: "requests" }, { m: "runlog", tab: "assistant" }] }
            ],
            note: { prepared: "Prepared by your assistant at 5:40 AM", from: "from 412 orders, 4 ad sets and 18 videos" },
            summary: [
                { id: "sales", label: "TikTok Shop sales yesterday", value: 184320, prefix: "₱", delta: "22%", tone: "success", arrow: "up", note: "Mock TikTok Shop data", icon: "bag" },
                { id: "orders", label: "Orders", value: 412, delta: "18%", tone: "success", arrow: "up", note: "138 from one video", icon: "receipt" },
                { id: "spend", label: "Meta Ads spend", value: 22400, prefix: "₱", delta: "4 ad sets", tone: "neutral", note: "Mock Meta Ads data", icon: "megaphone" },
                { id: "return", label: "Return on ad spend", value: 3.4, decimals: 1, suffix: "x", delta: "1 ad set at 1.2x", tone: "warning", note: "₱76,160 in sales from ads", icon: "chart" }
            ],
            highlight: {
                kicker: "Best seller yesterday · TikTok Shop",
                title: "Your rainy-day skincare routine sold ₱61,200 in 138 orders",
                lead: "The studio posted it at 9:10 PM. Sales came in two waves, at 10 PM and again after midnight when the video kept climbing.",
                takeaway: "Put more ad budget behind it while it is still climbing.",
                figures: [
                    { label: "Sales", value: "₱61,200", delta: "33% of the day", tone: "success" },
                    { label: "Orders", value: "138", delta: "3.2x usual", tone: "success" },
                    { label: "Views", value: "186,400", delta: "4.1x usual", tone: "success" }
                ],
                made: "Made by the studio's agent on Pod 03 from your rain brief.",
                bridge: { text: "On the studio's side, it is last night's top performer: 4.1x the account's usual views.", label: "See it as Studio", role: "studio" },
                chart: {
                    title: "Sales since posting",
                    unit: "in sales",
                    prefix: "₱",
                    labels: ["9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"],
                    values: [0, 9800, 21400, 26900, 38600, 47200, 53100, 57800, 61200]
                }
            },
            needs: [
                { id: "scripts", kicker: "Studio requests", due: "Before 10 AM", title: "Approve 3 scripts from the studio", sub: "Remakes of the rainy-day routine for your other two accounts, plus one for the serum launch.", quote: "Script 1: \"Umuulan na naman? Ito ang 3-step routine ko bago lumabas.\"", cite: "Script 1 of 3 · 28 sec · @kalmaskin.ph", primary: { label: "Approve 3 scripts", draft: "scripts" }, aside: "2 more after this", tile: null },
                { id: "budget", kicker: "Meta Ads", due: "Return 1.2x", title: "Move ₱5,000 to the rainy-day routine", sub: "\"Sunscreen broad\" returns 1.2x. \"Rainy-day routine\" returns 5.1x.", secondary: { label: "Move ₱5,000", action: "move" }, detail: "sunscreen" },
                { id: "brief", kicker: "Trend", due: "Rising fast", title: "Brief the studio on \"ulan ootd\"", sub: "Up 312% this week. Rain content is already selling for you.", secondary: { label: "Write a brief", draft: "brief" } }
            ],
            sales: {
                title: "TikTok Shop, by video",
                meta: "Yesterday · mock data",
                items: [
                    { id: "s1", title: "Rainy-day skincare routine", sales: "₱61,200", orders: 138, share: 33, tag: "4.1x views", tone: "success" },
                    { id: "s2", title: "Serum in 10 seconds", sales: "₱38,750", orders: 92, share: 21 },
                    { id: "s3", title: "Night routine, jeepney edition", sales: "₱27,900", orders: 61, share: 15 },
                    { id: "s4", title: "Ingredient myth #3", sales: "₱19,480", orders: 44, share: 11 },
                    { id: "s5", title: "14 other videos", sales: "₱36,990", orders: 77, share: 20 }
                ],
                total: "₱184,320 · 412 orders"
            },
            ads: {
                title: "Meta Ads, yesterday",
                meta: "Mock data",
                columns: ["Ad set", "Spend", "Return", "Status"],
                items: [
                    { id: "a1", name: "Rainy-day routine", spend: "₱8,200", ret: "5.1x", status: "Scale up", tone: "success" },
                    { id: "a2", name: "Serum launch", spend: "₱6,200", ret: "3.0x", status: "Healthy", tone: "neutral" },
                    { id: "a3", name: "Sunscreen broad", spend: "₱5,000", ret: "1.2x", status: "Low return", tone: "danger", detail: "sunscreen" },
                    { id: "a4", name: "Retargeting", spend: "₱3,000", ret: "3.2x", status: "Healthy", tone: "neutral" }
                ],
                total: ["Total", "₱22,400", "3.4x"]
            },
            requests: {
                title: "Studio requests",
                meta: "3 open",
                items: [
                    { id: "rq1", title: "Rainy-day routine remakes", status: "Waiting for you", tone: "warning", note: "3 scripts ready" },
                    { id: "rq2", title: "Serum launch, week 2", status: "In production", tone: "info", note: "Drafts due Fri" },
                    { id: "rq3", title: "Sunscreen myths series", status: "Picking trends", tone: "neutral", note: "Briefed Nov 10" }
                ]
            },
            trends: {
                title: "Trending in skincare",
                meta: "Mock trend scan",
                items: [
                    { id: "t1", term: "ulan ootd", growth: "312%", fit: "Next door to skincare. Worth a brief.", tone: "success" },
                    { id: "t2", term: "rainy-day skincare", growth: "184%", fit: "Your best seller rides it", tone: "success" },
                    { id: "t3", term: "glass skin under ₱500", growth: "96%", fit: "Fits the serum launch", tone: "success" },
                    { id: "t4", term: "sunscreen myths", growth: "41%", fit: "Series already briefed", tone: "success" },
                    { id: "t5", term: "10-step routine", growth: "12%", fit: "Cooling off", tone: "neutral" }
                ]
            },
            runlog: {
                title: "How this brief was made",
                summary: "5 steps · 3 min 48 s",
                steps: [
                    { time: "5:36 AM", text: "Read yesterday's 412 TikTok Shop orders", sources: ["Demo data"] },
                    { time: "5:37 AM", text: "Matched the orders to 18 videos", sources: ["Studio post log"] },
                    { time: "5:38 AM", text: "Pulled spend and return for 4 ad sets", sources: ["Mock Meta Ads"] },
                    { time: "5:39 AM", text: "Checked rising searches in skincare", sources: ["Mock trend scan"] },
                    { time: "5:40 AM", text: "Wrote this brief, flagged 1 ad set", sources: [] }
                ],
                errorAt: 2,
                errorText: "Could not read ad spend. Stopped here."
            },
            notifications: [
                { id: "n1", tone: "danger", icon: "alert", title: "Sunscreen broad dropped to 1.2x return", sub: "Meta Ads · 5:40 AM", unread: true },
                { id: "n2", tone: "success", icon: "trending", title: "Rainy-day routine passed ₱60,000", sub: "138 orders · 4:52 AM", unread: true },
                { id: "n3", tone: "warning", icon: "clock", title: "3 scripts are waiting for you", sub: "From the studio · before 10 AM", unread: true },
                { id: "n4", tone: "info", icon: "sparkles", title: "Your brief is ready", sub: "412 orders read · 5:40 AM", unread: false },
                { id: "n5", tone: "neutral", icon: "film", title: "The studio posted 46 videos for you", sub: "Overnight · 4 accounts", unread: false }
            ],
            drafts: {
                scripts: { kicker: "From the studio · 3 scripts", title: "Approve 3 scripts", to: "The studio makes them today and sends drafts by 2 PM.", label: "Note for the studio", draft: "Approved. Keep the rain sound and the jeepney window. For the serum script, show the price in the first 3 seconds.", confirm: "Approve all 3", pending: "Approving 3 scripts", done: "3 scripts approved", desc: "Drafts come back by 2 PM.", task: "scripts" },
                brief: { kicker: "Trend · ulan ootd", title: "Brief the studio", to: "Goes to Migs Santos at the studio.", label: "Brief", draft: "Can we try \"ulan ootd\" for Kalma? Rainy commute, then the 3-step routine at the office. Under 25 seconds, product in daylight, price on screen.", confirm: "Send brief", pending: "Sending your brief", done: "Brief sent to the studio", desc: "Migs usually replies within the hour.", task: "brief" }
            },
            actions: {
                move: { undo: true, done: "Budget moved: ₱5,000", desc: "From Sunscreen broad to Rainy-day routine.", undone: "Budget move undone", undoneDesc: "Both ad sets are back to yesterday's budget.", task: "budget" }
            },
            details: {
                sunscreen: { kicker: "Meta Ads · Ad set", title: "Sunscreen broad", status: "Return 1.2x", tone: "danger", facts: [["Spend yesterday", "₱5,000"], ["Return", "1.2x"], ["Orders", "9"], ["Running since", "Nov 3"]], thread: [["Nov 3", "Started", "Broad audience, sunscreen hero video."], ["Nov 9", "Return fell below 2x", "Same video, tired audience."], ["Today", "Suggested", "Move ₱5,000 to Rainy-day routine at 5.1x."]], action: { label: "Move ₱5,000", action: "move" } }
            },
            mobileDetail: "sunscreen"
        }
    }
};

export type Data = typeof DATA;
export type RoleId = keyof Data["roles"];
