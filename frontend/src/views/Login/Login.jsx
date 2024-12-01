import React from 'react'

const Login = () => {
  return (
    <>
    <form class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-700 text-center">Inicio de Sesión</h2>
      <div class="mt-4">
        <label for="username-login" class="block text-sm font-medium text-gray-600">Nombre de Usuario</label>
        <input type="text" id="username-login" name="username" placeholder="Tu nombre de usuario"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
      </div>
      <div class="mt-4">
        <label for="password-login" class="block text-sm font-medium text-gray-600">Contraseña</label>
        <input type="password" id="password-login" name="password" placeholder="Tu contraseña"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
      </div>
      <button type="submit"
        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-6 hover:bg-blue-700">
        Iniciar Sesión
      </button>
    </form>
    </>
  )
}

export default Login