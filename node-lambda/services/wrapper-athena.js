const AWS = require('aws-sdk');
const { AthenaExpress } = require('athena-express');

const awsCredentials = {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
};
AWS.config.update(awsCredentials);

const athenaExpressConfig = {
    aws: AWS,
    s3: process.env.BUCKET,
    getStats: true,
};
const athenaExpress = new AthenaExpress(athenaExpressConfig);


module.exports = {
    athenaExpress
}