import React, { useState, useEffect, FunctionComponent } from "react";
import RangeSlider from "./RangeSlider";

type Props = {
    getFiltered: (filters: {
        minYear?: number | null;
        maxYear?: number | null;
        minImport?: number | null;
        maxImport?: number | null;
        minExport?: number | null;
        maxExport?: number | null;
        location?: string | null;
        partner?: string | null;
    }) => void;
};

type ResultItem = {
    locations: string[];
    partners: string[];
};

const Filters: FunctionComponent<Props> = ({ getFiltered }) => {
    const [countries, setCountries] = useState<ResultItem>({
        locations: [],
        partners: [],
    });
    const [maxImport, setMaxImport] = useState<number>(-1);
    const [maxExport, setMaxExport] = useState<number>(-1);

    const [year, setYear] = useState<number[]>([1962, 2019]);
    const [importRange, setImportRange] = useState<number[]>([0, maxImport]);
    const [exportRange, setExportRange] = useState<number[]>([0, maxExport]);

    // const [loading, setLoading] = useState<boolean>(false);

    async function getCountries() {
        try {
            // setLoading(true);
            const response = await fetch(`/countries`);

            const json = await response.json();

            setCountries({
                locations: ["-", ...json.locations],
                partners: ["-", ...json.partners],
            });
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
        }
    }

    async function getMaxImport() {
        try {
            // setLoading(true);
            const response = await fetch(`/import`);

            const json = await response.json();

            setMaxImport(json[0].import_value);
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
        }
    }

    async function getMaxExport() {
        try {
            // setLoading(true);
            const response = await fetch(`/export`);

            const json = await response.json();

            setMaxExport(json[0].export_value);
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
        }
    }

    useEffect(() => {
        getCountries();
        getMaxImport();
        getMaxExport();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="filters">
            <h1>Filters</h1>
            {maxImport !== -1 &&
            maxExport !== -1 &&
            countries.partners !== [] &&
            countries.locations !== [] ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const loc = document.getElementById(
                            "locations"
                        ) as HTMLSelectElement;
                        const par = document.getElementById(
                            "partners"
                        ) as HTMLSelectElement;

                        getFiltered({
                            minYear: year[0],
                            maxYear: year[1],
                            minImport: importRange[0],
                            maxImport: importRange[1],
                            minExport: exportRange[0],
                            maxExport: exportRange[1],
                            location: loc.value === "-" ? null : loc.value,
                            partner: par.value === "-" ? null : loc.value,
                        });
                    }}
                >
                    {/* <label>Search : </label>
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                /> */}

                    <div className="countries">
                        <label htmlFor="locations">Locations: </label>
                        <select id="locations">
                            {countries.locations.map((item, i) => {
                                return (
                                    <option value={item} key={i}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>

                        <label htmlFor="partners">Partners: </label>
                        <select id="partners">
                            {countries.partners.map((item, i) => {
                                return (
                                    <option value={item} key={i}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <br />
                    <div className="range-sliders">
                        <label className="slider-label" htmlFor="year">
                            Year
                        </label>
                        <RangeSlider
                            id={"year"}
                            min={1962}
                            max={2019}
                            callback={(e) => {
                                setYear(e);
                            }}
                        />
                        <br />

                        <>
                            <label className="slider-label" htmlFor="import">
                                Import
                            </label>
                            <RangeSlider
                                id={"import"}
                                min={0}
                                max={maxImport}
                                callback={(e) => {
                                    setImportRange(e);
                                }}
                            />
                            <br />
                            <label className="slider-label" htmlFor="export">
                                Export
                            </label>
                            <RangeSlider
                                id={"export"}
                                min={0}
                                max={maxExport}
                                callback={(e) => {
                                    setExportRange(e);
                                }}
                            />
                        </>
                    </div>
                    <br />
                    <div className="button-holder">
                        <input
                            className="form-button"
                            type="submit"
                            value="search"
                        />
                    </div>
                </form>
            ) : (
                <h1>Waiting for data</h1>
            )}
        </div>
    );
};

export default Filters;
