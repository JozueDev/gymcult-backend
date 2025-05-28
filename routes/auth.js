const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router(); // ✅ IMPORTANTE: definir router

// 🔐 Registro
router.post('/registro', async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const hash = await bcrypt.hash(contraseña, 10);

    db.query(
      'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
      [nombre, email, hash],
      (err) => {
        if (err) {
          console.error("❌ Error al registrar:", err); // 👀 Aquí verás el error real
          return res.status(500).send({ mensaje: 'Error al registrar usuario' });
        }
        res.send({ mensaje: 'Usuario registrado correctamente' });
      }
    );
  } catch (error) {
    console.error("❌ Error general:", error);
    res.status(500).send({ mensaje: 'Error interno del servidor' });
  }
});

// 🔑 Login
router.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, resultados) => {
    if (err) {
      console.error("❌ Error al buscar usuario:", err);
      return res.status(500).send({ mensaje: 'Error al buscar usuario' });
    }

    if (resultados.length === 0) {
      return res.status(401).send({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = resultados[0];
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esValido) {
      return res.status(401).send({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  });
});

module.exports = router;
