interface CollorEffectProps {
  children: string | undefined;
}

const ColorEffect: React.FC<CollorEffectProps> = ({ children }) => {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-accent">
      {children}
    </span>
  );
};

export default ColorEffect;
