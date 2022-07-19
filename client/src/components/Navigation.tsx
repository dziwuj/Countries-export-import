import React, { useState, useEffect, Fragment } from "react";

type Props = {
    maxPages: number;
    page: number;
    setPage: (page: number) => void;
};

const Navigation: React.FC<Props> = ({ maxPages, page, setPage }) => {
    const [currentPage, setCurrentPage] = useState<number>(page);
    return (
        <div className="pagination">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setPage(currentPage);
                }}
            >
                <label>Page:</label>
                <input
                    type="number"
                    min="1"
                    max={maxPages}
                    value={currentPage}
                    onChange={(e) => {
                        setCurrentPage(parseInt(e.target.value));
                    }}
                />
                <span>/</span>
                <span>{maxPages}</span>
                <button type="submit">Go to</button>
            </form>
        </div>
    );
};
export default Navigation;