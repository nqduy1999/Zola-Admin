import axios from '../../utils/axios';
export const Upload_Image_Single = formData => {
  return axios
    .post(`https://api-ret.ml/api/v0/images/upload-avatar`, formData)
    .then(res => {
      return res?.data;
    });
};
