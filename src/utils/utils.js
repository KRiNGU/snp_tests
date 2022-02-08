export const sortByParameter = (mass, parameter) => {
  return mass.sort((a, b) => {
    if (a[parameter] > b[parameter]) {
      return 1;
    } else if (a[parameter] < b[parameter]) {
      return -1;
    } else return 0;
  });
};
