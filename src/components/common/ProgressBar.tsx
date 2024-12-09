const ProgressBar = ({ progressRate }: { progressRate: number }) => {
  return (
    <div className="relative h-[6px] w-full overflow-hidden rounded-[10px] bg-slate-200">
      <div
        className="absolute bottom-0 left-0 top-0 rounded-full bg-primary-normal"
        style={{ width: `${progressRate}%` }}
      />
    </div>
  );
};
export default ProgressBar;
