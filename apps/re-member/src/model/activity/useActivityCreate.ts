import { useContext } from "react";
import { ActivityCreateContext } from "./ActivityCreateContext";

export const useActivityCreate = () => {
  const context = useContext(ActivityCreateContext);
  if (!context) {
    throw new Error(
      "useActivityCreate는 ActivityCreateProvider 내에서만 사용할 수 있어요.",
    );
  }
  return context;
};
