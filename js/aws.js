router.post('/addProfilePicture/:id/:name', upload.single('file'), function(req, res, next) {
  /*
Function to upload a file to AWS S3, return "true" if the file was uploaded
successfully, otherwise return "false".
*/
  var params = {
    localFile: req.file.path,

    s3Params: {
      Bucket: "hedgey",
      ACL: "bucket-owner-full-control",
      ContentType: "image/png",
      Key: req.params.name
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    }
  };
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
    return false;
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
    uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
    var update = {$set: {profilePic: "https://s3-us-west-2.amazonaws.com/hedgey/"+req.params.name}};
    
  });
});