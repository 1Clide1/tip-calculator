// local storage utility

// save the color theme
export const saveColorTheme = (colorTheme) => {
  localStorage.setItem("color-theme", JSON.stringify(colorTheme));
};
