const createServiceMap = (
    envConfig: EnvConfig,
    serviceConfig: ServiceConfig[],
) => {
    const serviceMap = new Map<string, Service<InfoData>[]>();

    serviceConfig.forEach(({ exclude = [], url, name, service, repo }) => {
        Object.entries(url).forEach(([area, urlTemplate]) => {
            envConfig[area].forEach(env => {
                if (exclude.includes(env)) return;

                const serviceObj: Service<InfoData> = {
                    name,
                    service,
                    env,
                    // url: urlTemplate.replace("{env}", env),
                    url: "http://localhost:3030/m/info",
                    repo,
                    request: {
                        data: null,
                        isLoading: false,
                        error: null
                    },
                };

                const existingServices = serviceMap.get(env) || [];
                existingServices.push(serviceObj);
                serviceMap.set(env, existingServices);
            });
        });
    });

    return serviceMap;
}

export default createServiceMap;