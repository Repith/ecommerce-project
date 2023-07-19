interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="z-0 mx-auto max-w-7xl">{children}</div>;
};

export default Container;
