import { SettingsColor } from '@clab-platforms/icon';

const SetupPanel = () => {
  return (
    <button className="m-auto flex w-fit items-center justify-center rounded-full border bg-white p-2 hover:bg-gray-100">
      <SettingsColor width={20} height={20} />
    </button>
  );
};

export default SetupPanel;
