[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/README.md)
[![CodeFactor](https://www.codefactor.io/repository/github/davidfers/checkout-component-react/badge)](https://www.codefactor.io/repository/github/davidfers/checkout-component-react)


# React Checkout Component
Componente de checkout para react con [Typescript](https://www.typescriptlang.org/) y [Styled Components](https://styled-components.com/). Utiliza [Vite](https://vitejs.dev/).

Ver [demo](https://react-checkout-form.netlify.app)

### TABLA DE CONTENIDOS

- [Código](#código)
  - [Checkout.tsx](#checkouttsx)
  - [handlers.ts](#handlersts)
  - [validations.ts](#validationsts)
- [Instalar](#instalar)
- [Tests](#tests)




### CÓDIGO
#

La estructura de carpetas del código es la siguiente:


    ├── src
      ├── assets                    # Imágenes y fuentes
      ├── components                # Carpeta con el componente y archivos relacionados
      |  ├── Checkout.tsx           # Componente Checkout
      |  ├── Checkout.test.tsx      # Tests
      |  ├── styles.tsx             # Styled components
      |  ├── handlers.ts            # Funciones que se encargan de controlar el onChange de los inputs
      |  ├── validations.ts         # Función de validación
      |  └── types.d.ts             # Tipos
      ├── App.tsx                   # Componente de la app, wrapper del componente Checkout e injección de estilos globales
      └── globalStyles.tsx          # Estilos globales, fuentes


#### Checkout.tsx

  El componente `<Checkout onSubmit= />` se debe implementar con el atributo `onSubmit`, que será la función que se ejecute cuando se valide el formulario.
  La función `onSubmit` del ejemplo está definida en `App.tsx`, devuelve una promesa que se resuelve con un timeout de 1s y necesita como argumento los valores del formulario del tipo `FormValues` definido en `types.d.ts`.
  
  El estado principal del componente es un objecto `paymentInfo` con los campos input como propiedaded
  ``` 
   name, 
   cardNumber,
   expDate,
   cvv,   
   zipCode,
  ``` 
  
Cada campo es un objecto con las siguientes propiedades    
  ``` 
   value: string,   
   error: boolean,   
   errorMesasge: string,   
  ``` 
  De esta forma es simple controlar el valor, registrar si hay algún error en el valor, y el mesaje de error de cada campo.
  
  Cuando se hace click en el botón `Confirm Payment`, se hace una validación. Si todos los campos son válidos se enviará el formulario, en caso contrario se modificará una referencia a `triedSubmit` y aparecerán los errores, a partir de ahora se hará una validación por cada caracter que se modifique en el formulario.
  
  En caso de que el formulario sea valido se llamará a `await onSubmit(FormValues)`, y mientras se resuelve la promesa, el estado  `isLoading` cambiará a true, esto mostrá un spinner en el botón. Cuando la promesa se resuelve, el estado isSuccess cambia a true, mostrando una notificación.
  
  #### handlers.ts
  Para controlar los valores se hace uso de las funciones que se encuentran en el archivo `handlers.ts`
  
  Estas funciones actualizan la propiedad value en el estado controlando el input, (el campo tarjeta solo contiene números, crea espacios de separación cada 4 números, el campo de fecha el mes debe estar entre 1-12, número máximo de caracteres...). También controlan el salto al siguiente input.    
  Tienen la siguiente forma:


  ```
  (value: string, paymentInfo: PaymentInfo, setPaymentInfo: (value: React.SetStateAction<PaymentInfo>) => void, nextInput: React.RefObject<HTMLInputElement>): void
  ```
#### validations.ts
Como parte de la validación se hace con los handlers descritos anteriormente, ya que no se deja introducir caracteres no permitidos, aquí básicamente se controla que los campos no estén vacios o tengan una longitud en concreto. Actualiza la propiedad error del estado.

### INSTALAR
#

Descarga el código fuente   
`git clone https://github.com/davidfers/checkout-component-react.git`

Debes tener Node 16.11 o mayor.   
Ejecutar `yarn` o `npm install`

Para arrancar la apliación en modo desarrollo ejecutar:   
`yarn dev` o `npm run dev`

Para la compilación y la empaquetación ejecutar:   
`yarn build` o `npm run build`

Para arrancar la aplicación compilada ejectuar:   
`yarn preview` o `npm run preview`

### TESTS
#

Los tests utilizan [Vitest](https://vitest.dev/) y [Testing Library](https://testing-library.com/)

Ejecutar tests   
`yarn test` o `npm run test`

Comprobar la cobertura de código   
`yarn coverage` o `npm run coverage`

