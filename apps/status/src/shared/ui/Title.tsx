interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className="w-full border-b pb-2">
      <h3 className="text-2xl font-semibold">{text}</h3>
    </div>
  );
}
