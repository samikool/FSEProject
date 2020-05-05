import { RegisterForm } from '../registerForm';
import { MainAppbar } from '../mainAppbar';
import React from 'react';
import { mount, shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import sinon from 'sinon'

describe('< RegisterForm />', () => {

  it('should render without crashing', () => {

  });

  it('should call componentDidMount', () => {

    sinon.spy(RegisterForm.prototype, 'componentDidMount');
    const wrapper = mount(<RegisterForm />);
    expect(RegisterForm.prototype.componentDidMount).toHaveProperty('callCount', 1);
    RegisterForm.prototype.componentDidMount.restore();
  })

});
