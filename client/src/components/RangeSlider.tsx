import { useState, FunctionComponent, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function valuetext(value: number) {
    return `${value}`;
}

type Props = {
    min: number;
    max: number;
    id: string;
    callback: (value: number[]) => void;
};

const RangeSlider: FunctionComponent<Props> = ({ min, max, id, callback }) => {
    const [value, setValue] = useState<number[]>([min, max]);
    // const input_min = useRef(second);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        const a = document.getElementById(`${id}-min`)! as HTMLInputElement;
        a.value = value[0].toString();
        const b = document.getElementById(`${id}-max`)! as HTMLInputElement;
        b.value = value[1].toString();
    };

    useEffect(() => {
        callback(value);
        // eslint-disable-next-line
    }, [value]);

    return (
        <>
            <Box sx={{ width: 300 }}>
                <ThemeProvider
                    theme={createTheme({
                        palette: { primary: { main: "#4fc3a1" } },
                    })}
                >
                    <Slider
                        getAriaLabel={() => "Range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={min}
                        max={max}
                    />
                </ThemeProvider>
            </Box>
            <div className="number-input">
                <div className="min">
                    <label htmlFor="min">Min: </label>
                    <input
                        type="number"
                        name="min"
                        defaultValue={min}
                        id={`${id}-min`}
                        onChange={(e) => {
                            if (parseInt(e.target.value) <= value[1]) {
                                setValue([parseInt(e.target.value), value[1]]);
                            } else {
                                setValue([parseInt(e.target.value), max]);
                            }
                        }}
                    />
                </div>
                <div className="max">
                    <label htmlFor="max">Max: </label>
                    <input
                        type="number"
                        name="max"
                        defaultValue={max}
                        id={`${id}-max`}
                        onChange={(e) => {
                            if (parseInt(e.target.value) >= value[0]) {
                                setValue([value[0], parseInt(e.target.value)]);
                            } else {
                                setValue([min, parseInt(e.target.value)]);
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default RangeSlider;
