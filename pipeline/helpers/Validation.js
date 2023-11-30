const isValidJSON = (jsonString) => {
  try {
    const json = JSON.parse(jsonString);
    return typeof json === 'object' && json !== null;
  } catch (error) {
    return false;
  }
};

export { isValidJSON };
