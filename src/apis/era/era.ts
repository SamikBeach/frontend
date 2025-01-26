import axios from '../axios';
import { Era } from './types';

export const eraApi = {
  /**
   * 모든 시대 목록을 조회합니다.
   */
  getAllEras: () => {
    return axios.get<Era[]>('/era');
  },
};
