const isValidJSON = (jsonString) => {
  try {
    // const json = JSON.parse(jsonString);
    // return typeof json === 'object';
    return true
  } catch (error) {
    return false;
  }
};

export { isValidJSON };
