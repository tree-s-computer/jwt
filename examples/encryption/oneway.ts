import crypto from "node:crypto";

//인자 : 비밀번호, salt, 반복 횟수, 비밀번호 길이, 해시 알고리즘
crypto.pbkdf2("입력비밀번호", "기존salt", 100000, 64, "sha512", (err, key) => {
  console.log(key); //<Buffer 10 f1 b7 14 ef 38 f4 0c b ...
  const x = key.toString("base64");
  console.log(x === "기존 비밀번호"); //false
});
