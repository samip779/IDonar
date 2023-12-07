export const generateOTP = (numberOfDigits: number): string => {
  let otp = '';
  const possibleDigits = '0123456789';
  for (let i = 0; i < numberOfDigits; i++) {
    otp += possibleDigits.charAt(
      Math.floor(Math.random() * possibleDigits.length),
    );
  }
  return otp;
};
