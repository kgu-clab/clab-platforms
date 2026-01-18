import { IoAdd } from "react-icons/io5";

export default function CommunityWriteButton() {
  return (
    <button className="bg-primary absolute bottom-32 right-4 flex h-14 w-14 items-center justify-center rounded-full text-4xl text-white shadow-2xl">
      <IoAdd />
    </button>
  );
}
