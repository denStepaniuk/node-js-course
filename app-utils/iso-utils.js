const estimatedDiameterInMeters = (min, max) => {
  return Math.floor((min + max) / 2);
}

module.exports = {
  estimatedDiameterInMeters
}