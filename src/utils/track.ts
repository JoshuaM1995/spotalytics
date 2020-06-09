import moment from "moment";

export const getTrackLength = (durationInMs: number) => {
  const duration = moment.duration(durationInMs);
  const zero = duration.seconds() < 10 ? '0' : '';

  return `${duration.minutes()}:${zero}${duration.seconds()}`;
}
