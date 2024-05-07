import { Dispatch, SetStateAction } from "react";

export default function VInput({
  id,
  name,
  type,
  label,
  model,
  setModel,
  small,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  model: string;
  setModel: Dispatch<SetStateAction<string>>;
  small?: string;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
  };

  return (
    <div className="p-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium 
                text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        autoComplete={name}
        type={type}
        value={model}
        onChange={handleInputChange}
        className="w-full border boder-gray-300 px-3 py-2 rounded-lg shadow-sm"
      />
      {small && <small>{small}</small>}
    </div>
  );
}
