
# GYMCULT Backend

Este es el backend oficial de la tienda GYMCULT desarrollado con Node.js + Express y MySQL.

## 🧩 Funcionalidad
- Registro e inicio de sesión de usuarios
- Gestión de pedidos
- Control de productos, tallas y stock
- Integración con PayPal

## 🚀 Despliegue en Railway

1. **Sube este repositorio a GitHub**
2. En [Railway.app](https://railway.app):
   - Crea nuevo proyecto → "Deploy from GitHub"
   - Selecciona tu repo `gymcult-backend`
3. Agrega estas variables en la sección "Variables":

```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
JWT_SECRET=clave_super_segura
```

4. Railway detectará `server.js` como entrada.

## 🗃 Estructura

```
backend_gymcult/
├── routes/
├── db.js
├── server.js
├── gymcult_db_schema.sql
├── gymcult_sample_products.sql
├── .env (usado localmente)
└── ...
```

---

## ✅ Requisitos

- Node.js 18+
- MySQL (Railway lo ofrece como plugin)
