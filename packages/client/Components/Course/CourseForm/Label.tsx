type Props = {
  htmlFor: string;
  children: React.ReactNode;
}

const Label = ({ htmlFor, children }: Props) => (
  <label className='text-[#FFB347]' htmlFor={htmlFor}>{children}</label>
)

export default Label;