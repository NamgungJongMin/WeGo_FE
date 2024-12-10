const VerticalProgressBar = ({ progressRate }: { progressRate: number }) => {
  return (
    <div className="relative h-[60px] w-1 overflow-hidden rounded-[10px] bg-gray-200">
      <div
        className="absolute bottom-0 left-0 w-full rounded-full bg-gray-500"
        style={{ height: `${progressRate}%` }}
      />
    </div>
  );
};

export default VerticalProgressBar;
