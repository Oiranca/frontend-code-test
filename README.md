# Prueba Samuel Romero

## Descripción de la prueba

Se basa en una versión bastante simplificada del editor de Genially. Como base, te proporcionan un área de trabajo,
llamada Canvas y una serie de elementos llamados "Box" y una barra de herramientas (Toolbar). 

- #### Puntos a realizar

  - Agregar y eliminar cajas.
  - Seleccionar una caja y se debería indicar visualmente como que está seleccionada.
  - Arrastrar las cajas usando **Interact.js** y usando **referencias de React**.
  - Cambiar el color de una caja.
  - Mostar un contador de cajas seleccionadas.
  - Poder seleccionar, arrastrar y cambiar de color múltiples cajas a la vez.
  - Guardar el estado de la aplicación localmente y restaurarlo al cargar.
  - Implementar capacidades de deshacer y rehacer.


## Tecnologías Utilizadas

- **[React](https://es.react.dev/)**: Librería de JavaScript utilizada en el desarrollo de aplicaciones web dinámicas.
- **[MobX-State-Tree (MST)](https://mobx-state-tree.js.org/intro/welcome)**: Librería para la gestión del estado.
- **[Interact.js](https://interactjs.io/)**: Librería de JavaScript para implementar 'Drag and Drop', 'Resize',....
- **[mst-middlewares](https://github.com/coolsoftwaretyler/mst-middlewares)**: Librería para la gestión de middlewares en MobX-State-Tree.

## Instalación

1. Clona el repositorio:
    ```
    git clone <URL_DEL_REPOSITORIO>
    ``` 
2. Navega al directorio del proyecto:
    ```
    cd <NOMBRE_DEL_PROYECTO>
    ```
3. Instala las dependencias:
    ```
    yarn install
    ```
## Uso

1. Inicia la aplicación:
    ```
    yarn start
    ```
2. Si el navegador no se abre automáticamente, puedes abrirlo y navega a `http://localhost:3000`.

## Funcionalidades realizadas

- **Añadir y eliminar cajas**: Permite al usuario agregar y eliminar cajas en el área de trabajo.
- **Seleccionar una caja**: Visualmente, indica cuando una caja está seleccionada.
- **Arrastrar cajas**: Permite arrastrar las cajas utilizando Interact.js y referencias de React.
- **Cambiar el color de una caja**: Permite cambiar el color de las cajas seleccionadas.
- **Contador de cajas seleccionadas**: Muestra un contador indicando cuántas cajas están seleccionadas.
- **Cambios para múltiples cajas**: Permite la selección, arrastre y cambio de color para múltiples cajas.
- **Guardar y restaurar estado**: Guarda el estado de la aplicación localmente y lo restaura al cargar.
- **Deshacer/Rehacer**: Implementa capacidades de deshacer y rehacer utilizando `mst-middlewares`.


## Desafíos

- **Arrastre de múltiples elementos**: Fue algo que se me complicó al principio, sobre todo manteniendo como límite el contenedor padre.
- **Responsive**: Cuando implementé algo básico para que se viera bien en diferentes tamaños de pantalla, primero me topé con que
  tenía problemas en el `touch` y tuve que repasar algo de CSS para poder solucionarlo. Pero cuando ya tenía solucionado ese problema, me di cuenta de
  que cuando al crear nuevas cajas en el móvil, y cambiar la orientación, dichas cajas se salían del contenedor, por ello
  tuve que implementar un ajuste. Dicho ajuste calcula el tamaño del contenedor y adapta la posición de los elementos en tiempo
  real.
- **Deshacer/Rehacer**: Fue un reto interesante, ya que no había trabajado con MobX-State-Tree y tuve que investigar cómo
  implementarlo, en la documentación de 'MST' vi que se podía hacer uso de 'Patches', pero al final, encontré una librería llamada `mst-middlewares` que me facilitó la
  tarea.

## Mejoras Futuras

- **Ajuste de posición, en cambio, de orientación**: Asegurarse de que los elementos vuelvan a su posición original al
  cambiar la orientación del dispositivo. Ahora mismo se colocan dentro del padre, pero no en el mismo punto exacto.
- **Implementar startGroup**: Actualmente, podemos devolver a la posición inicial una caja, pero no todas las seleccionadas
  a la vez.

## Experiencia con el desafío

En grandes rasgos, las tareas me han parecido interesantes y he disfrutado mucho realizándolas, sobre todo porque he podido conocer nuevas tecnologías, como MobX-State-Tree e Interact.js, con las que no había trabajado.

