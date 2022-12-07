[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/davidfers/checkout-component-react/blob/main/README.es.md)
[![CodeFactor](https://www.codefactor.io/repository/github/davidfers/checkout-component-react/badge)](https://www.codefactor.io/repository/github/davidfers/checkout-component-react)


# React Checkout Component
React checkout component with [Typescript](https://www.typescriptlang.org/) y [Styled Components](https://styled-components.com/). Uses [Vite](https://vitejs.dev/).

[Live demo](https://react-checkout-form.netlify.app)

### TABLE OF CONTENTS

- [Code](#code)
  - [Checkout.tsx](#checkouttsx)
  - [handlers.ts](#handlersts)
  - [validations.ts](#validationsts)
- [Install](#install)
- [Tests](#tests)




### CODE
#

The folder structure is as follows:


    ├── src
      ├── assets                    # Images and fonts
      ├── components                # Folder with the component and related files
      |  ├── Checkout.tsx           # Checkout component
      |  ├── Checkout.test.tsx      # Tests
      |  ├── styles.tsx             # Styled components
      |  ├── handlers.ts            # Functions that are responsible for controlling the onChange of the input fields
      |  ├── validations.ts         # Validation function
      |  └── types.d.ts             # Types
      ├── App.tsx                   # App component, Checkout component wrapper and global style injection
      └── globalStyles.tsx          # Global styles, fonts


#### Checkout.tsx

  Checkout component `<Checkout onSubmit= />` must be implemented with the `onSubmit` attribute, which will be the function that is executed when the form is validated.
   The `onSubmit` function in the example is defined in `App.tsx`, returns a promise that resolves with a timeout of 1s, and takes as argument the form values of type `FormValues` defined in `types.d.ts`.
  
  The main state of the component is a `payment Info` object with the input fields as properties
  ``` 
   name, 
   cardNumber,
   expDate,
   cvv,   
   zipCode,
  ``` 
  
Each of the above mentioned properties is an object with the following properties
  ``` 
   value: string,   
   error: boolean,   
   errorMesasge: string,   
  ``` 
  This way it is simple to check the value, record if there is any error in the value, and define the error message of each field.
  
  When the `Confirm Payment` button is clicked, a validation is made. If all the fields are valid, the form will be submitted, otherwise a reference to `triedSubmit` will be modified and errors will appear. From now on, a validation will be made for each character input in the form.
  
  In case the form is valid, `await onSubmit(FormValues)` will be called, and while the promise is being resolved, the `isLoading` state will change to true, this will show a spinner on the button. When the promise is resolved, the isSuccess state will be changed to true, displaying a notification.
  
  #### handlers.ts
  Functions in `handlers.ts` are used to control the values.
  
  These functions update the value property in the state controlling the input, (the card field only contains numbers, create spaces every 4 numbers, the month in the date field must be between 1-12, maximum number of characters...) . They also control the jump to the next input.
   They have the following form:


  ```
  (value: string, paymentInfo: PaymentInfo, setPaymentInfo: (value: React.SetStateAction<PaymentInfo>) => void, nextInput: React.RefObject<HTMLInputElement>): void
  ```
#### validations.ts
Part of the validation is done with the handlers described above since it is not allowed to enter characters that are not permitted.   

The validateAll function in this file basically checks that the fields are not empty or have a specific length and updates the error property of the state accordingly.

### INSTALL
#

Download the source code
`git clone https://github.com/davidfers/checkout-component-react.git`

You must have Node 16.11 or higher.
Run `yarn` or `npm install`

To start the application in development mode execute:
`yarn dev` or `npm run dev`

For compilation and bundling run:
`yarn build` or `npm run build`

To start the compiled application run:
`yarn preview` or `npm run preview`

### TESTS
#

The tests use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/)

Run tests   
`yarn test` o `npm run test`

Check code coverage  
`yarn coverage` o `npm run coverage`

