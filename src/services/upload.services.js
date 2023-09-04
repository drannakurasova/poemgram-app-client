

import service from "./service.config";

const uploadImageService = (imageUrl) => {
  return service.post("/upload", imageUrl);
};

export { uploadImageService };