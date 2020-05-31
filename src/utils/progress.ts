export const getLineStatus = (percentage: number) => {
  const low = 30;
  const medium = 60;

  if(percentage >= 0 && percentage <= low) {
    return 'fail';
  } else if(percentage > low && percentage <= medium) {
    return 'active';
  } else if(percentage > medium) {
    return 'success';
  }
};
