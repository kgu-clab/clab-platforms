interface NotificationItemProps {
  date: Date;
  title: string;
  description: string;
}

export default function NotificationItem({
  date,
  title,
  description,
}: NotificationItemProps) {
  return (
    <li className="w-full">
      <div className="w-full border-b pb-2">
        <p className="break-keep text-xl font-semibold">
          {date.toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4">
        <p className="break-keep text-xl font-semibold text-orange-500">
          {title}
        </p>
        <p className="mt-2 break-keep">{description}</p>
      </div>
    </li>
  );
}
