const ButtonRounded = ({ label }: { label: string }) => {
  return (
    <button
      type="button"
      className="body-2-m inline-block rounded-[44px] bg-label-normal px-3 py-1 text-white"
    >
      {label}
    </button>
  );
};

export default ButtonRounded;
