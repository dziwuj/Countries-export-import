import React, { useState, useEffect, Fragment } from "react";

type Props = {
    data: any[];
};

const Table: React.FC<Props> = ({ data }) => {
    const [table, setTable] = useState<any[]>([]);

    useEffect(() => {
        setTable(data);
        console.log(data);
    }, [data]);
    return (
        <table className="fl-table">
            <thead>
                <tr>
                    <th>location_code</th>
                    <th>partner_code</th>
                    <th>product_id</th>
                    <th>sitc_product_code</th>
                    <th>import_value</th>
                    <th>export_value</th>
                    <th>year</th>
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
    );
};

export default Table;
