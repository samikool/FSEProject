import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from '../map';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('< SimpleMap />', () => {

  it('should call componentDidMount', function () {
    sinon.spy(SimpleMap.prototype, 'componentDidMount');
    const wrapper = mount(<SimpleMap />);
    expect(SimpleMap.prototype.componentDidMount).toHaveProperty('callCount', 1);
    SimpleMap.prototype.componentDidMount.restore();
  });


});
