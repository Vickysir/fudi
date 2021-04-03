/*
 * @Author: your name
 * @Date: 2021-03-05 13:42:46
 * @LastEditTime: 2021-04-02 15:05:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/uploadAvatar/index.tsx
 */
import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { havePlaceholder } from '@/utils';
import './index.less'
import { SettingPageInfoPostResponse } from '@/pages/api/types';
import { APIGets3UploadKey } from '@/pages/api/request';
// import { AWSuploadS3, uploadParams } from '@/utils/uploadUseS3';
import UploadComponent from '@/pages/components/antd/upload';

interface Props {
    userInfo: SettingPageInfoPostResponse
}
export default class UploadAvatar extends React.Component<Props> {
    state = {
        loading: false,
        imageUrl: ""
    };
    async componentDidMount() {

    }
    handleChange = info => {
        console.log(`info`, info.file)
        const formData = new FormData();
        formData.append('Bucket', 'fudiandmore-web');
        formData.append('Key', '/images/');
        formData.append('Body', info.file);
        // AWSuploadS3(formData);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const { userInfo } = this.props;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div className="upload-box">
                {/* <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader upload-box-avatar"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload> */}
                <UploadComponent
                    showUploadList={false}
                    className="avatar-uploader upload-box-avatar"
                    listType="picture-card"
                    name="avatar"
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </UploadComponent>
                <h3>{havePlaceholder(userInfo?.nickname, "-")}</h3>
            </div>

        );
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}