import "../styles/backend.sass";
import Header from "../components/common/Header.tsx";
import backend from "../configs/backend.yaml";
import { createActionSet, createLinkAction } from "../services/create-action.ts";
import { useMemo, useState } from "react";
import useFilter from "../hooks/useFilter.ts";
import createServiceMap from "../services/create-service-map.ts";
import ServiceTable from "../components/ServiceTable.tsx";

const Backend = () => {
    const {envs, links, services} = backend as BackendConfig;

    // Create the services
    const serviceMap: Map<string, Service<InfoData>[]> = createServiceMap(envs, services)

    // Flatten envs object to use for filtering
    const flattenedEnvs: string[] = useMemo(() => Object.values(envs).flat() as unknown as string[], [envs]);

    // Create Filter parameters
    const {filtered: selectedEnvs, setFiltered: setSelectedEnvs, createFilterAction} = useFilter("envs", flattenedEnvs)

    // Create the actions for the header
    const actionSet: ActionSet[] = [
        createActionSet("Links", links.map((link: LinkConfig) => createLinkAction(link))),
        createActionSet("Filter", flattenedEnvs.map((env: string) => createFilterAction(env)))
    ]

    // Configure the filter
    const filterConfig: FilterConfig = {
        filtered: selectedEnvs,
        selectAll: () => setSelectedEnvs(flattenedEnvs),
        selectNone: () => setSelectedEnvs([])
    }

    // Used to track when a reload is triggered
    const [isLoading, setLoading] = useState(false);

    const reload = () => {
        if (!isLoading) {
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
        }
    }

    return (
        <>
            <Header heading={{title: "Backend Services", refresh: {isLoading, reload}}}
                    actions={{actionSet, filterConfig}}
            />
            <div className="content-wrapper">
                {/* Filter just hides the service, so that its data does not need reloading when reactivated */}
                {flattenedEnvs.map((env, index) => {
                    const services = serviceMap.get(env) || [];
                    return (
                        <ServiceTable className={`service-table ${selectedEnvs.includes(env)}`}
                                      key={index}
                                      env={env}
                                      services={services}
                                      reload={isLoading}
                                      style={{display: selectedEnvs.includes(env) ? "" : "none"}}
                        />
                    )
                })}
            </div>
        </>
    );
}

export default Backend;