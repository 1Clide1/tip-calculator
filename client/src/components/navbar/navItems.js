import Auth from "../../utils/auth";
// array that will contain the main items of the navbar
// trying to see if they are logged which navbar will they get
export const mainNavItems = Auth.loggedIn()
  ? [
      { text: "Home", cName: "navbar-links", url: "/" },
      { text: "Profile", cName: "navbar-links", url: "/profile" },
    ]
  : [
      { text: "Home", cName: "navbar-links", url: "/" },
      { text: "Sign Up", cName: "navbar-links", url: "/signup" },
      { text: "Login", cName: "navbar-links", url: "/login" },
    ];
