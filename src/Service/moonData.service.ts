import { MoonApi } from '../Types/moonApi.types';

const url = 'https://ald76uu0g6.execute-api.us-east-1.amazonaws.com/project/lunarphase';

type MoonDataFetchOptions = {
  latitude: string;
  longitude: string;
  'current-date': string;
};

export const fetchMoonData = async (requestParams: MoonDataFetchOptions): Promise<MoonApi> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...requestParams,
    },
  };

  try {
    const response = await fetch(url, options);
    const result: MoonApi = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message as string);
  }
};
