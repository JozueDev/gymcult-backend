
-- ===============================
-- GYMCULT: Estructura de Base de Datos
-- ===============================

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  direccion TEXT,
  ciudad VARCHAR(100),
  codigo_postal VARCHAR(20),
  pais VARCHAR(100),
  telefono VARCHAR(20),
  fecha_nacimiento DATE
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  imagen TEXT,
  precio DECIMAL(10,2),
  talla ENUM('XS','S','M','L','XL'),
  stock INT
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  metodo_pago VARCHAR(50),
  total DECIMAL(10,2),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de detalle de pedidos
CREATE TABLE IF NOT EXISTS detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT,
  producto_id INT,
  talla VARCHAR(10),
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
