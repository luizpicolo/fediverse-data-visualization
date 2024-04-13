function formatDomain(domain) {
  const parts = domain.split('.');

  const formattedDomain = parts.map((part, index) => {
    if (index !== 0) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
    return part;
  }).join(''); 

  return formattedDomain;
}

export { formatDomain };
