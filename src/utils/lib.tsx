export const getRandomIntInRange = (max: number, min?: number): number => {
  min = Math.ceil(min || 0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};