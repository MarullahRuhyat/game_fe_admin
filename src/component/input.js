const Input = ({
  type,
  placeholder,
  value,
  handle,
  name,
  required = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handle}
      name={name}
      required={required}
      className="rounded-lg border-0 bg-bgray-50 p-4 focus:border focus:border-purple-300 focus:ring-0 dark:bg-darkblack-500 dark:text-white text-black"
    />
  );
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
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { Input, InputTextArea, InputSelect };
