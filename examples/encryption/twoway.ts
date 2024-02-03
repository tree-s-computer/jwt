import crypto from "node:crypto";

//대칭형 암호화
const cipher = crypto.createCipher("aes-256-cbc", "열쇠");
let result = cipher.update("암호화할문장", "utf8", "base64"); // 'HbMtmFdroLU0arLpMflQ'
result += cipher.final("base64"); // 'HbMtmFdroLU0arLpMflQYtt8xEf4lrPn5tX5k+a8Nzw='

const decipher = crypto.createDecipher("aes-256-cbc", "열쇠");
let result2 = decipher.update(result, "base64", "utf8"); // 암호화할문 (base64, utf8이 위의 cipher과 반대 순서입니다.)
result2 += decipher.final("utf8"); // 암호화할문장 (여기도 base64대신 utf8)

console.log(result);
console.log(result2);
