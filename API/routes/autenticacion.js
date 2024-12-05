const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/usuarios');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'El usuario ya existe' });
  
      const salt = await bcrypt.genSalt(10);
      const contraEncriptada = await bcrypt.hash(password, salt);
  
      user = new User({
        email,
        password: contraEncriptada,
      });
  
      await user.save();
      res.status(200).json({ message: 'Usuario creado con exito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });


  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Correo no encontrado' });
  
      const contraIgual = await bcrypt.compare(password, user.password);
      if (!contraIgual) return res.status(400).json({ message: 'Contraseña incorrecta' });
  
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
  module.exports = router;