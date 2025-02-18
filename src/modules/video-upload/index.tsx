// src/components/VideoUploader.tsx
import { Upload, Button, Spin, Progress } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { resetVideoUpload, uploadVideo } from '@/redux/slice/uploadVideoSlice';

const VideoUploader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, progress, uploadedVideo } = useSelector((state: RootState) => state.uploadVideo);

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      await dispatch(uploadVideo(file)).unwrap();
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetVideoUpload());
    };
  }, [dispatch]);

  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      {!uploadedVideo && (
        <Upload customRequest={customRequest} showUploadList={false} disabled={loading} accept="video/*">
          <Button icon={<UploadOutlined />} disabled={loading}>
            Select Video
          </Button>
        </Upload>
      )}

      {loading && (
        <div style={{ marginTop: 16 }}>
          <Spin spinning={true} />
          <Progress percent={progress} status="active" />
        </div>
      )}

      {uploadedVideo && (
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          <video src={uploadedVideo} controls style={{ maxWidth: 400, maxHeight: 300 }} />
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
            onClick={() => dispatch(resetVideoUpload())}
          >
            <DeleteOutlined />
          </button>
        </div>
      )}

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default VideoUploader;
