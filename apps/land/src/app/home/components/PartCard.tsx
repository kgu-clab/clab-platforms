interface PartCardProps {
  name: string;
  description: string;
}

export default function PartCard({ name, description }: PartCardProps) {
  return (
    <div className="from-clab-yellow-gray border-clab-dark-yellow flex flex-col rounded-xl border bg-gradient-to-t p-8 text-center transition hover:scale-110">
      <p className="mb-8 text-3xl font-bold">{name}</p>
      <p className="text-lg leading-loose">{description}</p>
    </div>
  );
}
