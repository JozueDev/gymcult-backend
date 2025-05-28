
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');

// Crear un nuevo pedido
router.post('/crear', verifyToken, async (req, res) => {
  try {
    const { carrito, metodo_pago, total } = req.body;
    const usuario_id = req.usuario.id;

    const [pedidoResult] = await db.query(
      'INSERT INTO pedidos (usuario_id, metodo_pago, total) VALUES (?, ?, ?)',
      [usuario_id, metodo_pago, total]
    );

    const pedido_id = pedidoResult.insertId;

    for (const item of carrito) {
      await db.query(
        'INSERT INTO detalle_pedido (pedido_id, producto_id, talla, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
        [pedido_id, item.id, item.talla, item.cantidad, item.precio]
      );
    }

    res.json({ success: true, pedido_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al crear el pedido' });
  }
});

module.exports = router;
