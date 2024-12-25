function generateOtp(number){
    return 1234;
}

function senOtpToNumber(number,otp,message){
    return true;
}

export async function sendOTP(number, message) {
    const apiKey = "kuODh5SeO5i0Dkqjx46T5CB72SXkyD5YZBfzwrr0QpGCw1MipqQyGUetsdok";
  
    console.log();
    if (!apiKey) {
      throw new Error("fast2sms API Key not found");
    }
  
    const data = {
      route: "v3",
      sender_id: "TXTIND",
      message,
      language: "english",
      numbers: number,
    };
  
    try {
      const response = await Axios.post(fast2SMS_URL, data, {
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error sending sms:", error);
    }
  }