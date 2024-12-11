const UserTag = ({ label }: { label: string }) => {
  return (
    <div className="caption-1-sb rounded-sm bg-label-normal px-1.5 py-[3px] text-primary-white">
      {label}
    </div>
  );
};

export default UserTag;
