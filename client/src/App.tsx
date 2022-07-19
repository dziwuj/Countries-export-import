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
    rowsPerPage?: number;
}

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            page: 1,
            pageCount: 50,
            rowsPerPage: 50,
        };
    }
    componentDidMount() {
        this.getPageCount();
        this.getList();
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    async getList() {
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
                        <Table data={this.state.data || []} />
                        <Navigation
                            maxPages={Math.ceil(
                                this.state.pageCount! / this.state.rowsPerPage!
                            )}
                            page={this.state.page || 1}
                            setPage={(i) => {
                                this.setState({ page: i }, () => {
                                    this.getList.bind(this)();
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
