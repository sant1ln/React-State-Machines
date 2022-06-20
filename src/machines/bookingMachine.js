import { assign, createMachine } from 'xstate';
import { fetchCountries } from '../Utils/api';

const reset = assign({
  passengers: (_, event) => event.passengers = [],
  selectedCountry: (_, event) => event.selectedCountry = "",
});


const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke:{
        id: 'getCountries',
        src: () => fetchCountries,
        onDone:{
          target: 'success',
          actions: assign({
            countries: (context,event) => event.data,
          })
        },
        onError:{
          target:'failure',
          actions: assign({
            error: 'Fallo el request'
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'loading'}
      }
    }
  }
}

export const bookingMachine = createMachine(
  {
    id: 'Buy plane tickets',
    initial: 'passengers',
    context: {
      passengers: [],
      selectedCountry: '',
      countires: [],
      error: '',
    },
    states: {
      initial: {
        on: {
          START: {
            target: 'search',
            actions: 'printStart',
          }
        }
      },
      search: {
        //Poner actions de entrada
        entry: 'printEntry',
        //Poner actions de entrada
        exit: 'printExit',
        on: {
          CONTINUE: {
            target: 'passengers',
            actions: assign({
              selectedContury: (context, event) => event.selectedCountry
            })
          },
          CANCEL: {
            target:"initial",
            actions: reset
          },
        },
        ...fillCountries
      },
      passengers: {
        on: {
          DONE: {
            target: 'tickets',
            cond: 'moreThanOnePassenger'
          },
          ADD: {
            target: 'passengers',
            actions: assign(
              (context, event) => context.passengers.push(event.newPassenger)
            )
          },
          CANCEL: {
            target:"initial",
            actions: reset
          },
        }
      },
      tickets: {
        after: {
          5000: {
            target: 'initial',
            actions: 'cleanContext'
          }
        },
        on: {
          FINISH: 'initial',
          CANCEL: {
            target:"initial",
            actions: reset
          },
        }
      }
    }
  },
  {
    actions: {
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
    },
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0
      }
    }
  }
);