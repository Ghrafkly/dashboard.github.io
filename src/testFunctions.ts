import "./styles/service-table.sass";
import backend from "./configs/backend.yaml";
import createServiceMap from "./services/create-service-map.ts";
import { fetchServiceInfo } from "./services/api-clients.ts";

function serviceInfo() {
    const {envs, links, services} = backend as BackendConfig;

    // Create the services
    const serviceMap: Map<string, Service<InfoData>[]> = createServiceMap(envs, services)

    // @ts-ignore
    fetchServiceInfo(serviceMap.get("DEV1"))
        .then(services => {
            console.log(services);
        });

}

serviceInfo()