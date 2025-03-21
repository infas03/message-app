import userApi from './apiComponents/userApi.js';
import messageApi from './apiComponents/messageApi.js';

export default function (app) {
  userApi(app);
  messageApi(app);
}
