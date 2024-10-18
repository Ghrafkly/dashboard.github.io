import "../styles/header.sass"
import Actions from "./Actions.tsx";

interface HeaderProps {
    title: string;
}

const Header = ({title}: HeaderProps) => {
    const envs = [
        ["DEV1", "DEV2", "DEV3", "DEV4"],
        ["E2E", "E2E2", "E2E4"],
        ["QA1", "QA2"],
        ["PROD"]
    ]



    return (
        <header>
            <h1>{ title }</h1>
            <Actions
                title="Filter"
                actionTags={ envs }
                onAction={ (action) => console.log(action) }
                columns={2}/>
        </header>
    );
}

export default Header;