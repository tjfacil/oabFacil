export const getRandomIntInRange = (max: number, min?: number): number => {
  min = Math.ceil(min || 0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
