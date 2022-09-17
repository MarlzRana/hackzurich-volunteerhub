const multer = require("multer");
const upload = multer({
  dest: "./uploads/",
});
module.exports = function fileRoute(app, ensureAuthenticated, { File }) {
  app
    .route("/file/upload")
    .post(ensureAuthenticated, upload.single("upfile"), async (req, res) => {
      const newFile = new File({
        fileNameOnBackend: req.file.fileName,
        mimetype: req.file.mimetype,
        ownerId: req.user._id,
      });
      return res.json({
        name: req.file,
      });
    });

  app.route("/file/get").get(ensureAuthenticated, async (req, res) => {
    const fileId = req.body.fileId;
    const fileDetails = File.findOne({ _id: fileId });
    if (req.user._id != fileDetails.ownerId) {
      return res.json({
        success: false,
        message: "you do not have permission to access that",
      });
    }
    res.contentType(fileDetails.mimetype);
    res.sendFile(fileDetails.fileNameOnBackend);
  });
};
