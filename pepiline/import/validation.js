const isValidJSON = (jsonString) => {
  try {
    let json = JSON.parse(jsonString);
    return (typeof json === 'object');
  } catch (error) {
    return false;
  }
}

module.exports = { isValidJSON }
