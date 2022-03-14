const notFound = (req, res) =>
  res.status(404).json({ msg: "route doesn't found" });

module.exports = notFound;
