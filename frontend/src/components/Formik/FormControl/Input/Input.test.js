import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormContainer from '../FormContainer/FormContainer';
import Input from './Input';

// Rendering should be done in each test case, cant use a global var for it

describe('Input Component', () => {
  beforeEach(() => {
    render(
      <FormContainer>
        <Input
          control='input'
          type='text'
          placeholder='text'
          name='name'
          label='Name'
        />

        <Input
          control='input'
          type='email'
          placeholder='enter email'
          name='email'
          label='Email'
        />
      </FormContainer>
    );
  });

  it('render properly', () => {
    expect(screen.getAllByRole('textbox')).toBeDefined();
  });
});
