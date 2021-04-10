import { config, S3, AWSError } from 'aws-sdk';
import { PutObjectOutput } from '../../node_modules/aws-sdk/clients/s3';
import { UploadFile } from '../../node_modules/antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { message } from 'antd';


// S3 存储bucket配置
export const defaultStorage = {
	S3header: "https://fudiandmore.s3.eu-west-1.amazonaws.com/",
	region: "eu-west-1",
	apiVersion: "2006-03-01",
	Bucket: "fudiandmore",
	Key: "public"
}

// S3 配置 函数
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

export const V_Upload = (onSuccess: (info) => void, s3Config: IS3Config, body: UploadRequestOption, bucket?: string, key?: string): void => {
	const s3 = createS3(s3Config); //传入您的S3令牌
	const uploadParams = {
		Body: body.file, // 文件
		Bucket: bucket ? bucket : defaultStorage.Bucket, // 对应S3上的bucket
		Key: key ? key : defaultStorage.Key // 需要上传到的路径
	}
	s3.upload(uploadParams, function (err, data) {
		if (err) {
			console.log("Error", err);
			message.error(err)
		} if (data) {
			// console.log("Upload Success", data);
			const file = {
				"imageUrl": data.Location,
				"path": data.key
			}
			onSuccess({ file })
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




export interface IS3Config {
	AccessKeyId?: '';
	SecretAccessKey?: '';
	SessionToken?: '';
}

export interface IUpload {
	onProgress?: ({ }, f: UploadFile) => void; // 需要重写的antd的progress函数
	onSuccess?: () => void; // antd中progress百分百时的成功函数
	file: UploadFile; // 上传失败的progress函数
	onError: () => void;
}