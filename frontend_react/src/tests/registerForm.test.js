import { registerForm } from '../registerForm';
import { MainAppbar } from '../mainAppbar';
import React from 'react';
import { shallow } from 'Enzyme';


it('should render register form', async function() {
  const wrapper = shallow(<MainAppbar/>);
  const registerForm = wrapper.find(registerForm);
  expect(registerForm.exists()).toBe(true);
});
