
const express = require('express');
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Guardar dirección del usuario (POST)
router.post('/direccion', verifyToken, (req, res) => {
  const { direccion, ciudad, codigo_postal } = req.body;
  const id = req.usuario.id;

  if (!id || !direccion || !ciudad || !codigo_postal) {
    return res.status(400).json({ mensaje: "Faltan datos para guardar la dirección." });
  }

  const sql = `
    UPDATE usuarios
    SET direccion = ?, ciudad = ?, codigo_postal = ?
    WHERE id = ?
  `;

  db.query(sql, [direccion, ciudad, codigo_postal, id], (err) => {
    if (err) {
      console.error("❌ Error al guardar dirección:", err);
      return res.status(500).json({ mensaje: "Error al guardar la dirección" });
    }

    res.json({ mensaje: "Dirección guardada correctamente" });
  });
});

// Obtener dirección del usuario (GET)
router.get('/direccion', verifyToken, (req, res) => {
  const id = req.usuario.id;

  db.query(
    'SELECT direccion, ciudad, codigo_postal FROM usuarios WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error("❌ Error al obtener dirección:", err);
        return res.status(500).json({ mensaje: "Error al obtener dirección" });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      res.json(results[0]);
    }
  );
});

module.exports = router;
