export const validateString = (str: string): boolean => {
  if (typeof str !== 'string' || str.trim() === '') return false;

  return true;
};

export const validateNumber = (num: number): boolean => {
  if (!num || typeof num !== 'number') return false;

  return true;
};

export const cleanISBNFormat = (str: string): string => {
  return str.split('-').join('');
};
