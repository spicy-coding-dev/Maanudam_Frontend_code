
import * as Yup from "yup"

export const LoginValidation = Yup.object({
      emailOrPhone: Yup.string()
    .required("மின்னஞ்சல் அல்லது கைபேசி எண்ணை பதிவு செய்வது கட்டாயம்")
    .test(
      "email-or-phone",
      "Enter a valid email (e.g. user@example.com) or 10-digit phone number",
      function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),

   password: Yup.string().required("கடவுச்சொல் காலியாக இருக்கக்கூடாது").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,"கடவுச்சொல் குறைந்தது 1 பெரிய எழுத்து, 1 சிறிய எழுத்து, 1 எண் மற்றும் 1 சிறப்பு எழுத்து கொண்டிருக்க வேண்டும்,(e.g. A1234@b)"),
})
