import React, { Fragment } from "react";

export default function JSONSpecificationTable({ data }) {
    return (
        <div className="overflow-x-auto">
            {data?.map((table, i) => (
                <table key={i} className="table w-full">
                    <thead>
                        <tr>
                            <th
                                className="rounded-none bg-primary text-base-100"
                                colspan="2"
                            >
                                {table.heading}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, j) => (
                            <tr key={j}>
                                <td>{row.key}</td>
                                {typeof row.value == "object" ? (
                                    <td>
                                        {row.value.map((r, k) => (
                                            <div key={k}>{r}</div>
                                        ))}
                                    </td>
                                ) : (
                                    <td className="whitespace-pre-line">
                                        {row.value}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
}
