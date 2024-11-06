import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useFilter = (
    name: string,
    data: string[]
) => {
    const location = useLocation();
    const [filtered, setFiltered] = useState<string[]>(data);

    // on initial load, check if data is in URL. Apply filter if so
    useEffect(() => {
        const urlData = new URLSearchParams(location.search)
            .getAll(name)
            .flatMap(data => data.split(','))
            .filter(data => data.includes(data));

        // maintain order of filtered
        const selected = filtered.map(data => urlData.includes(data) ? data : '');

        // if navigating to page without data selected, select all
        if (!selected.some(Boolean)) {
            setFiltered(data);
        } else {
            setFiltered(selected);
        }
    }, [location.search, data]);

    // update URL when filter changes
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(name, filtered.filter(Boolean).join(','));

        // remove ?data= if none selected
        const newUrl = searchParams.get(name) ?
            `/#${location.pathname}?${searchParams}` :
            `/#${location.pathname}`;
        window.history.replaceState({}, '', newUrl);
    }, [filtered, location.search]);

    // create filter action for use in Actions component
    function createFilterAction(name: string): Action {
        return {
            name,
            action: () => {
                const index = data.indexOf(name);
                const updated = [...filtered];
                updated[index] = filtered.includes(name) ? "" : name;
                setFiltered(updated);
            }
        }
    }

    return { filtered, setFiltered, createFilterAction };
}

export default useFilter;