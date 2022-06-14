import { createMachine } from 'xstate';


export const fetchMachine = createMachine({
  id: 'Buy plane tickets',
  initial: 'inicial',
  states: {
    inicial: {
      on:{
        START: "search"
      }
    },
    search: {
      on:{
        CONTINUE: 'passengers',
        CANCEL: 'inicial'
      }
    },    
    passengers: {
      on: {
        DONE: 'tickets',
        CANCEL: 'inicial'
      }
    },
    tickets:{
      on:{
        FINISH: 'inicial'
      }
    }
  }
});