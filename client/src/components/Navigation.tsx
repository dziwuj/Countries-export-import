import React, { FunctionComponent, useState } from "react";

type Props = {
    maxPages: number | string;
    page: number;
    setPage: (page: number) => void;
};

const Navigation: FunctionComponent<Props> = ({ maxPages, page, setPage }) => {
    const [currentPage, setCurrentPage] = useState<number>(page);
    return (
        <div className="navigation">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setPage(currentPage);
                }}
            >
                <label>Page: </label>
                <input
                    type="number"
                    min="1"
                    value={currentPage}
                    onChange={(e) => {
                        setCurrentPage(parseInt(e.target.value));
                    }}
                />
                <span> / </span>
                <span>{maxPages}</span>
                <button type="submit">Go to</button>
            </form>
        </div>
    );
};
export default Navigation;
