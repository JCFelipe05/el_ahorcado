DOCUMENTACIÓN TÉCNICA
Objetivos:
Crear un juego del ahorcado funcional y atractivo.
Sistema de categorías para mayor organización.
Añadir presión temporal.
Proporcionar estadísticas de juego.

Funcionalidades:
Selección de palabras aleatoria por categoría.
6 intentos.
Visualización progresiva de la palabra.
Registro de errores.
Cuenta atrás desde cada letra elegida.
Selector desplegable de categorías.
Carga dinámica de palabras desde un archivo JSON.
Teclado visual.
Letras deshabilitadas si se han usado.
Persistencia de estadísticas durante la sesión.

Estructura:
El juego cuenta con un index.html que es la página principal donde se despliega el juego.
Un style.css para darle una visualización mejor detallada y agradable.
Un script.js para almacenar la lógica del juego y las funcionalidades.
Y un palabras.json que se utiliza como base de datos de palabras por categoría.

Requitisos del sistema:
Navegador: Google Chrome 90 o superior, Mozilla Firefox 88 o superior, o Microsoft Edge 90 o superior.

Tecnologías requeridas:
JavaScript
HTML5
CSS3

Conexión:
Servidor web local o remoto.

INSTRUCCIONES DE INSTALACIÓN
Se necesita VSCode, con la extensión de Live Server instalada.
Se ha de hacer click derecho sobre el index.html dentro del sistema de archivos de VSCode y elegir la opción "Opern with Live Server".
En este punto, se debería abrir en el navegador el juego.

INSTRUCCIONES PARA JUGAR
Primeo, se debe elegir la categoría. 
Cuando se elige, el juego comienza.
Elige letras que puedan coincidir en la palabra y procura no elegir las que no coincidan.
No se pueden volver a elegir las ya seleccionadas.
Después, se pierda o se gane (o en cualquier momento del juego), se puede pulsar el botón de volver a jugar y reiniciar el juego.
Las estadísticas, mostradas en la parte inferior, mostrarán las veces que se ha jugado, ganado y perdido.

REFERÉNCIAS
Todo lo utilizado en este proyecto ha sido con lo aprendido en las clases de DWEC o utilizando la página https://www.w3schools.com para buscar dudas o funcionalidades distintas.
