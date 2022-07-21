import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import Filters from "./components/Filters";

interface IProps {}

interface IState {
    data?: any[];
    isLoading?: boolean;
    page: number;
    pageCount: number;
    filters: {
        productId?: number | null;
        productCode?: string | null;
        minYear?: number | null;
        maxYear?: number | null;
        minImport?: number | null;
        maxImport?: number | null;
        minExport?: number | null;
        maxExport?: number | null;
        location?: string | null;
        partner?: string | null;
        rowsPerPage?: number;
    };
    order: string;
    cat: string;
}

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            page: 1,
            pageCount: 50,
            filters: {
                productId: null,
                productCode: null,
                minYear: 2018,
                maxYear: 2018,
                minImport: null,
                maxImport: null,
                minExport: null,
                maxExport: null,
                location: null,
                partner: null,
                rowsPerPage: 50,
            },
            order: "asc",
            cat: "location_code",
        };
    }
    componentDidMount() {
        this.getPageCount();
        this.getAllRecords();
        // this.getFiltered();
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    async getAllRecords() {
        this.setState({ ...this.state, isLoading: true });
        console.log(this.state.order, this.state.cat, this.state.page);
        fetch(
            `/sort?` +
                new URLSearchParams({
                    order: this.state.order || "asc",
                    cat: this.state.cat || "location_code",
                    page: this.state.page!.toString(),
                })
        )
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res, isLoading: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ ...this.state, isLoading: false });
            });
    }

    async getFiltered() {
        // this.setState({ ...this.state, isLoading: true });
        console.log(this.state.order, this.state.cat, this.state.page);
        fetch(
            `/filter?` +
                new URLSearchParams({
                    minYear: this.state.filters!.minYear?.toString() || "1962",
                    maxYear: this.state.filters!.maxYear?.toString() || "2018",
                    minImport: this.state.filters!.minImport?.toString() || "0",
                    maxImport:
                        this.state.filters!.maxImport?.toString() ||
                        "176932483072",
                    minExport: this.state.filters!.minExport?.toString() || "0",
                    maxExport:
                        this.state.filters!.maxExport?.toString() ||
                        "176932483072",
                    location: this.state.filters!.location || "",
                    partner: this.state.filters!.partner || "",
                    page: this.state.page!.toString(),
                })
        )
            .then((res) => res.json())
            .then((res) => {
                // this.setState({ data: res, isLoading: false });
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                // this.setState({ ...this.state, isLoading: false });
            });
    }

    async getPageCount() {
        this.setState({ ...this.state, isLoading: true });
        fetch(`/pageCount`)
            .then((res) => res.json())
            .then((res) => {
                console.log("number:" + res);
                this.setState({ pageCount: parseInt(res), isLoading: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ ...this.state, isLoading: false });
            });
    }

    render() {
        return (
            <div className="App">
                <Filters
                    getFiltered={(e) => {
                        this.setState({ ...this.state, filters: e });
                    }}
                />
                {this.state.isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <Navigation
                            maxPages={Math.ceil(
                                this.state.pageCount! /
                                    this.state.filters!.rowsPerPage!
                            )}
                            page={this.state.page || 1}
                            setPage={(i) => {
                                this.setState({ page: i }, () => {
                                    this.getAllRecords.bind(this)();
                                });
                            }}
                        />

                        <Table
                            data={this.state.data || []}
                            page={this.state.page || 1}
                            sequence={this.state.order || "asc"}
                            cat={this.state.cat || "location_code"}
                            sort={(i) => {
                                if (
                                    this.state.order === "asc" &&
                                    i === this.state.cat
                                ) {
                                    this.setState({ order: "desc" });
                                } else {
                                    this.setState({ order: "asc" });
                                }
                                this.setState({ cat: i }, () => {
                                    this.getAllRecords.bind(this)();
                                });
                            }}
                        />

                        <Navigation
                            maxPages={Math.ceil(
                                this.state.pageCount! /
                                    this.state.filters!.rowsPerPage!
                            )}
                            page={this.state.page || 1}
                            setPage={(i) => {
                                this.setState({ page: i }, () => {
                                    this.getAllRecords.bind(this)();
                                });
                            }}
                        />
                    </>
                )}
            </div>
        );
    }
}

export default App;
