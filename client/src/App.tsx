import React, { useEffect, useState } from "react";
import "./App.scss";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import Filters from "./components/Filters";
import Chart from "./components/Chart";

type Unit = {
    _id: number;
    count: number;
};
type filters = {
    productId?: string | null;
    productCode?: string | null;
    minYear?: number | null;
    maxYear?: number | null;
    minImport?: number | null;
    maxImport?: number | null;
    minExport?: number | null;
    maxExport?: number | null;
    location?: string | null;
    partner?: string | null;
};

function App() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number | string>("");
    const [filters, setFilters] = useState<filters>({
        productId: null,
        productCode: null,
        minYear: null,
        maxYear: null,
        minImport: null,
        maxImport: null,
        minExport: null,
        maxExport: null,
        location: null,
        partner: null,
    });
    const [order, setOrder] = useState<string>("asc");
    const [cat, setCat] = useState<string>("location_code");
    const [stats, setStats] = useState<Unit[]>([]);

    async function getData() {
        try {
            setIsLoading(true);
            fetch(
                `/all?` +
                    new URLSearchParams({
                        minYear: filters!.minYear?.toString() || "1962",
                        maxYear: filters!.maxYear?.toString() || "2019",
                        minImport: filters!.minImport?.toString() || "0",
                        maxImport:
                            filters!.maxImport?.toString() || "176932483072",
                        minExport: filters!.minExport?.toString() || "0",
                        maxExport:
                            filters!.maxExport?.toString() || "176932483072",
                        location: filters!.location || "",
                        partner: filters!.partner || "",
                        productCode: filters!.productCode || "",
                        productId: filters!.productId || "",
                        order: order || "asc",
                        cat: cat || "location_code",
                        page: page!.toString(),
                    })
            )
                .then((res) => res.json())
                .then((res) => {
                    setData(res);
                    setIsLoading(false);
                });
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetch(`/pageCount`), fetch(`/stats`)])
            .then((allResponses) => {
                return Promise.all(allResponses.map((res) => res.json()));
            })
            .then((allData) => {
                setPageCount(allData[0]);
                setStats(allData[1]);
                setIsLoading(false);
            });
        console.log("did mount");
    }, []);

    useEffect(() => {
        console.log("get data");
        getData();
        //eslint-disable-next-line
    }, [page, cat, order, filters]);

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <div className="App">
            <Filters
                getFiltered={(e) => {
                    setFilters(e);
                }}
            />
            <Navigation
                maxPages={pageCount! || "Estimating...  "}
                page={page || 1}
                setPage={(i) => {
                    setPage(i);
                }}
            />
            {isLoading ? (
                <div className="center text-holder">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <>
                    <Table
                        data={data || []}
                        page={page || 1}
                        sequence={order || "asc"}
                        cat={cat || "location_code"}
                        sort={(i) => {
                            if (order === "asc" && i === cat) {
                                setOrder("desc");
                            } else {
                                setOrder("asc");
                            }
                            setCat(i);
                        }}
                    />
                </>
            )}
            <Navigation
                maxPages={pageCount || "Estimating...  "}
                page={page || 1}
                setPage={(i) => {
                    setPage(i);
                }}
            />
            <Chart
                width={600}
                height={500}
                mainColor={"#4fc3a1"}
                stats={stats.sort((a, b) => {
                    return a._id - b._id;
                })}
            />
        </div>
    );
}

export default App;
