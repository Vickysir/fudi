/*
 * @Author: your name
 * @Date: 2021-03-05 13:42:46
 * @LastEditTime: 2021-03-05 13:53:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/uploadAvatar/index.tsx
 */
import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import { SettingPageInfoPostResponse } from '@/pages/api/types/personalCenter';

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

interface Props {
    userInfo: SettingPageInfoPostResponse
}
export default class UploadAvatar extends React.Component<Props> {
    state = {
        loading: false,
        imageUrl: ""
    };

    handleChange = info => {
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
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader upload-box-avatar"
                    showUploadList={false}
                    action=""
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <h3>{userInfo.nickname}</h3>
            </div>

        );
    }
}