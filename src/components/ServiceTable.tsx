import "../styles/service-table.sass";
import React, { useEffect, useRef, useState } from "react";
import { fetchServiceInfo } from "../services/api-clients.ts";
import { useQuery } from "react-query";
import { FaSpinner } from "react-icons/fa";
import { FaCircleCheck, FaRegCircle, FaSquareXmark } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import IconWithLink from "./common/IconWithLink.tsx";

interface ServiceTableProps {
    env: string
    services: Service<InfoData>[]
    reload: boolean
    style: React.CSSProperties
    className?: string
}

const ServiceTable = ({env, services, style, reload, className}: ServiceTableProps) => {
    const [rows, setRows] = useState<Service<InfoData>[]>(defaultData(services))
    const [isHovered, setIsHovered] = useState<Service<InfoData>>()
    const [loaded, setLoaded] = useState("")

    const loadServiceInfo = async () => {
        const updatedServices = await fetchServiceInfo(services);
        setRows(updatedServices);
    }

    // Load the data using react-query
    const {data, isLoading, refetch} = useQuery(env, loadServiceInfo)

    useEffect(() => {
        setLoaded("loading")
        setRows(data || defaultData(services));
    }, [reload]);

    // Reload the data when the reload prop changes
    const prevReload = useRef(false);
    useEffect(() => {
        if (prevReload.current && !isLoading) {
            refetch();
        }
        prevReload.current = reload;
    }, [reload, isLoading, refetch]);

    // Update the loaded count when the rows change
    useEffect(() => {
        const loadedCount = rows.filter(row => !row.request.isLoading && !row.request.error).length;
        const errorCount = rows.filter(row => row.request.error).length;
        const loadingCount = rows.filter(row => row.request.isLoading).length;

        if (loadedCount === rows.length) {
            setLoaded("success");
        } else if (errorCount < rows.length && errorCount > 0) {
            setLoaded("warning");
        } else if (loadingCount > 0) {
            setLoaded("loading");
        } else if (errorCount === rows.length) {
            setLoaded("error");
        }
    }, [rows]);

    return (
        <div style={style}
             className={`${className} ${loaded}`}
        >
            <p className="table-title">{env} {loaded}</p>
            <table>
                {/*<thead>*/}
                {/*<tr>*/}
                {/*    <th>Service</th>*/}
                {/*    <th>Branch</th>*/}
                {/*    <th>Commit</th>*/}
                {/*    <th>Build</th>*/}
                {/*    <th>Last Updated</th>*/}
                {/*    <th>Status</th>*/}
                {/*</tr>*/}
                {/*</thead>*/}
                <tbody>
                {rows.map((row, index) => {
                    const {name, request} = row;
                    const {data, isLoading, error} = request;
                    const {git} = data || {};

                    // console.log(name, data)

                    let icon;
                    let tooltip;

                    if (isLoading) {
                        icon = <FaSpinner className="loading"/>
                        tooltip = "Loading..."
                    } else if (error) {
                        icon = <FaSquareXmark className="error"/>
                        // icon = <FaRegCircle className="red"/>
                        tooltip = error
                    } else {
                        icon = <FaCircleCheck className="success"/>
                        icon = <FaRegCircle className="green"/>
                        tooltip = "Success"
                    }

                    return (
                        <tr key={index}
                            onMouseEnter={() => setIsHovered(row)}
                            onMouseLeave={() => setIsHovered(undefined)}
                        >
                            <td className="service">{name}</td>
                            <td className="branch">{git?.branch ?? "-"}</td>
                            <td className="gitID">{git?.commit.id.abbrev ?? "-"}</td>
                            <td className="version">{git?.build.version ?? "-"}</td>
                            <td className="updated">{git?.build.time ?? "-"}</td>
                            <td className="status" onClick={() => console.log("Status")}>

                                <IconWithLink
                                    className={`${env}${name}`}
                                    href={row.url}
                                    icon={icon}
                                />
                                <Tooltip className="tooltip"
                                         anchorSelect={`.${env}${name}`}
                                         place="right"
                                         isOpen={isHovered === row}
                                >
                                    {tooltip}
                                </Tooltip>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

// create default data to populate the table
const defaultData = (services: Service<InfoData>[]): Service<InfoData>[] => {
    return services.map(service => ({
        ...service,
        request: {
            data: null,
            isLoading: true,
            error: null
        }
    }));
};

export default ServiceTable;