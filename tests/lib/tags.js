import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { interpret } from 'xstate';

import { tagsMachine } from '../../src/lib/Machines/tag.machine.js';


const testTagsMachine = tagsMachine.withConfig({
    services: {
        getFiles: () => new Promise(res =>
            setTimeout(() => res(["a", "b"]), 500)),
    }
});

test('Interpert machine', async () => {
    interpret(testTagsMachine)
        .onTransition((state) => {
            if (state.matches('success')) {
                assert.ok(true, state.value);
                assert.equal(state.value, 'success');
            }
        })
        .start();
});

test.run();