import { FcSettings } from 'react-icons/fc';

const SetupPanel = () => {
  return (
    <button className="m-auto flex w-fit items-center justify-center rounded-full border bg-white p-2 hover:bg-gray-100">
      <FcSettings className="h-5 w-5" />
    </button>
  );
};

export default SetupPanel;
