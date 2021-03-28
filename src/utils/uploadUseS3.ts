import { APIGets3UploadKey } from "@/pages/api/request";
const AWS = require('aws-sdk');


interface uploadParams {
    Bucket: string // bucket name
    Key: string // file path
    Body: any // file
}

export async function AWSuploadS3(uploadParams: uploadParams) {
    let keys = null;
    try {
        const { data } = await APIGets3UploadKey();
        keys = data
        console.log(`APIGets3UploadKey data`, data)
    } catch (err) {
        console.log(`APIGets3UploadKey err`, err)
    }
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        accessKeyId: keys.accessKeyId,
        secretAccessKey: keys.secretAccessKey
        // region:'us-west-2' 
    });
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Upload Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });
}