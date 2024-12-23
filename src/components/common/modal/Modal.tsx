'use client';

import { Button } from '@/components/common/button/Button';
import { useModalStore, type TextHighlight } from '@/store/useModalStore';

const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight?: TextHighlight;
}) => {
  if (!highlight) return <span className="whitespace-pre-line">{text}</span>;

  return (
    <span className="whitespace-pre-line">
      {text.slice(0, highlight.range.start)}
      <span className={highlight.color}>
        {text.slice(highlight.range.start, highlight.range.end)}
      </span>
      {text.slice(highlight.range.end)}
    </span>
  );
};

const Modal = () => {
  const { modal, closeModal } = useModalStore();
  const {
    isOpen,
    icon: Icon,
    title,
    titleHighlight,
    message,
    messageHighlight,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
  } = modal;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-[335px] animate-slide-up rounded-2xl bg-white p-6">
        {Icon && (
          <div className="mb-4 flex justify-center">
            <div className="bg-primary-light flex h-16 w-16 items-center justify-center rounded-full">
              <Icon />
            </div>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-xl font-bold">
            <HighlightedText text={title} highlight={titleHighlight} />
          </h2>
          <p className="text-body-2-r mt-2 whitespace-pre-line text-label-alternative">
            <HighlightedText text={message} highlight={messageHighlight} />
          </p>
        </div>

        <div className="mt-9 flex justify-center">
          {onCancel ? (
            <div className="flex gap-2">
              <Button
                label={cancelText}
                size="addon"
                handler={handleCancel}
                fill="white"
              />
              <Button
                label={confirmText}
                size="addon"
                handler={handleConfirm}
              />
            </div>
          ) : (
            <Button label={confirmText} size="addon" handler={handleConfirm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
