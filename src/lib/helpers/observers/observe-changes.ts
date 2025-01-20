interface Option {
    checker: () => boolean
    action: () => void
}

export default async function (options: Option[]) {
    const executedActions = new Set() // To keep track of executed actions

    const observer = new MutationObserver(() => {
        evaluateOptions(observer)
    })

    const evaluateOptions = (observer: any) => {
        options.forEach((option) => {
            if (!executedActions.has(option.action) && option.checker()) {
                option.action()
                executedActions.add(option.action)
                // Continue to check other options even if one is true, to ensure all necessary actions are taken.
            }
        })

        // Disconnect observer if all actions are executed
        if (executedActions.size === options.length) {
            observer.disconnect()
        }
    }

    evaluateOptions(observer)

    observer.observe(document.body, { childList: true, subtree: true })
}
