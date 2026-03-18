type Props = {
  htmlFor: string;
  children: React.ReactNode;
};

const Label = ({ htmlFor, children }: Props) => (
  <label
    htmlFor={htmlFor}
    className="
    text-[#2C2C2C]
    font-medium
    mb-1
    "
  >
    {children}
  </label>
);

export default Label;