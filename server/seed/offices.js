module.exports = () => {
  const offices = [];
  for (let i = 10; i > 0; i--) {
    offices.push({
      office: Math.random() * 1 > 0.5 ? 'WIC' : 'SNAP'
    });
  }
  return offices;
};
