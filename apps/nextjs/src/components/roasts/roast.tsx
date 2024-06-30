const Roast: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="bg-pink-300 p-2 font-semibold leading-loose">{text}</div>
  );
};

export default Roast;
