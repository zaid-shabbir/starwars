export const stringToHexColor = (str: string) => {
  let hash = 0;
  if (str.length) {
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      value = Math.floor(value / 1.3);
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  }
  return "#ccc";
};

export const extractIdFromUrl = (url: string | null) => {
  const match = url && url.match(/\/planets\/(\d+)\/$/);
  return match ? parseInt(match[1]) : null;
};

export const debounce = (func: any, timeout = 500) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
