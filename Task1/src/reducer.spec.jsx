import reducer from './reducer';
import { Map } from 'immutable';

describe('reducer', () => {
    it('', () => {
        expect(
            reducer(Map(), {
                type: 'INIT',
                state: { xyz: 'xyz' }
            })
        ).toEqual(Map({ xyz: 'xyz' }));
    })
})

