module.exports = function (app) {
  app.route("/").get((req, res) => {
    res.send("This is the main gateway");
  });
};
