export const nl2br = (str: string) => {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
