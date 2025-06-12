// scripts/auth.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Reemplaza con tu URL y KEY de Supabase
const supabase = createClient('https://tu-proyecto.supabase.co', 'tu-clave-anon')

const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

// Registro
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = registerForm.email.value
    const password = registerForm.password.value
    const rol = registerForm.rol.value // "reportante" o "analista"

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
    const email = loginForm.email.value
    const password = loginForm.password.value

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Error al iniciar sesión: ' + error.message)
    } else {
      // Obtener el perfil para saber el rol
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
