export const getProgressLineProps = (percentage: number) => {
  const low = 30;
  const medium = 60;
  let props = {};

  if(percentage >= 0 && percentage <= low) {
    props = { ...props, status: 'fail' };
  } else if(percentage > low && percentage <= medium) {
    props = { ...props, strokeColor: '#ffc107' };
  } else if(percentage > medium) {
    props = { ...props, status: 'success' };
  }

  return props;
};
