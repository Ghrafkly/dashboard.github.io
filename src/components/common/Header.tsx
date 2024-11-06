import "../../styles/header.sass"
import Actions, { ActionsProps } from "./Actions.tsx";
import { FaArrowRotateRight } from "react-icons/fa6";

interface LoadProps {
    isLoading: boolean;
    reload: () => void;
}

interface HeaderProps {
    heading: {
        title: string;
        refresh?: LoadProps;
    };
    actions: ActionsProps;
}

const Header = ({heading: {title, refresh}, actions: {actionSet, filterConfig}}: HeaderProps) => (
    <header>
        <span id="header-title">
            <h1>{title}</h1>
            {refresh?.reload &&
                <div className="spinner" onClick={refresh.reload}>
                    <FaArrowRotateRight className={`reload ${refresh.isLoading}`} />
                </div>
            }
        </span>
        <div id="header-actions">
            <Actions actionSet={actionSet} filterConfig={filterConfig}/>
        </div>
    </header>
)


export default Header;