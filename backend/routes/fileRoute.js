const multer = require("multer");
const upload = multer({
  dest: "./uploads/",
});
const {BlobServiceClient} = require("@azure/storage-blob");
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient("files");
const fs = require("fs/promises")

module.exports = function fileRoute(app, ensureAuthenticated, { File }) {
  app
    .route("/file/upload")
    .post(ensureAuthenticated, upload.single("upfile"), async (req, res) => {
      console.log("Hey")
      const fileExt = req.file.originalname.split(".")[1];
      const originalFileName = req.file.originalname;
      const newFileName = req.file.filename;
      try {
        const data = await fs.readFile(process.cwd() + "/uploads/" + newFileName);
        const blockBlobClient = containerClient.getBlockBlobClient(`${newFileName}.${fileExt}`);
        const response = await blockBlobClient.uploadData(data, {
        blobHTTPHeaders: {
          blobContentType: req.file.mimetype,
        },
      });
      if (response._response.status !== 201) {
        throw new Error(
        `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
      );
      }
      console.log(response);
        return res.json({
          success: true,
          url: `https://volunteerstorageaccount.blob.core.windows.net/files/${newFileName}.${fileExt}`
        });
      } catch(e) {
        return res.json({
          success: false,
          message: "issue with file upload"
        })
      }
    });
};
