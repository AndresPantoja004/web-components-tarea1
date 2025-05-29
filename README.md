### Uso de Shadow DOM
El componente utiliza `attachShadow({mode: 'open'})` para encapsular estilos y evitar conflictos con el resto del DOM. Los elementos dentro del componente están aislados y no afectan el estilo global del documento.

### Uso de Slots
El template incluye `<slot>` para permitir la inyección dinámica de contenido, lo cual permite flexibilidad en el uso del componente.

### Ventajas
- Reutilización de componentes.
- Encapsulamiento de estilos.
- Personalización fácil mediante atributos y variables CSS.
- Compatible con HTML nativo sin frameworks adicionales.