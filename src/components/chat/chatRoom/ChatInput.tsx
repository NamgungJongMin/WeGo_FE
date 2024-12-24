import { useState, useEffect, useRef } from 'react';
import Camera from '@/assets/camera.svg';
import Send from '@/assets/send.svg';
import Close from '@/assets/close_8px.svg';
import Image from 'next/image';
import useModal from '@/hooks/useModal';
import Photo from '@/assets/modal/modal_photo.svg';

interface Props {
  onSendMessage: (message: string, images: File[]) => void;
  onHeightChange: (height: number) => void;
}

const ChatInput = ({ onSendMessage, onHeightChange }: Props) => {
  const [message, setMessage] = useState('');
  const [imageUrls, setImageUrls] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showModal } = useModal();

  const updateTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      const inputBoxHeight = imageUrls.length
        ? textareaRef.current.offsetHeight + 72
        : textareaRef.current.offsetHeight;
      onHeightChange(inputBoxHeight);
    }
  };

  useEffect(() => {
    updateTextareaHeight();

    const handleResize = () => {
      updateTextareaHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [message]);

  const handleSend = () => {
    if (message.trim() || imageUrls.length) {
      onSendMessage(message.trim(), imageUrls);
      setMessage('');
      setImageUrls([]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      const totalImages = imageUrls.length + uploadedFiles.length;

      if (totalImages > 9) {
        showModal(`이미지는 최대 9장까지\n등록 가능합니다.`, '', {
          icon: Photo,
          confirmText: '확인',
          titleHighlight: {
            range: { start: 8, end: 10 },
            color: 'text-primary-normal',
          },
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setImageUrls((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleImageRemove = (url: File) => {
    setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="absolute bottom-0 flex h-auto w-full flex-col border-t border-line-neutral bg-primary-white px-4 pb-4 pt-[15px] custom-scrollbar">
      <div
        className={`flex ${textareaRef.current && (imageUrls.length || textareaRef.current.offsetHeight > 22) ? 'items-end' : 'items-center'}`}
      >
        <label htmlFor="이미지 업로드 버튼" className="cursor-pointer">
          <Camera />
          <input
            id="이미지 업로드 버튼"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="ml-2.5 flex max-w-full flex-1 flex-col gap-2.5 overflow-x-hidden rounded-3xl bg-gray-100 px-4 py-2">
          {imageUrls.length > 0 && (
            <div className="flex gap-4 overflow-x-auto custom-scrollbar">
              {imageUrls.map((file, index) => (
                <div
                  key={URL.createObjectURL(file)}
                  className="relative mt-[6px] h-[56px] w-[56px] flex-shrink-0"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`업로드된 이미지 미리보기 ${index + 1}`}
                    fill
                    className="rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(file)}
                    className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60"
                  >
                    <Close />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end">
            <textarea
              ref={textareaRef}
              rows={1}
              className="body-2-r max-h-32 flex-1 resize-none overflow-y-auto bg-transparent text-label-alternative outline-none custom-scrollbar"
              placeholder="메시지 보내기"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button type="button" onClick={handleSend} aria-label="메시지 전송">
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
