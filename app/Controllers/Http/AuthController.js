'use strict'

const User = use('App/Models/User.js');

class AuthController {
  async register({ request }){
    console.log('Bla');
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth }){
    const { email, password } = request.all();

    const token = auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController
