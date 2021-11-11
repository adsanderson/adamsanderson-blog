import { createMachine } from "xstate";

export const tagsMachine = createMachine({
    id: "tags",
    initial: "start",
    context: {
        tags: [],
        selectedTags: [],
    },
    states: {
        start: {
            invoke: {
                id: 'getFiles',
                src: 'getFiles',
                onDone: {
                    target: 'success',
                    // actions: assign({ user: (context, event) => event.data })
                },
                onError: {
                    target: 'failure',
                    // actions: assign({ error: (context, event) => event.data })
                }
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: { target: 'start' }
            }
        }
    },
});







