# Backend Proyecto Market Place

Backend desarrollado con **Node.js**, **Express** y **PostgreSQL** para un sistema de marketplace.  

---

## 🔧 Instalación

Clonar el proyecto y entrar en la carpeta del backend:  
```bash
git clone <url-del-repositorio>
cd Backend_Proyecto_Market_Place
````

Instalar dependencias:

```bash
npm install
```

Instalar nodemon (de ser necesario):

```bash
npm install --save-dev nodemon
npm install --save-dev jest supertest @babel/core @babel/preset-env babel-jest

```

---

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del backend con las siguientes variables:

```
# Servidor
PORT=9090

# JWT
JWT_SECRET=MiClaveUltraSegura_123!@#

# Base de datos
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=marketplace
DB_PORT=5432
```

---

## ▶️ Ejecución

### Modo producción

```bash
npm start
```

### Modo desarrollo (con autorecarga usando nodemon)

```bash
npm run dev
```

---

## ✅ Requisitos previos

* [Node.js](https://nodejs.org/) v18+
* [PostgreSQL](https://www.postgresql.org/) instalado y corriendo

```
