import { FunctionComponent } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

type Unit = {
    _id: number;
    count: number;
};

type Props = {
    stats: Unit[];
    height: number;
    width: number;
    mainColor: string;
};

const Chart: FunctionComponent<Props> = ({
    stats,
    height,
    width,
    mainColor,
}) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <>
                    <div className="custom-tooltip">
                        <p className="label">{`${label}`}</p>
                        <p className="intro">{`transactions: ${payload[0].value}`}</p>
                        <div className="tooltip-background"></div>
                    </div>
                </>
            );
        }

        return null;
    };

    return (
        <div className="chart">
            <LineChart width={width} height={height} data={stats}>
                <Line dataKey="count" stroke={mainColor} type="monotone" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="_id" stroke={mainColor} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </div>
    );
};

export default Chart;
