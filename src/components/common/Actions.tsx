import "../../styles/actions.sass";
import { FaCircleQuestion } from "react-icons/fa6";

export interface ActionsProps {
    actionSet: ActionSet[];
    filterConfig?: FilterConfig;
}

const Actions = ({actionSet, filterConfig}: ActionsProps) => {
    const { filtered = [], selectAll = () => {}, selectNone = () => {} } = filterConfig || {};

    return (
        <>
            {actionSet.map((actionSet, index) => {
                const {title, actions} = actionSet;

                // Enforce a maximum of 2 rows for a group of actions
                const halfElements = Math.ceil(actions.length / 2);
                const asPercentage = 100 / halfElements;

                return (
                    <div key={index} id={title} className="actions">
                        <span className="actions-title">
                            <div>
                                {title}
                                {title === "Filter" && <FaCircleQuestion className="help-icon"/>}
                            </div>
                            {title === "Filter" &&
                                <div className="selector-group">
                                    <button className="selected" title="all" onClick={selectAll}>
                                        All
                                    </button>
                                    <button className="not-selected" title="none" onClick={selectNone}>
                                        None
                                    </button>
                                </div>
                            }
                        </span>
                        <hr/>
                        <div className="action-group">
                            {actions.map(({name, action}, index) => {
                                let className = '';
                                if (title === "Filter") {
                                    className = filtered.includes(name) ? 'selected' : 'not-selected';
                                }

                                return (
                                    <button key={index}
                                            className={className}
                                            title={name}
                                            onClick={() => action()}
                                            style={{flex: `1 0 calc(${asPercentage}% - 5px)`}}
                                    >
                                        {name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default Actions;