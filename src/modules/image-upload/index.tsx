// src/components/ImageUploader.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Button, Spin, Progress } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

import { resetImageUpload, uploadImage } from '@/redux/slice/uploadImageSlice';

const ImageUploader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, progress, uploadedImage } = useSelector((state: RootState) => state.uploadImage);

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      await dispatch(uploadImage(file)).unwrap();
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetImageUpload());
    };
  }, [dispatch]);

  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      {!uploadedImage && (
        <Upload customRequest={customRequest} showUploadList={false} disabled={loading} accept="image/*">
          <Button icon={<UploadOutlined />} disabled={loading}>
            Select Image
          </Button>
        </Upload>
      )}

      {loading && (
        <div style={{ marginTop: 16 }}>
          <Spin spinning={true} />
          <Progress percent={progress} status="active" />
        </div>
      )}

      {uploadedImage && (
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: 200 }} />
          <button
            style={{
              color: 'white',
              backgroundColor: 'red',
              borderRadius: 4,
              borderWidth: 0,
              padding: 6,
              fontWeight: 'bold',
              marginTop: 8,
              cursor: 'pointer',
            }}
            onClick={() => dispatch(resetImageUpload())}
          >
            <DeleteOutlined />
          </button>
        </div>
      )}

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default ImageUploader;
