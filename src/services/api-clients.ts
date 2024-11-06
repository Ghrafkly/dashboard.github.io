import axios, { AxiosResponse } from "axios";

async function fetchServiceInfo(services: Service<InfoData>[]): Promise<Service<InfoData>[]> {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.timeout = 5000;

    const requests = services.map(service => axios.get(service.url).then(
        res => ({ status: "fulfilled", value: res }),
        err => ({ status: "rejected", reason: err })
    ));

    const results = await Promise.allSettled(requests);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            if (result.value.status === "fulfilled") {
                // @ts-ignore
                services[index].request.data = result.value?.value.data;
            } else {
                // @ts-ignore
                services[index].request.error = result.value.reason.message;
            }
        } else {
            services[index].request.error = result.reason
        }
        services[index].request.isLoading = false;
    });


    return services;
}

export { fetchServiceInfo };