import { registerForm } from '../registerForm';
import { MainAppbar } from '../mainAppbar';
import React from 'react';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';




it('should render register form', async function() {
  configure({ adapter: new Adapter() });
  const wrapper = shallow(<MainAppbar/>);
  const registerForm = wrapper.find(registerForm);
  expect(registerForm.exists()).toBe(true);
});
