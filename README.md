[![CodeFactor](https://www.codefactor.io/repository/github/davidfers/checkout-component-react/badge)](https://www.codefactor.io/repository/github/davidfers/checkout-component-react)
# React Checkout Component
Componente de checkout para react con [Typescript](https://www.typescriptlang.org/) y [Styled Components](https://styled-components.com/). Utiliza [Vite](https://vitejs.dev/).

### TABLA DE CONTENIDOS

- [Código](#código)
- [Instalar](#instalar)



### CÓDIGO
#

La estructura de carpetas del código es la siguiente:


    ├── src
      ├── assets                    # Imágenes y fuentes
      ├── components                # Carpeta con el componente y archivos relacionados
      |  ├── Checkout.tsx           # Componente Checkout
      |  ├── styles.tsx             # Styled components
      |  ├── handlers.ts            # Funciones que se encargan de controlar el onChange de los inputs
      |  ├── validations.ts         # Función de validación
      |  └── types.d.ts             # Tipos
      ├── App.tsx                   # Componente de la app, wrapper del componente Checkout e injección de estilos globales
      └── globalStyles.tsx          # Estilos globales, fuentes

  El estado principal del componente es un objecto con los campos input como propiedaded
  ``` 
   name: string,   
   cardNumber: string,   
   expDate: string,   
   cvv: string,   
   zipCode: string,   
  ``` 
  
Cada campo tiene las siguientes propiedades    
  ``` 
   value: string,   
   error: boolean,   
   errorMesasge: string,   
  ``` 
  De esta forma es simple controlar el valor, si hay algún error en el valor, y el mesaje de error de cada campo.
  
  Para controlar los valores se hace uso de las funciones que se encuentran en el archivo `handlers.ts`
  
  Estas funciones actualizan la propiedad value en el estado, controlando el input, (el campo tarjeta solo contiene números, crea espacios de separación cada 4 números, el campo de fecha el mes debe estar entre 1-12, número máximo de caracteres...)

### INSTALAR
#

Descarga el código fuente   
`git clone https://github.com/davidfers/checkout-component-react.git`

Debes tener Node 16.11 o mayor.   
Ejecutar `yarn` o `npm install`


### USAR
#


