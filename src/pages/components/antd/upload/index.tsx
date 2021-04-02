/*
 * @Author: your name
 * @Date: 2021-04-02 10:54:37
 * @LastEditTime: 2021-04-02 15:02:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/antd/upload/index.tsx
 */
import React from 'react';
import { Upload } from "antd";
import { IS3Config, V_Upload } from '@/utils/uploadUseS3';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { APIGets3UploadKey } from '@/pages/api/request';
import { PropsType } from 'antd-mobile/lib/date-picker';


interface Props{
    showUploadList:boolean
    [index:string]:any
}
interface IParam {
  onProgress?: ({}:any, f: UploadFile) => void;
  onSuccess?: () => void;
  onError: () => void;
  file: UploadFile & { webkitRelativePath: string };
}
export default class UploadComponent extends React.Component<Props> {
  public S3token :IS3Config|{} = {}; // 您的S3临时令牌
  public bucket: string = 'fudiandmore-web'; // 您要上传到的bucket名字
  public key: string = 'images/'; // bucket下面的路径
  private upload = (param:UploadRequestOption) => {
    console.log(`this.S3token`, this.S3token)
    V_Upload(this.S3token, this.bucket, this.key, param)
  }
    async componentDidMount(){
        const { data } = await APIGets3UploadKey();
        this.S3token={
            AccessKeyId: data.accessKeyId,
            SecretAccessKey:data.secretAccessKey,
            SessionToken:data.sessionToken
        }        
  }
  public render () {
      console.log(`this.props`, this.props)
    return (
      <Upload 
        customRequest={this.upload}
        {...this.props}
        >

       { this.props.children}
      </Upload>
    );
  }
}
