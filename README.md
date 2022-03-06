# voc-client
IDE : Vscode
구성 환경 : Vue.js (Vue 2.X 사용)
node version : v16.13.0
사용한 기술 스택 : Vue-Router, Vuex, Axios

## 첫 실행 시
```
npm install
```
## 만약 node version 이슈가 있다면
```
nvm use 16.13.0
```

### 실행
```
npm run serve
```

### LOGIN 
localhost:8080 으로 접속 후 상담사 전용 페이지 클릭
testA / 1234
testB / 1234
testC / 1234 로 로그인 가능

### 문제 해결 방법
1. 상담사와 고객을 구분하기 : 로그인을 한 뒤 상담사와 고객에게 보이는 화면을 구분할 필요가 있었고 Login Token 정보를 Session Storage 에 저장하도록 했습니다.
   쿠키에 저장했으면 더 좋겠지만 vue-cookies 라이브러리를 사용하지 않기 위해 Session Storage 를 사용했습니다. 구분이 필요한 페이지에선 Session Storage 를 조회하여 token 유무를 확인했습니다.
2. Axios 요청 이후 새로고침 : 로그인이나 글을 남긴 뒤 페이지를 강제로 새로고침해서 페이지를 새로 불러와야하는 경우가 있었습니다.
   router.go() 를 사용하면 window.reload 를 사용하지 않고 새로고침할 수 있어 router.go() 를 사용했습니다.
3. 할당된 VOC 가 현재 로그인 중인 상담사인지 확인 : 로그인 중인 상담사를 확인할 필요가 있었는데 상담사 본인인지 확인하기 위해 api 를 요청하는 것은 낭비라고 생각하여 Session Storage 에 저장했습니다.

### 아쉬운 점
Paging 처리를 위해 List 응답과 요청을 Page 형식으로 만들었는데 시간상 구현하지 못해 많이 아쉽다.


