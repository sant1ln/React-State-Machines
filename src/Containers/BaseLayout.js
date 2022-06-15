import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../Components/Nav';
import { StepsLayout } from './StepsLayout';
import './BaseLayout.css';
import { bookingMachine } from '../machines/bookingMachine';

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log('nuestra maquina', state.value);

  return (
    <div className='BaseLayout'>
      <Nav />
      <StepsLayout state={state} send={send} />
    </div>
  );
}