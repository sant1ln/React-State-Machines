import React from 'react';
import './styles/Tickets.css';

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send('FINISH')
  };

  const { passengers, selectedCountry } = context || [];

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>{selectedCountry ||  'Colombia'}</div>
        <div className='Tickets-passengers'>
          <i>✈</i>
            {
              passengers.map((passenger, index) => (
                <span className='Tickets-Passenger' key={index}>{passenger} </span>
              ))
            }
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}; 