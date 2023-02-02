type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className={"max-w-lg mx-auto relative"}>{children}</div>;
};

export default Container;
