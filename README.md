# Prueba de Frontend Técnica - Quick V4

*Prueba para el cargo de Desarrollador Frontend Quick, sección V4*

## Reto

El candidato debe desarrollar una interfaz que cumpla con los siguientes requisitos:

* Ingresar a la aplicación mediante login.
* Visualizar una cantidad de información en un datagrid.
* Posicionar información geolocalmente.

---

## Cómo Iniciar el Proyecto

Para comenzar con el desarrollo del proyecto, sigue los pasos a continuación según el método que prefieras.

### Usando Contenedores (Docker)

1. **Construir la imagen de Docker**: Utiliza el siguiente comando para construir la imagen Docker desde el Dockerfile. Esto creará una imagen etiquetada como `test-p:dev`.

    ```sh
    docker build -t test-p:dev .
    ```

2. **Ejecutar el contenedor Docker**: Una vez construida la imagen, puedes ejecutar el contenedor con el siguiente comando. Esto levantará el contenedor en el puerto 5173.

    ```sh
    docker run -p 5173:5173 test-p:dev
    ```

### Usando npm

1. **Instalar dependencias**: Ejecuta el siguiente comando para instalar todas las dependencias necesarias del proyecto.

    ```sh
    npm install
    ```

2. **Iniciar el servidor de desarrollo**: Utiliza el siguiente comando para iniciar el servidor de desarrollo. Esto pondrá la aplicación en marcha para que puedas comenzar a trabajar en ella.

    ```sh
    npm run dev
    ```

### Variables de Entorno Necesarias

Para que la aplicación funcione correctamente, necesitas configurar las siguientes variables de entorno:

```env
VITE_AUTH_COOKIE=session-in-cache
VITE_SESSION_COOKIE=user-session
VITE_API_BASE_URL=https://pokeapi.co/api/v2
VITE_POSITION=pos
```


### Extra: Modo Oscuro y Modo Claro

El proyecto incluye soporte para modo oscuro y modo claro, los cuales se ajustan automáticamente según la apariencia del sistema operativo del usuario. Esta funcionalidad mejora la experiencia del usuario al proporcionar una interfaz visualmente cómoda y adaptable a las preferencias de cada individuo.

#### Modo Oscuro

En el modo oscuro, la interfaz del usuario adopta una paleta de colores oscuros que reduce la fatiga visual, especialmente en entornos con poca luz. 

![Imagen del modo oscuro](https://i.ibb.co/x581NhZ/Screenshot-2024-05-19-at-7-20-09-PM.png)

#### Modo Claro

En el modo claro, la interfaz del usuario utiliza colores claros que son ideales para entornos bien iluminados, proporcionando una mejor visibilidad y claridad en condiciones de alta luminosidad.

![Imagen del modo claro](https://i.ibb.co/S6zp3Fh/Screenshot-2024-05-19-at-7-21-24-PM.png)

Este ajuste automático entre modo oscuro y modo claro se basa en las configuraciones del sistema del usuario, lo que permite una experiencia personalizada y coherente sin necesidad de intervención manual.
