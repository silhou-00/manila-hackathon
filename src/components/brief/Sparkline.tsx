// Small trend line for one client: the last seven nights of views, scrubbable like the area chart.

import { AreaChart } from "./AreaChart";

type SparklineProps = { values: number[]; unit: string };

const NIGHTS = ["6 nights ago", "5 nights ago", "4 nights ago", "3 nights ago", "2 nights ago", "Yesterday", "Last night"];

export function Sparkline({ values, unit }: SparklineProps) {
    return <AreaChart spark className="chart--spark" values={values} labels={NIGHTS} unit={unit} label="Views, last 7 nights" />;
}
