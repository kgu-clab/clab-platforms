import type { StatusCardProps } from './StatusCard.types';

const StatusCard = ({ icon, label, description }: StatusCardProps) => {
  return (
    <div>
      <div className="p-2 mb-2 bg-gray-100 rounded-full w-fit">{icon}</div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default StatusCard;
