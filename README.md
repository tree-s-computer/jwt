# JWT(JSON Web Token)

## 개요

이 문서에서는 JWT(JSON Web Token)의 구조에 대해 공부해봅시다.

JSON 웹 토큰(JWT)은 두 당사자 간에 전송될 클레임을 표현하는데 있어서 간결하고 URL 안전한 수단입니다. JWT 내의 클레임은 JSON 웹 서명(JWS) 구조의 페이로드로 사용되거나 JSON 웹 암호화(JWE) 구조의 평문으로 사용되는 JSON 객체로 인코딩되어, 클레임이 디지털 서명되거나 메시지 인증 코드(MAC)로 무결성 보호 및/또는 암호화될 수 있도록 합니다.

자세한 정보는 JWT 표준 문서 [rfc7519](https://datatracker.ietf.org/doc/html/rfc7519)를 참고해서 확인할 수 있습니다.

이 문서에서는 JSON 웹 서명(JWS)가 포함되어, 암호화된 것이 아니라 서명된 JWT에 대해 다룹니다.

## 구조

JWS는 JSON 기반 데이터 구조를 사용하여 디지털 서명 또는 메시지 인증 코드(MAC)로 보안이 유지된 내용을 나타냅니다.
JWS에 대한 자세한 내용은 [rfc7515](https://datatracker.ietf.org/doc/html/rfc7515)를 참고해서 확인할 수 있습니다.

올바르게 형성된 JWT는 점(.)으로 구분된 세 개의 연결된 Base64url 인코딩 문자열로 구성됩니다. base64url 인코딩은 base64 인코딩과 유사하지만 URL 안전 문자만 사용합니다. 자세한 내용은 [rfc4648#section-5](https://datatracker.ietf.org/doc/html/rfc4648#section-5)를 참고해서 확인할 수 있습니다.

- JOSN 헤더: 토큰의 유형과 그 내용을 보호하는 데 사용된 암호화 알고리즘에 대한 메타데이터를 포함합니다.

- JWS 페이로드(클레임 세트): 사용자의 신원과 그들이 허용된 권한과 같은 검증 가능한 보안 정보을 포함합니다.

- JWS 서명: 토큰이 신뢰할 수 있고 변조되지 않았음을 확인하는 데 사용됩니다. JWT를 사용할 때 저장하고 사용하기 전에 그 서명을 확인해야 합니다.

다음은 인코딩된 JWT의 예입니다.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

위의 예시를 디코딩하면 다음과 같은 JSON 객체를 얻을 수 있습니다.

```json
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```
