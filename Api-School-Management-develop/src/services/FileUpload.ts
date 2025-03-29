import axios from "axios";

const UploadToImgBB = async (file: File) => {
  const apiKey = "ec5ebf8e5d5f89590aa4a1bea33995a3";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data.url as string;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default UploadToImgBB;