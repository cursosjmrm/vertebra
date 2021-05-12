//la estructura del proyecto se creó así:
//1. ejecutar npm init -y para crear el archivo de metadatos del proyecto
//2. Crear la carpeta bin
//3. Dentro de bin crear los directorios models y routes
//4. Crear este archivo index.js
//5. Crear carpeta llamada storage
//6. Crear el script de ejecución en el package.json para que nodemon se recargue cada vez que detecte cambios
//7. El script dice: "nodemon bin/index.js"
//8. Instalar los paquetes que se necesitan para el proyecto
const app = require ('./app')

const port = 3000;



app.listen(port, () => {
    console.log(`Server runing on port http://localhost:${port}`);
});
