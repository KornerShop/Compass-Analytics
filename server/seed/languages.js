module.exports = () => {
  const languages = [];
  for (let i = 11; i > 0; i--) {
    languages.push({
      lang: Math.random() * 1 > 0.5 ? 'Spanish' : 'English'
    });
  }
  return languages
}
