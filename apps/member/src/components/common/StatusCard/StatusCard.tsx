import type { StatusCardProps } from './StatusCard.types';

const StatusCard = ({ icon, label, description }: StatusCardProps) => {
  return (
    <div>
      <div className="mb-2 w-fit rounded-full bg-gray-100 p-2">{icon}</div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default StatusCard;
