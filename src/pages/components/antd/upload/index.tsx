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


interface Props {
  showUploadList: boolean,
  onChange: (info) => void,
  storagePath?: {
    bucket?: string,
  }
  [index: string]: any
}
interface IParam {
  onProgress?: ({ }: any, f: UploadFile) => void;
  onSuccess?: () => void;
  onError: () => void;
  file: UploadFile & { webkitRelativePath: string };
}


export default class UploadComponent extends React.Component<Props> {

  public S3token: IS3Config | {} = {}; // 您的S3临时令牌
  public bucket: string = this.props?.storagePath?.bucket; // 您要上传到的bucket名字
  public key: string; // bucket下面的路径
  private upload = async (param: UploadRequestOption) => {
    V_Upload(this.onSuccess, this.S3token, param, this.bucket, this.key);
  }

  async componentDidMount() {
    const { data } = await APIGets3UploadKey();
    this.S3token = {
      AccessKeyId: data.accessKeyId,
      SecretAccessKey: data.secretAccessKey,
      SessionToken: data.sessionToken
    }
    this.key = data.objectKey;
  }

  onSuccess = (info) => {
    this.props.onChange(info)
  }

  public render() {
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
