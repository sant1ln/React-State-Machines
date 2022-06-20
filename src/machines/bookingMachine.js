import { assign, createMachine } from 'xstate';

const reset = assign({
  passengers: (_, event) => event.passengers = [],
  selectedCountry: (_, event) => event.selectedCountry = "",
});


const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      on: {
        DONE: 'success',
        ERROR: 'failure'
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
    initial: 'initial',
    context: {
      passengers: [],
      selectedCountry: '',
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
          DONE: 'tickets',
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
      printStart: () => console.log('Print start'),
      printEntry: () => console.log('Print entry to search'),
      printExit: () => console.log('Print exit from search')
    }
  }
);