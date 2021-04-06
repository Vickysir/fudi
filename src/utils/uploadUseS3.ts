// import { APIGets3UploadKey } from "@/pages/api/request";
// const AWS = require('aws-sdk');


// export interface uploadParams {
//     Bucket?: string // bucket name :  fudiandmore-web
//     Key?: string // file path : images/
//     Body: any // file 
// }

// export async function AWSuploadS3(uploadParams: uploadParams|{}) {
//     const upload = {
//         Bucket:"fudiandmore-web",
//         Key:"/images/",
//         ...uploadParams
//     }
//     let keys = null;
//     try {
//         const { data } = await APIGets3UploadKey();
//         keys = data
//         console.log(`APIGets3UploadKey data`, data)
//     } catch (err) {
//         console.log(`APIGets3UploadKey err`, err)
//     }
//     const s3 = new AWS.S3({
//         apiVersion: '2006-03-01',
//         accessKeyId: keys.accessKeyId,
//         secretAccessKey: keys.secretAccessKey,
//         region:'eu-west-1',
//     });
//     s3.upload(upload, function (err, data) {
//         if (err) {
//             console.log("Upload Error", err);
//         } if (data) {
//             console.log("Upload Success", data.Location);
//         }
//     });
// }


// s3service.tsx
// 引入模块
import { config, S3, AWSError } from 'aws-sdk';
import { PutObjectOutput } from '../../node_modules/aws-sdk/clients/s3';
import { UploadFile } from '../../node_modules/antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';


// S3 存储bucket配置
const defaultStorage = {
	region: "eu-west-1",
	apiVersion: "2006-03-01",
	Bucket: "fudiandmore",
	Key: "public"
}


// 配置S3的接口
export interface IS3Config {
	AccessKeyId?: '';
	SecretAccessKey?: '';
	SessionToken?: '';
}
// 对S3进行配置
export const createS3 = (cfg: IS3Config) => {
	const setting = { //您的S3临时令牌
		accessKeyId: cfg.AccessKeyId,
		secretAccessKey: cfg.SecretAccessKey,
		sessionToken: cfg.SessionToken,
	};
	config.update(setting);
	config.region = defaultStorage.region;

	const s3 = new S3({
		apiVersion: defaultStorage.apiVersion,
	});
	return s3;
};


export interface IUpload {
	onProgress?: ({ }, f: UploadFile) => void; // 需要重写的antd的progress函数
	onSuccess?: () => void; // antd中progress百分百时的成功函数
	file: UploadFile; // 上传失败的progress函数
	onError: () => void;
}
export const V_Upload = (s3Config: IS3Config, body: UploadRequestOption, bucket?: string, key?: string): void => {
	const s3 = createS3(s3Config); //传入您的S3令牌

	const albumPhotosKey = key ? key : defaultStorage.Key;
	const photoKey = encodeURIComponent(albumPhotosKey) + "/" + body.file.name;

	const uploadParams = {
		Body: body.file, // 文件
		Bucket: bucket ? bucket : defaultStorage.Bucket, // 对应S3上的bucket
		Key: photoKey // 需要上传到的路径
	}
	console.log(`uploadParams`, uploadParams)
	s3.upload(uploadParams, function (err, data) {
		if (err) {
			console.log("Error", err);
		} if (data) {
			console.log("Upload Success", data.Location);
		}
	});
	// s3.putObject( // s3上面的putObject方法 第一个参数是一个对象，第二个参数是一个函数，函数有两个值，1.表示上传失败，2.表示上传成功
	//     uploadParams,
	//   (err: AWSError, resp: PutObjectOutput) => {
	//     if (err) {
	//       console.log(`err`, err) // 上传失败时调用
	//     } else {
	//       console.log(`res`, err)// 上传成功时调用
	//     }
	//   }).on('httpUploadProgress', (progress) => { // 上传S3时‘httpUploadProgress’函数里可以定义progress
	//     const percent = 100 * progress.loaded / progress.total;
	//     // https://github.com/react-component/upload/blob/master/examples/customRequest.js onProgress 第一个参数是进度条的值，第二个参数是当前上传的文件 
	//     // body.onProgress 是antd中的onProgress 重写的progress
	//     body.onProgress ? body.onProgress({ percent }, body.file) : void 0;
	//     if (percent === 100 && body.onSuccess) body.onSuccess(); // 上传到百分百时调用 antd中的onSuccess 
	//   }).on('httpError', (err) => {
	//     if (err && body.onError) {
	//       console.log(`err`, err) 
	//       body.onError();
	//     }
	//   });


};



