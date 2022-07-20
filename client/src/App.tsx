import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import Navigation from "./components/Navigation";
import Table from "./components/Table";

interface IProps {}

interface IState {
    data?: any[];
    isLoading?: boolean;
    page?: number;
    pageCount?: number;
    filters?: {
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
        };
    }
    componentDidMount() {
        this.getPageCount();
        // this.getAllRecords();
        this.getFiltered();
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    async getAllRecords() {
        this.setState({ ...this.state, isLoading: true });
        fetch(`/all/${this.state.page}`)
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
        console.log(this.state.filters);
        this.setState({ ...this.state, isLoading: true });
        fetch(`/filter/${this.state.page}`, {
            method: "POST",
            body: JSON.stringify(this.state.filters),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res, isLoading: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ ...this.state, isLoading: false });
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

                        <Table data={this.state.data || []} />

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
