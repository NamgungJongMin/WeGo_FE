import Textarea from '@/components/common/textarea/Textarea';
import useCreateReviewStore from '@/store/useCreateReview';

const ReviewComment = () => {
  const { errorMessages, title, comment, setTitle, setComment } =
    useCreateReviewStore();
  return (
    <section className="flex w-full flex-col gap-3">
      <header>여행에 대한 후기를 남겨주세요!</header>
      <div>
        <Textarea
          name="여행제목"
          value={title}
          size="small"
          placeholder="여행 제목을 입력해 주세요."
          onChange={(e) => setTitle(e.target.value)}
          extraClassName="bg-background-alternative w-full h-[60px] overflow-hidden"
          className="body-2-m h-[40px] bg-background-alternative"
          maxLength={20}
        />
        {errorMessages.title && title === '' && (
          <p className="body-3-r text-status-error">{errorMessages.title}</p>
        )}
      </div>
      <div>
        <Textarea
          name="여행후기"
          value={comment}
          size="small"
          placeholder="여행에 대한 다양한 후기를 공유해 주세요!"
          onChange={(e) => setComment(e.target.value)}
          extraClassName="bg-background-alternative w-full h-[90px]"
          className="border-status-error bg-background-alternative"
          maxLength={100}
        />
        {errorMessages.comment && comment === '' && (
          <p className="body-3-r text-status-error">{errorMessages.comment}</p>
        )}
      </div>
    </section>
  );
};

export default ReviewComment;
