import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../main';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('< Main />', () => {
  it('renders main page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main/>, div)
  });

  it('calls componentDidMount', () => {
    sinon.spy(Main.prototype, 'componentDidMount');
    const wrapper = mount(<Main />);
    expect(Main.prototype.componentDidMount).toHaveProperty('callCount', 1);
    Main.prototype.componentDidMount.restore();
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Main />).find('.main').length).toBe(1);
  });

});
