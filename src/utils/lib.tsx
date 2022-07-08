import Index from '../models/Index';

export const getRandomIntInRange = (max: number, min?: number): number => {
  min = Math.ceil(min || 0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const shuffle = (array: any[]) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const buildPracticeSet = (index: Index): number[] => {
  const selected: number[] = [];
  let [privileged, regular] = splitIndex(index);

  privileged = shuffle(privileged);
  selected.push(...privileged.slice(0, 12));

  regular = shuffle(regular);
  selected.push(...regular.slice());

  let final = selected.slice(0, 80);
  final = shuffle(final);

  return final;
};

export const splitIndex = (index: Index): number[][] => {
  const privileged: number[] = [];
  const regular: number[] = [];

  for (const [area, questions] of Object.entries(index)) {
    if (['DIREITOS HUMANOS', 'ÉTICA', 'FILOSOFIA'].includes(area)) {
      privileged.push(...questions);
    } else {
      const shuffled = shuffle(questions);
      const selected = shuffled.slice(0, 5);
      regular.push(...selected);
    }
  }

  return [privileged, regular];
};
