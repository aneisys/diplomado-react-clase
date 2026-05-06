# Gestión de Tareas con React

Aplicación de lista de tareas (To-Do List) desarrollada con **React 19**, **TypeScript** y **Vite**. Permite gestionar el ciclo de vida completo de una tarea conectada a una API REST externa.

**Autor:** Angel Nayib Espinoza Ibañez

## Stack Tecnológico

- React 19 + TypeScript
- Vite (build tool)
- Custom Hooks (useState, useEffect, useCallback)
- Fetch API nativa para consumo de servicios
- CSS Modules con variables CSS
- Docker + Docker Compose (entorno containerizado)

## Funcionalidades

- **Visualización:** Listado dinámico de tareas con contadores (Total, Pendientes, Finalizadas)
- **Creación:** Formulario para añadir nuevas tareas
- **Edición:** Modificar el nombre de una tarea existente
- **Eliminación:** Borrar tareas individuales
- **Gestión de Estado:** Toggle para marcar tareas como Pendiente / Finalizada (con estilos visuales diferenciados)
- **Autenticación:** Login con token Bearer (JWT) almacenado en localStorage

## Requisitos Previos

- Docker + Docker Compose instalados
- Make (opcional, para usar los comandos del Makefile)

## Configuración

El proyecto usa variables de entorno definidas en `.env`:

```
VITE_API_URL=https://taskdone-node.onrender.com
```

Si necesitas apuntar a otro backend, edita ese archivo.

## Despliegue con Docker (Recomendado)

No requiere instalar Node.js ni dependencias locales.

### 1. Levantar el contenedor

```bash
make up
```

O sin Make:

```bash
docker compose up -d
```

### 2. Ver logs en tiempo real

```bash
make watch
```

### 3. Abrir la aplicación

Navega a: `http://localhost:5173`

### 4. Detener el contenedor

```bash
make down
```

### Otros comandos útiles

| Comando        | Descripción                                 |
| -------------- | ------------------------------------------- |
| `make build`   | Reconstruir la imagen sin cache             |
| `make shell`   | Entrar al contenedor (shell)                |
| `make install` | Instalar dependencias dentro del contenedor |

## Despliegue en GitHub Pages

El proyecto incluye un workflow de GitHub Actions que compila y despliega automáticamente en cada push a `main`.

### 1. Configurar GitHub Pages en el repositorio

1. Ve a tu repo en GitHub → **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Guarda

### 2. Hacer push

```bash
git add .
git commit -m "config: deploy to GitHub Pages"
git push origin main
```

### 3. Verificar despliegue

- Ve a **Actions** en tu repo de GitHub
- El workflow `Deploy to GitHub Pages` se ejecutará automáticamente
- Una vez completado, tu app estará en:
  ```
  https://aneisys.github.io/diplomado-react-clase/
  ```

## Despliegue Local (sin Docker)

Si prefieres no usar Docker:

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
  ├── components/
  │   ├── LoginForm/        # Formulario de autenticación
  │   ├── TaskForm/         # Formulario crear/editar tarea
  │   ├── TaskItem/         # Tarjeta de tarea individual
  │   └── TaskList/         # Listado de tareas
  ├── hooks/
  │   └── useTasks.ts       # Hook personalizado para CRUD de tareas
  ├── services/
  │   ├── authApi.ts        # Login/logout y manejo de token
  │   └── taskApi.ts        # Llamadas a la API de tareas
  ├── types/
  │   └── task.ts           # Interfaces TypeScript
  ├── App.tsx               # Componente principal
  └── main.tsx              # Punto de entrada
```

## API Endpoints Utilizados

| Método | Endpoint         | Descripción               |
| ------ | ---------------- | ------------------------- |
| POST   | `/api/login`     | Autenticación (JWT)       |
| GET    | `/api/tasks`     | Listar tareas (paginado)  |
| POST   | `/api/tasks`     | Crear nueva tarea         |
| PUT    | `/api/tasks/:id` | Actualizar tarea completa |
| PATCH  | `/api/tasks/:id` | Cambiar estado (done)     |
| DELETE | `/api/tasks/:id` | Eliminar tarea            |

## Credenciales de Prueba

- **Usuario:** `userAngel`
- **Contraseña:** `password`

## Notas

- El backend usa Render free tier; puede tardar 10-30 segundos en "despertar" tras inactividad
- Si la API no responde, aparecerá un banner de error con opción a reintentar
- Los estilos de estado se diferencian visualmente: **verde** para Finalizadas, **amarillo/naranja** para Pendientes
