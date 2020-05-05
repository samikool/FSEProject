import mainAppbar from '../mainAppbar';
import sinon from 'sinon';
import { mount, shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('< mainAppbar />', () => {

  it('should not call componentDidMount', () => {
    sinon.spy(mainAppbar.prototype, 'componentDidMount');
    const wrapper = mount(<MainAppbar />);
    expect(mainAppbar.prototype.componentDidMount).toHaveProperty('callCount', 0);
    mainAppbar.prototype.componentDidMount.restore();
  });

});
