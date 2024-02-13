import { API_BASE_URL, END_POINT } from '@constants/api';
import type { AccusesType } from '@type/accuses';
import { createPath, getAccessToken } from '@utils/api';

export const postAccuses = async (body: AccusesType) => {
  const accessToken = getAccessToken();

  const { data } = await fetch(createPath(API_BASE_URL, END_POINT.ACCUSES), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};
