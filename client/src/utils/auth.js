// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = this.decode(token);
      // if the decoded token is expired then return true
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false; // if token is not expired yet then auto return false
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return this.localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    this.localStorage.setItem('id_token', idToken); // not sure if optional chaining this is the right answer but also not sure what my other options are
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    this.localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
