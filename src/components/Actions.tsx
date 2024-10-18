import "../styles/actions.sass";

interface ActionsProps {
    title: string;
    help?: string;
    selectors?: boolean;

    actionTags: string[][];
    onAction: (action: string) => void;

    columns: number;
}

const Actions = ({
    title,
    selectors = false,
    actionTags,
    onAction,
    columns
}: ActionsProps) => {

    /*
    actionTags can be an array of arrays of strings. Each array of strings is a group of actions.
    For example, actionTags can be:
    [
        ["DEV1", "DEV2", "DEV3", "DEV4"],
        ["E2E", "E2E2", "E2E4"],
        ["QA1", "QA2"],
        ["PROD"]
    ]

    The columns prop is the number of columns to display. For example, columns=2 will display 2 columns.
    This means that the actions will be displayed in 2 columns. i.e.

    | COL1  |  COL2 |
    |-------|-------|
    | DEV1 DEV2 DEV3 DEV4 |  E2E E2E2 E2E4 |
    | QA1 QA2             | PROD           |

    To ensure that the actions are aligned with each other, we need to calculate the number of columns for each group.
    The number of columns for each group is calculated by finding the maximum number of actions in a group.
    In the example above, the maximum number of actions in a group is 4. Therefore the number of columns for each group is 4.

    Each cell will be the same length as the longest action in the tags.

    Action groups that have less than the maximum number of actions will have empty cells to align the actions.

     */

    // Find the maximum number of columns for each group. Based on the group with the most actions.
    const maxColumnsForActionGroup = Math.max(...actionTags.map(group => group.length));

    // Find the longest action in the tags.
    const longestAction = Math.max(...actionTags.flat().map(action => action.length));


    return (
        <div id="actions">
            <span>{ title }</span>
            <hr/>
            <div id="actions-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
                {
                    actionTags.map((group, index) => {
                        return (
                            <div key={index}
                                 className="action-group"
                                 style={{ gridTemplateColumns: `repeat(${maxColumnsForActionGroup}, 1fr)`}}
                            >
                                {
                                    group.map((action, index) => {
                                        return (
                                            <button key={index} onClick={() => onAction(action)}>
                                                { action }
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

            </div>

        </div>

    )
}

export default Actions;