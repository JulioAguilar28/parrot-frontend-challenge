# Frontend Parrot Challenge

## Introducción

En el siguiente repositorio se encuentra el reto que fue proporcionado por la gente de [Parrot Software](https://parrotsoftware.com.mx/) el cual consiste en varios puntos interesantes para la construcción de una applicación que necesite proceso de autenticación.

## 🍽️ Ingredientes

* [React](https://es.react.dev/) + [Vite](https://vite.dev/) + TS
* [Tailwind](https://tailwindcss.com/)
* [Mui/Joi](https://mui.com/joy-ui/getting-started/)
* [Zustand](https://zustand-demo.pmnd.rs/)
* [React Router](https://reactrouter.com/en/main/start/overview)
* [Zod](https://zod.dev/)

## 🚀 Arrancando el proyecto

Para poder dar inicio al proyecto es necesario que cuentes con [node](https://nodejs.org/en/) v20.x.x de mano de [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager)

Como primer paso, por favor de clonar el proyecto en tu ambiente local con los siguientes comandos:

```bash
git clone git@github.com:JulioAguilar28/parrot-frontend-challenge.git
cd parrot-frontend-challenge
```

Una vez dentro del proyecto, continuar con los siguientes comandos:

```bash
npm install # Instala las dependencias
npm run dev # Iniciar un servidor local para iniciar el proyecto en  http://localhost:5173/
```

Con estos simples pasos ya tendras el proyecto listo para ser evaludo.

## Contrucción de un build para sitios estaticos

Actualmente Vite ya lo hace de manera rápida con el suguiente comando:

```bash
npm run build
```

El cual va a crear una carpeta `/dist` dentro de nuestro proyecto el cuál tendra el código JS listo para ser servido en algun servidor de contenido estatico.

Para confirmar que la construcción fue correcta, se puede validar levantando un servidor con el siguiente comando:

```bash
# Levanta un servidor en http://localhost:4173/ donde sirve con el contenido ya compilado
npm run preview
```

## Cierre

Agradezco a [Parrot Software](https://parrotsoftware.com.mx/) por el reto y la oportunidad con este repositorio. Sientanse con la libertad de poder contribuir y/o modificar cualquier elemento de este repositorio.
