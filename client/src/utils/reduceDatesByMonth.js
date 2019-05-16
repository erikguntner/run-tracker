import dateFns from 'date-fns';

export const reduceDatesByMonth = runs => {
  return runs.reduce((accum, curr) => {
    const month = dateFns.format(new Date(0, curr.month + 1, 0), 'MMMM');
    if (accum[month]) {
      accum[month].push(curr);
      return accum;
    } else {
      accum[month] = [];
      accum[month].push(curr);
      return accum;
    }
  }, {});
};
