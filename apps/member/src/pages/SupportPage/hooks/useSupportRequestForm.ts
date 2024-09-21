import { useCallback, useState } from 'react';

import { SELECT_DEFAULT_OPTION } from '@constants/select';

const INIT_CHECK_LIST = [false, false, false];

const INIT_FORM_DATA = {
  category: SELECT_DEFAULT_OPTION,
  amount: 0,
  content: '',
  account: '',
  file: null,
};

export interface SupportRequestData {
  category: string;
  amount: number;
  content: string;
  account: string;
  file?: File | null;
}

export const useSupportRequestForm = () => {
  const [formData, setFormData] = useState<SupportRequestData>(INIT_FORM_DATA);
  const [checkList, setCheckList] = useState<boolean[]>(INIT_CHECK_LIST);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'amount' ? parseFloat(value.replace(/,/g, '')) : value,
      }));
    },
    [],
  );

  const handleTabsChange = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  }, []);

  const handleFileAccepted = useCallback((file?: File) => {
    setFormData((prev) => ({
      ...prev,
      file,
    }));
  }, []);

  const handleCheckboxChange = useCallback((index: number) => {
    setCheckList((prev) => {
      const next = [...prev];
      next[index] = !prev[index];
      return next;
    });
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(INIT_FORM_DATA);
    setCheckList(INIT_CHECK_LIST);
  }, []);

  return {
    formData,
    checkList,
    handleCheckboxChange,
    handleFileAccepted,
    handleInputChange,
    handleTabsChange,
    resetFormData,
  } as const;
};
