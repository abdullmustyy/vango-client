import { useField } from "formik";

export const MyTextInput = ({
  label,
  ...props
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id?: string;
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input
        className="block w-full border border-gray-300 focus:border-[#FF8C38] p-2 focus:outline-none focus:ring ring-[#FF8C38]/50 rounded-md"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyTextArea = ({
  label,
  ...props
}: {
  label: string;
  name: string;
  placeholder: string;
  id?: string;
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <textarea
        className="block w-full border border-gray-300 focus:border-[#FF8C38] p-2 focus:outline-none focus:ring ring-[#FF8C38]/50 rounded-md"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};
