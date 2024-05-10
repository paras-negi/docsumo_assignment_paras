export const getInitialsFromName = (name) => {
    if (!name || !name.trim().length) return "";
    let nameArr = name.split(" ");
    let str = "";
    nameArr.forEach((text) => {
      str = str + " " + text.charAt(0);
    });
    return str.toUpperCase();
  };