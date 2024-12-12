export const formatCurrency = (value: string) => {
  const numValue = parseFloat(value.replace(/,/g, ''));
  if (Number.isNaN(numValue)) return '';
  return numValue.toLocaleString();
};

export const parseCurrency = (value: string) => value.replace(/,/g, '');
