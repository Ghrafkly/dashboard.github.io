const createActionSet = (title: string, actions: Action[]): ActionSet => ({ title, actions });

const createLinkAction = (link: LinkConfig): Action => ({
    name: link.name,
    action: () => window.open(link.url)
})

export { createActionSet, createLinkAction };