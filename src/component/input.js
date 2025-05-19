const Input = ({
  type,
  placeholder,
  value,
  handle,
  name,
  required = false,
  accept, // tambahan untuk file input
}) => {
  const inputProps = {
    type,
    placeholder,
    onChange: handle,
    name,
    required,
    className:
      "rounded-lg border-0 bg-bgray-50 p-4 focus:border focus:border-purple-300 focus:ring-0 dark:bg-darkblack-500 dark:text-white text-black",
  };

  if (type !== "file") {
    inputProps.value = value;
  }

  if (type === "file" && accept) {
    inputProps.accept = accept;
  }

  return <input {...inputProps} />;
};

const InputTextArea = ({
  placeholder,
  value,
  handle,
  name,
  requred = false,
  rows = 5,
}) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={handle}
      name={name}
      required={requred}
      className="rounded-lg border-0 bg-bgray-50 p-4 focus:border focus:border-purple-300 focus:ring-0 dark:bg-darkblack-500 dark:text-white"
    />
  );
};
const InputSelect = ({
  value,
  handle,
  name,
  required = false,
  options = [],
}) => {
  return (
    <select
      value={value}
      onChange={handle}
      name={name}
      required={required}
      className="rounded-lg border-0 bg-bgray-50 p-4 focus:border text-black focus:border-purple-300 focus:ring-0 dark:bg-darkblack-500 dark:text-white"
    >
      <option value="" disabled>
        Pilih
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { Input, InputTextArea, InputSelect };
