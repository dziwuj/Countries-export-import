import React, { useState, useEffect, Fragment } from "react";

type Props = {
    data: any[];
    page: number;
    sequence: string;
    cat: string;
    sort: (cat: string) => void;
};

const Table: React.FunctionComponent<Props> = ({
    data,
    page,
    sequence,
    cat,
    sort,
}) => {
    const [table, setTable] = useState<any[]>([]);

    useEffect(() => {
        setTable(data);
    }, [data]);

    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th
                            onClick={() => {
                                sort("location_code");
                            }}
                        >
                            location_code
                            {sequence === "asc" && cat === "locaton_code" ? (
                                <>▲</>
                            ) : cat !== "location_code" ? null : (
                                <>▼</>
                            )}
                        </th>
                        <th
                            onClick={() => {
                                sort("partner_code");
                            }}
                        >
                            partner_code
                            {sequence === "asc" && cat === "partner_code" ? (
                                <>▲</>
                            ) : cat !== "partner_code" ? null : (
                                <>▼</>
                            )}
                        </th>
                        <th
                            onClick={() => {
                                sort("product_id");
                            }}
                        >
                            product_id
                            {sequence === "asc" && cat === "product_id" ? (
                                <>▲</>
                            ) : cat !== "product_id" ? null : (
                                <>▼</>
                            )}
                        </th>
                        <th
                            onClick={() => {
                                sort("sitc_product_code");
                            }}
                        >
                            sitc_product_code
                            {sequence === "asc" &&
                            cat === "sitc_product_code" ? (
                                <>▲</>
                            ) : cat !== "sitc_product_code" ? null : (
                                <>▼</>
                            )}
                        </th>
                        <th
                            onClick={() => {
                                sort("import_value");
                            }}
                        >
                            import_value
                            {sequence === "asc" && cat === "import_value" ? (
                                <>▲</>
                            ) : cat !== "import_value" ? null : (
                                <>▼</>
                            )}
                        </th>
                        <th
                            onClick={() => {
                                sort("export_value");
                            }}
                        >
                            export_value
                            {sequence === "asc" && cat === "export_value" ? (
                                <>▲</>
                            ) : cat !== "export_value" ? null : (
                                <>▼</>
                            )}
                        </th>
                        <th
                            onClick={() => {
                                sort("year");
                            }}
                        >
                            year
                            {sequence === "asc" && cat === "year" ? (
                                <>▲</>
                            ) : cat !== "year" ? null : (
                                <>▼</>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((item, i) => {
                        return (
                            <Fragment key={i}>
                                <tr>
                                    <td className="toggler">
                                        {item.location_code}
                                    </td>
                                    <td>{item.partner_code}</td>
                                    <td>{item.product_id}</td>
                                    <td>{item.sitc_product_code}</td>
                                    <td>{item.import_value}</td>
                                    <td>{item.export_value}</td>
                                    <td>{item.year}</td>
                                </tr>
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
