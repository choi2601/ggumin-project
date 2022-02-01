import client from './client';
import { API } from '../../config';

export const furnitureView = () => {
  return client.get(API.furnitureView);
};
