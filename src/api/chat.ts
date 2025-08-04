import axios from "axios";

export const testGeminiConnection = async () => {
  try {
    const response = await axios.get("https://my-stock-new-server.onrender.com/api/gemini/test");
    return response.data;
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
};

export const sendChatMessage = async (message: string, stockContext?: any) => {
  try {
    const response = await axios.post("https://my-stock-new-server.onrender.com/api/gemini/chat", {
      message,
      stockContext,
    });
    return response.data.response;
  } catch (error: any) {
    console.error("Chat API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.details || "서버 오류가 발생했습니다.");
  }
};

export const uploadToNotion = async (messages: any[]) => {
  try {
    const response = await axios.post("https://my-stock-new-server.onrender.com/api/notion/upload", {
      messages,
    });
    return response.data;
  } catch (error: any) {
    console.error("Notion Upload Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.details || "노션 업로드에 실패했습니다.");
  }
};