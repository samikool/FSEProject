import { registerForm } from '../registerForm';
import { mainAppbar } from '../mainAppbar';
import React from 'react';
import { shallow } from 'Enzyme';


it('should render register form', async function() {
  const wrapper = shallow(<mainAppbar/>);
  const registerForm = wrapper.find(registerForm);
  expect(registerForm.exists()).toBe(true);
});
