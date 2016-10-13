'use strict';

const fs = require('fs');
const fileType = require('file-type');

const filename = process.argv[2] || '';

const readFile = (filename) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

// set default object if typeData is an unsupported filetype
const mimeType = (data) => {
  return Object.assign({
    ext: 'bin',
    mime: 'application/octet-stream',
  }, fileType(data));
};

const parseFile = (fileBuffer) => {
  let file = mimeType(fileBuffer);
  file.data = fileBuffer;
  return file;
};

const upload = (file) => {
  const options = {
    // get bucket name from AWS s3 console
    Bucket:'ps.bucket.10.2016',
    // attch fileBuffer as a stream to send to AWS
    Body: file.data,
    // give public access to read URL of uploaded file
    ACL: 'public-read',
    // send mime type of uploaded file
    ContentType: file.mime,
    // pick filename for AWS to use for uploaded file
    Key: `test/test.${file.ext}`
  };
  // continue to pass data along Promise chain
  return Promise.resolve(options);
};

const logMessage = (upload) => {
  // temporarily delete stream to log options in terminal without stream
  delete upload.Body;
  console.log(`upload options are ${JSON.stringify(upload)}`);
};

readFile(filename)
.then(parseFile)
.then(upload)
.then(logMessage)
.catch(console.error)
;
