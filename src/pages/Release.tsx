import Header from "../components/common/Header.tsx";
import release from "../configs/release.yaml";
import { useState } from "react";
import { createActionSet, createLinkAction } from "../services/create-action.ts";

const Release = () => {
    const {links} = release;

    // Used to track when a reload is triggered
    const [isLoading, setLoading] = useState(false);

    const reload = () => {
        if (!isLoading) {
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
        }
    }

    const actionSet: ActionSet[] = [
        createActionSet("Links", links.map((link: LinkConfig) => createLinkAction(link))),
    ]

    return (
        <>
            <Header heading={{title: "Release Management", refresh: {isLoading, reload}}}
                    actions={{actionSet}}
            />
        </>
    );
}

export default Release;