import React, { Fragment } from "react";

export default function JSONSpecificationTable({ data }) {
    return (
        <>
            {data?.data?.map((table, i) => (
                <table key={i}>
                    <thead>
                        <tr>
                            <th colspan="2">{table.header}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, j) => (
                            <tr key={j}>
                                <td>{row.key}</td>
                                {typeof row.val == "object" ? (
                                    <td>
                                        {row.val.map((r, k) => (
                                            <div key={k}>{r}</div>
                                        ))}
                                    </td>
                                ) : (
                                    <td>{row.val}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </>
    );
}
