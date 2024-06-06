import type { NavalMoonAPI } from '../Types/navalApi.types';

const url = 'https://ald76uu0g6.execute-api.us-east-1.amazonaws.com/project/lunarphase';

type MoonDataFetchOptions = {
  latitude: string;
  longitude: string;
  'current-date': string;
};

export const fetchMoonData = async (requestParams: MoonDataFetchOptions): Promise<NavalMoonAPI> => {
  const options = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      ...requestParams 
    }
  }

  try {
    const response = await fetch(url, options);
    const result: NavalMoonAPI = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message as string);
  }
};