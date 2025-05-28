const pedidosRouter = require('./routes/pedidos');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use('/api/pedidos', pedidosRouter);
app.use(cors());
app.use('/api/pedidos', pedidosRouter);
app.use(express.json());

const db = require('./db');
app.use('/api/pedidos', pedidosRouter);
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
app.use('/api/pedidos', pedidosRouter);
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/pedidos', pedidosRouter);
app.use('/api/usuario', require('./routes/usuarios'));

