const estimatedDiameterInMeters = (min, max) => {
  const sum = [min, max].reduce((acc, number) => acc + number);
  return Math.floor(sum / [min, max].length);
}

module.exports = {
  estimatedDiameterInMeters
}