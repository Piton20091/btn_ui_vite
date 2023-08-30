interface TextFieldProps {
  name: string;
}

export const TextField = (props: TextFieldProps) => {
  const { name } = props;
  console.log(name);
  
  return <div>{}</div>;
};
