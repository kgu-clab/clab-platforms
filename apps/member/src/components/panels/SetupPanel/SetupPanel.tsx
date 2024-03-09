import { FcSettings } from 'react-icons/fc';

const SetupPanel = () => {
  return (
    <button className="flex items-center justify-center p-2 m-auto bg-white border rounded-full w-fit hover:bg-gray-100">
      <FcSettings size={20} />
    </button>
  );
};

export default SetupPanel;
