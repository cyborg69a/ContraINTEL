// scripts/auth.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Reemplaza con tus datos reales de Supabase
const supabase = createClient('https://vjiohcqyxasxhdvrywlv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaW9oY3F5eGFzeGhkdnJ5d2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4OTgsImV4cCI6MjA2NTM0MDg5OH0.O8hPp9RO4t6vXRUaf2Jz-Xxvpb0B8m6bsUPczH-nj70')

const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

// Registro
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('register-email').value
    const password = document.getElementById('register-password').value
    const rol = document.getElementById('register-role').value

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { rol }
      }
    })

    if (error) {
      alert('Error al registrar: ' + error.message)
    } else {
      alert('Registro exitoso. Revisa tu correo para confirmar.')
    }
  })
}

// Login
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Error al iniciar sesión: ' + error.message)
    } else {
      // Obtener rol del usuario
      const { data: { user } } = await supabase.auth.getUser()
      const rol = user.user_metadata.rol

      if (rol === 'reportante') {
        window.location.href = 'reportante.html'
      } else if (rol === 'analista') {
        window.location.href = 'analista.html'
      } else {
        alert('Rol no válido o no asignado.')
      }
    }
  })
}
