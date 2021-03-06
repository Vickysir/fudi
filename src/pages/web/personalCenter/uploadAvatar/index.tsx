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
import { CommonInfo, SettingPageInfoPostResponse } from '@/pages/api/types';
import { APIGets3UploadKey, APIPersonalCenterUpdateIcon } from '@/pages/api/request';
// import { AWSuploadS3, uploadParams } from '@/utils/uploadUseS3';
import UploadComponent from '@/pages/components/antd/upload';
import { defaultStorage } from '@/utils/uploadUseS3';
import { mapAppStoreToProps } from '@/__internal';
import { IAuthInfo } from '@/config/customStore';

interface Props {
    userInfo: SettingPageInfoPostResponse
    authInfo: IAuthInfo
}
@mapAppStoreToProps(["authInfo"])
export default class UploadAvatar extends React.Component<Props> {
    state = {
        loading: false,
        imageUrl: "",
        head: "",
    };
    async componentDidMount() {
        console.log(`this.props`, this.props)
    }
    static getDerivedStateFromProps(props, state) {
        if (state.head === "") {
            return {
                imageUrl: defaultStorage.S3header + props.userInfo?.head
            }
        } else {
            return {
                imageUrl: state.imageUrl
            }
        }
    }
    handleChange = async (info) => {
        if (info.file?.imageUrl) {
            console.log(`info`, info)
            await APIPersonalCenterUpdateIcon({ "head": info.file.path })
            this.setState({
                imageUrl: info.file.imageUrl,
                head: info.file.path
            })
            message.success("Uploaded successfully")
            // 更新header
            APP_STORE.commonInfo = {
                ...APP_STORE.commonInfo,
                refreshCart: new Date().getTime()
            };

        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const nickname = this.props.authInfo?.nickname
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div className="upload-box">
                <UploadComponent
                    showUploadList={false}
                    className="avatar-uploader upload-box-avatar"
                    listType="picture-card"
                    name="avatar"
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: "100%", "borderRadius": "50%" }} /> : uploadButton}
                </UploadComponent>
                <h3 className="inaline">{havePlaceholder(nickname, "-")}</h3>
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