/// <reference types="vite/client" />
/// <reference types="@modyfi/vite-plugin-yaml/modules" />

// LinkConfig is an array of objects with a name and url property
// import { ReactNode } from "react";

type LinkConfig = {
    name: string;
    url: string;
}

type FilterConfig = {
    filtered: string[];
    selectAll: () => void;
    selectNone: () => void;
}

type Action = {
    name: string;
    action: () => void;
}

type ActionSet = {
    title: string;
    actions: Action[];
}

type ServiceConfig = {
    name: string;
    service: string;
    repo: string;
    exclude?: string[];
    url: {
        [env: string]: string;
    };
}

type EnvConfig = {
    [key: string]: string[];
}

type BackendConfig = {
    envs: EnvConfig;
    links: LinkConfig[];
    services: ServiceConfig[];
}

type Service<T> = {
    name: string
    service: string
    env: string
    url: string
    repo: string
    request: Data<T>
}

type InfoData = {
    git: {
        commit: {
            id: {
                abbrev: string
                full: string
            }
            time: string
        }
        branch: string
        build: {
            time: string
            version: string
        }
    }
}

type OctokitData = GitResponseDataTypeFromEndpointMethod<typeof octokit.request>

type Data<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
}
