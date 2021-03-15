'use strict';

const config = require("../config");
const aws = require("aws-sdk");
// const fs = require("fs");
// const YAML = require("yaml");
// const sls = YAML.parse(fs.readFileSync("./serverless.yml", "utf8"));
const s3 = new aws.S3({ region: config.region });

module.exports.putObjectToS3 = async (key, data) => {
  const params = {
    Bucket: config.bucket,
    Key: key,
    Body: JSON.stringify(data),
  }
  try {
    const result = await s3.upload(params).promise();
    //console.log('put object result:', result);
    return result;
  } catch(err) {
    throw new Error(`error putting object to S3: ${err}`);
  }
}

module.exports.getObjectFromS3 = async (key) => {
  const params = { 
    Bucket: config.bucket,
    Key: key,
  };
  try {
    const result = await s3.getObject(params).promise();
    const data = await JSON.parse(result.Body.toString());
    //console.log('get object result:', data);
    return data;
  } catch(err) {
    if (err.code === 'NoSuchKey') { // no problem, return empty array
      return [];
    } else {
      throw new Error(`error getting object from S3: ${err}`);
    }
  }
}

module.exports.deleteObjectFromS3 = async (key) => {
  const params = {
    Bucket: config.bucket,
    Key: key,
  };
  try {
    await s3.deleteObject(params).promise();
  } catch(err) {
    throw new Error(`error deleting object from S3: ${err}`);
  }
}
