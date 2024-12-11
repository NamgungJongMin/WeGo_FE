import BlueStart from '@/assets/blue_star.svg';

const StarRate = ({ score }: { score: number }) => {
  const getStarFill = (rating: number) => {
    const filled = Math.min(Math.max(rating, 0), 5);
    const fullStars = Math.floor(filled);
    const remaining = (filled - fullStars) * 100;
    return { fullStars, remaining };
  };

  const renderStars = (rating: number) => {
    const { fullStars, remaining } = getStarFill(rating);

    return [1, 2, 3, 4, 5].map((starIndex) => {
      let style = {};
      const starCss = 'z-10 text-primary-normal';

      if (starIndex <= fullStars) {
        return <BlueStart key={starIndex} className={starCss} />;
      }

      if (starIndex === fullStars + 1) {
        style = { clipPath: `inset(0 ${100 - remaining}% 0 0)` };
      }

      return <BlueStart key={starIndex} className={starCss} style={style} />;
    });
  };

  return <div className="flex">{renderStars(score)}</div>;
};

export default StarRate;
