export const removePx = (value) => {
    return typeof value === 'string' && value.endsWith('px')
      ? value.slice(0, -2)
      : value;
  };