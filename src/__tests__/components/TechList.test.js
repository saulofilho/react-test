import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';

describe('TechList component', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  it('should be able to add new tech', () => {
    const { getByText, getByTestId, debug, getByLabelText } = render(<TechList/>);

    // debug();
    // fireEvent.click(getByText('Adicionar'));
    // debug();

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText } = render(<TechList />)

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    cleanup();

    ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']))
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  })
});