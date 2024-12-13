const Listbox = ({ children, ...props }) => {
  return (
    <div role="listbox" {...props}>
      {children}
    </div>
  );
};
const ListboxButton = ({ children, ...props }) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};
const ListboxOption = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
const ListboxOptions = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export { Listbox, ListboxButton, ListboxOption, ListboxOptions };
