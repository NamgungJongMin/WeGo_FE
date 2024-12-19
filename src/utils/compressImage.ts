export const compressImage = async (file: File): Promise<File | null> => {
  try {
    const { default: imageCompression } = await import(
      'browser-image-compression'
    );
    const options = {
      maxSizeMB: 2, // 최대 크기 (MB)
      maxWidthOrHeight: 800, // 최대 너비나 높이 (픽셀)
      useWebWorker: true, // 웹 워커 사용 여부
      fileType: 'image/webp',
    };
    const convertedFile = await imageCompression(file, options);
    return convertedFile;
  } catch (error) {
    console.error('파일 변환 중 오류:', error);
    return null;
  }
};
