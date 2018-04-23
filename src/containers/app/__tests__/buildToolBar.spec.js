import buildToolBar from '../buildToolBar';
import clientToolBar from '../../client/toolbar';

describe('buildToolBar', () => {
  it('Тест на /client', () => {
    clientToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/client', state);
    expect(clientToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(clientToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });
});
