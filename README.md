---

# 1. 팀 및 팀원 소개

  안녕하세요, 저희는 2조 **심야코딩🌙** 입니다:) 저희 팀은 이번에 **“웃기고 재미있으면 된 거다! 유용하면 더 좋고.”** 라는 모토로, 이번 프로젝트 주제를 선정하였습니다. 

   저희 팀은 리더 이참님, 팀원 안단테님, 조성준님, 강지수님, 김승희님 총 5인으로 구성되어 있습니다.

**[역할 분배]**

- 이참 `팀장`
    - 개발
        - 와이어 프레임 제작
        - 로그인 페이지
        - 회원가입 페이지
        - 인트로 페이지
        - 레이아웃 헤더
    - 협업
        - PPT 제작
        - 프로젝트 자료 정리, 기능 구체화
        - 진행 상황에 따른 역할 분배 및 confirm
- 안단테 `팀원`
    - 개발
        - 메인 페이지
    - 협업
        - 팀원 PR 코드 리뷰 참여
        - 문제 발생시 채팅을 통한  의사소통 참여
        - 지도에  나의 위치와 가까운 화장실 데이터 보여주기
        - 배포 후  테스터로 참여
- 조성준 `팀원`
    - 개발
        - 디테일 페이지
        - 리뷰 총평/ 전체 리뷰평점 평균
        - 리뷰 추가/ 수정/ 삭제
    - 협업
        - 로그인 상태에 따른 렌더링
- 강지수 `팀원`
    - 개발
        - 북마크 페이지
        - 레이아웃 헤더
    - 협업
        - 배포 및 화장실 위치 데이터 관리
- 김승희 `팀원`
    - 개발
        - 팁 페이지
        - 에티켓 페이지
    - 협업
        - 최종 선정 아이디어 제공자
        - PPT 가이드라인
        - 발표

# 2. 사용한 라이브러리

1. zustand : 전역 상태 관리 라이브러리
    - **선정 이유**
        1. 사용이 간편하고 쉽게 배울 수 있다.
        2. 구현 및 변경 방식이 간단하여 redux 보다 보일러플레이트 코드가 적다.
        3. 상태 변화에 따른 불필요한 컴포넌트 렌더링을 최소화한다.
2. supabase : 인증/인가 
    - **선정 이유**
        1. supabase가 SQL database이고, 대부분의 프로젝트에서 SQL형식의 데이터가 많아서 경험해보면 좋을 것 같다.
        2. supabase가 SQL database이고, 대부분의 프로젝트에서 SQL형식의 데이터가 많아서 경험해보면 좋을 것 같다.
        3. 프로젝트 데이터의 특성상 superbase가 가장 적합하다고 판단하였다.
        4. 프로젝트 데이터의 특성상 superbase가 가장 적합하다고 판단하였다.
3. react-query
    - **선정 이유**
        1. 만일 비동기 데이터를 state에 보관하게 될 경우 component의 life-cycle에 따라서 비동기 데이터가 관리되므로 캐싱등의 최적화를 하기 어려워진다.
        2. 방대한 보일러 플레이트의 양을 줄일 수 있다.
        3. query의 자체 기능을 이용해서 개발 효율을 향상 시킬 수 있다.
        4. API 요청을 위한 규격화된 방식 (협업 효율 상승)
        5. Query-Key를 통해 쿼리 캐싱을 관리할 수 있다. 즉, 동일한 쿼리를 여러 번 수행할 때, 매번 서버를 요청하지 않고 이미 가져온 데이터를 사용해 응답 시간을 줄일 수 있다는 장점이 있어 선택하게 되었다.
        **⇒ 유지 보수 및 확장성 측면에서 큰 이점을 지닌다.**
4. tailwind-css : 디자인

# 3. 프로젝트 소개 (동기 및 목적 등)

## 3-1. 프로젝트 소개 및 목적

bgm : https://youtu.be/FoO7Pmx0bE4?si=fJRSMmTN4uU4aevK (야레야레 못말리는 아가씨, It’s time to go to toilet)

<aside>
👋🏻 **땀 뻘뻘 흘리며 화장실을 찾던 날들이여, 안녕 !**

</aside>

심야코딩의 첫번째 프로젝트, **`똥간은 어디에?`** 를 소개합니다.

이곳에서는 공용 화장실의 위치를 빠르게 찾아, 급한 일을 빠르게 해결할 수 있습니다.

**🚽 PROJECT#1 : 똥간은 어디에? (공용 화장실이 어디에 있는 지)**

> 공용 화장실이 어디에 있는지 알려줍니다. 추후 화장실 후기 및 정보를 공유하도록 확장할 수 있습니다. 
생존과 직결된 유용한 프로젝트입니다. 로그인 하지 않아도 사용할 수 있는 기능이 많습니다.
> 
> 
> **[어떤 기능을 제공하나요?]**
> 
> 1. **사용자의 위치로부터 가장 가까운 화장실을 추천해줍니다. (`핵심 기능`)**
> 2. 로그인을 통해 화장실에 대한 리뷰를 작성할 수 있습니다.
>     
>     ⇒ 사용자가 리뷰를 작성할 동기가 부족하다는 피드백이 있었습니다. 
>     시간이 부족하여 구현하지는 못했지만, 게임을 만들어 리뷰 작성 시 게임 아이템을 주는 방향으로 유저의 리뷰 작성 동기를 끌어오고자 했습니다. 
>     (화장실에서 쾌변하며 하는 게임 ; 즐똥게임)
>     

# 4. 프로젝트 페이지 별 기능 설명

헤더 적용 여부에 따라 `Layout`, `NoLayout`으로 페이지를 구분하였습니다.
프로젝트의 특성을 고려하여 `Mobile-First UI`로 제작할 수 있도록 노력했습니다.

## 4-1. Intro : No-Layout

> 첫 화면으로, `framer`를 사용한 애니메이션을 적용하였습니다.
> 


**[ 기능 ]**

- [x]  유저에게 재미있는 경험을 줄 수 있는 애니메이션 적용
- [x]  ‘똥간’ 키워드 클릭 시 홈페이지로 이동

## 4-2. Login : No-Layout

> 유저가 로그인 할 수 있는 페이지입니다.
> 


**[ 기능 ]**

- [x]  로그인 기능
- [x]  아이디 또는 비밀번호가 입력되지 않는 등의 상황에 대한 에러 핸들링 로직
- [x]  회원가입 페이지로 이동
- [ ]  비밀번호 찾기 페이지로 이동

## 4-3. SignUp : No-Layout

> 유저가 회원가입을 할 수 있는 페이지입니다.
> 


**[ 기능 ]**

- [x]  회원가입 기능
- [x]  유효하지 않은 이메일, 6자 이하의 비밀번호, 공백 닉네임 등에 대한 에러 핸들링 로직
- [x]  로그인 페이지로 이동

## 4-4. FindPassword : No-Layout (미완)

> 가입 시 입력한 이메일을 통해 비밀번호를 재설정 할 수 있는 페이지입니다.
> 


**[ 기능 ]**

- [x]  로그인 페이지로 이동
- [ ]  비밀번호 찾기 기능
- [ ]  이메일 유효성 검사 로직

## 4-5. Home : Layout

> 메인 페이지로, 유저 근처의 공중 화장실 리스트를 보고 검색할 수 있습니다.
> 

[]()

**[ 기능 ]**

- [x]  유저 현재 위치 조회(아이콘을 누르면 재탐색)
- [x]  지역 카테고리 별 검색 기능
- [x]  지도를 통해 유저 위치 및 근처 화장실 표시
- [x]  유저 근처 화장실을 거리 순으로 최대 10개 정렬하여 리스트로 보여줌
- [x]  근처 화장실 리스트의 `more`를 클릭하면 해당 화장실의 상세 페이지로 이동
- [x]  좌측 메뉴 바를 통해 즐겨찾기, 에티켓, 팁 페이지로 이동 가능

## 4-6. Detail : Layout

> 화장실에 대한 정보를 자세히 알아보고, 리뷰를 남기고 볼 수 있습니다.
> 

**[ 기능 ]**

- [x]  즐겨찾기 추가 기능
- [x]  화장실 명 및 위치 확인 기능
- [x]  화장실 평점 확인 가능
- [x]  화장실 리뷰 남기기 기능 (청결도, 위치, 인구밀도에 대한 별점 포함)
- [x]  리뷰 수정 및 삭제 기능
- [ ]  운영 시간 및 거리 확인

## 4-7. BookMark : Layout

> 로그인 시 이용할 수 있는 즐겨찾기 페이지로, 저장해 둔 화장실 목록을 볼 수 있습니다.
> 


**[ 기능 ]**

- [x]  로그인 하지 않고 접속 시, 로그인 페이지로 이동
- [x]  즐겨찾기 한 화장실 리스트(화장실 명 및 주소) 확인 가능
- [x]  즐겨찾기 해제 기능
- [x]  `자세히보기`를 눌러 화장실의 디테일 페이지로 이동

## 4-8.  Etiquette : Layout

> 화장실 사용에 대한 에티켓 정보를 담고 있는 페이지입니다.
> 


**[ 기능 ]**

- [x]  화장실 이용 에티켓 정보 확인

## 4-9. Tip : Layout

> 용변을 볼 때의 유용한 지식을 얻을 수 있는 페이지입니다.
> 


**[ 기능 ]**

- [x]  좌, 우 버튼 클릭 시 용변 팁을 슬라이드 형식으로 미리보기 가능
- [x]  팁 컨테이너 클릭 시 모달 창을 통해 팁 전체 내용 확인 가능


# 5. 협업 과정

## 5-0. 아이디어 구상 : 브레인 스토밍
<img width="378" alt="스크린샷 2024-03-25 오전 1 29 31" src="https://github.com/wheres-my-toilet/wheres-my-toilet/assets/69431340/9045bc30-d2d3-49c6-a06c-4438f99bbd65">



## 5-1. 프로젝트 설계 및 와이어프레임
<img width="756" alt="스크린샷 2024-06-29 오후 5 27 45" src="https://github.com/wheres-my-toilet/wheres-my-toilet/assets/69431340/4bfd1db6-90c1-48c2-ba2a-aab31be75e85">

## 5-2. Data Base 세팅
<img width="756" alt="스크린샷 2024-06-29 오후 5 28 15" src="https://github.com/wheres-my-toilet/wheres-my-toilet/assets/69431340/fa3999ac-1944-4f34-906d-98257ec0ea4f">

## 5-3. Git & Code Convention and Rule 지정

[Code Convention](https://www.notion.so/Code-Convention-b9c160b81dc941638121720b5346e37b?pvs=21) 

### **GROUND_RULE**

- code convention 지켜주세요!
- PR은 작은 기능 단위로 올려주세요.
- branch는 해당 페이지 브랜치에서 기능 단위로 따로 판 후, 머지 하고 나서는 삭제해주세요.
- Commit 을 생활화 합시다.
- 구현하면서 주기적으로 구현하고 있는 기능 보고 해주세요!
- 자세할수록 좋아요. 기획에서 크게 벗어나지는 않는지 점검합시다! (소통 오류 방지)
- 적극 소통해요 ! 애매한 게 있다, 도저히 모르겠다 싶으면 꼭 공유해주세요:)
- 상호 존중 예쁜 말을 씁시다!
- 우리는 할 수 있어요 ! 시간이 걸릴 뿐. 자신감을 가집시댱!!!

+가능하다면 코드 리뷰도 상세히 해봐요

## 5-4. GitHub의 적극적인 이용 : PR과 코드리뷰를 활발히 했어요!
<img width="576" alt="스크린샷 2024-06-29 오후 5 28 50" src="https://github.com/wheres-my-toilet/wheres-my-toilet/assets/69431340/975831dc-f029-40a9-ae89-fd9ea34c26e2">
<img width="576" alt="스크린샷 2024-06-29 오후 5 29 12" src="https://github.com/wheres-my-toilet/wheres-my-toilet/assets/69431340/38f34864-8a8c-4463-a0bd-7486f68070fd">
    
3. **GitHub 이슈 기능 활용**
   <img width="576" alt="스크린샷 2024-06-29 오후 5 29 32" src="https://github.com/wheres-my-toilet/wheres-my-toilet/assets/69431340/05e8df89-76bb-4db2-9a66-a7d6b89e800b">
    

# 6. 트러블 슈팅

## 6-1. 신기술 숙련도 Issue (Zustand)

[Zustand의 사용법](https://ui.toast.com/posts/ko_20210812) 

- 컨퍼런스를 찾아서 공유하고, 사전 공부 zustand를 이용한 구현 사항에 대한 코드리뷰 진행

## 6-2. **북마크 한 화장실의 리뷰 데이터 조회 작업 (강지수)**

**[문제 상황]**

  supabase로 한 번에 bookmark 테이블, toilet_location 테이블, review_info 테이블의 데이터를 조회할 방법이 없는 문제가 발생했다.1. 즐겨찾는 화장실 목록 데이터 : bookmark 테이블 + toilet_location 테이블2. 리뷰 목록 데이터 : review_info 테이블

**[해결 방법]**

  그래서 useQuery의 옵션인 enabled를 사용하여 1번 즐겨찾는 화장실 데이터를 조회한 후 그 데이터에서 toilet_id에 해당하는 2번 리뷰 목록 데이터를 조회하도록 하였습니다.enabled 옵션에 현재 쿼리가 실행될 조건을 넣었습니다. true가 되면 해당 쿼리를 실행하기 때문에 !!data 로 넣어 data(북마크 목록)가 있을 때 실행되도록 하였습니다.

[참고한 링크]

- https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries

## 6-3. Kakao Map API 호출 Issue (안단테)

카카오 지도 api  접근  에러
- .env 파일을 루트경로에 세팅해두지 않음

## 6-4. useRouter 사용 Issue (이참)

**[사건의 전말]**

Login page에서, 로그인 성공 시 홈 페이지로 이동하는 로직을 작성하려던 중 마주한 에러.<br/>
Form 작성하는 부분을 따로 컴포넌트로 분리하여 작성 중이었는데, useRouter는 page component에서만 사용 가능하다는 사실을 알게 되었다.<br/>

> 그렇다면 페이지가 아닌 컴포넌트 내부에서는 사용이 불가능하다는 말인가?
> 

열심히 머리를 쥐어짜다 튜터님께 질문을 갔다.<br/>
’따로 분리 한 컴포넌트 내에서 routing을 하려 하는데, page 컴포넌트가 아니면 불가능한 것 같아서 고민하다 이걸 어떻게 구현할 수 있는지 여쭙고자 왔어요!’ 

**[재미있는 사실]**

**useRouter는 import 방식이 2개라는 사실을 알고 계시나요?**
- https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook

## 6-5. 리뷰 추가 및 삭제 Issue (조성준)

[이슈사항](https://joon335.tistory.com/64)

## 6-6. 로그인 정보 저장 Issue (이참)

**[Login 정보, 어디에 저장해야 하나?]**
기존에 Zustand Store를 사용하여 유저의 로그인 정보를 넘겨주었었다. 그러나, 페이지가 바뀌고 리-렌더링 되는 과정에서 해당 데이터가 날라 가는 것이 확인되었다. <br/>
따라서 오늘은 Zustand Store에 넣어주었던 정보를, 브라우저를 종료하면 날아가는 세션 스토리지에 저장하려고 한다.<br/>
세션 스토리지 사용은 처음이라, 아래의 사이트들을 참고해 공부하였다.<br/>
- **Ref**
    - [A Complete Guide to Session Management in Next.js](https://clerk.com/blog/complete-guide-session-management-nextjs)
  
**[NEW KNOWLEDGE]**
Zustand에는 페이지 이동이 일어나더라도 값을 유지할 수 있게 도와주는 `persist middleware`가 존재한다는 사실을 알게 되었다.<br/>
따라서 수정한 코드는 그대로 두고, 다시 dev branch에서 새로운 branch(feature/login-zustand)를 만들어 해당 **middleware를 사용**해보았다.<br/>
- **Ref**
    - [[React] Zustand 사용하기](https://jforj.tistory.com/341)
    - [Zustand persist: 페이지 새로고침 시 전역상태 초기화 방지 (문제 해결)](https://velog.io/@dpldpl/Zustand-persist-페이지-새로고침-시-전역상태-초기화-방지-문제-해결)
**[궁금증]**
이렇게 하지 않아도, 로컬 스토리지에 저장이 되고 있는 것을 확인했다. 로컬 스토리지에는 저장되게 하고 싶지 않은데 이를 어디서 설정해야 할 지 잘 모르겠다. supabase auth인가?<br/>

## 6-7. 로그인 관련 에러 핸들링 로직 자체 코드 미제공 해결 중 에러 Issue (이참)
**[Email Rate Limit Exceeded]**
    - `handleSignup` code
        
        ```tsx
        const handleSignup = async (e: FormEvent) => {
            e.preventDefault();
            try {
              const { data, error } = await supabase.auth.signUp({
                email: userInfo.email,
                password: userInfo.password,
                options: {
                  data: {
                    nickname: userInfo.nickname,
                  },
                },
              });
              if (error) console.error(error);
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          };
        ```
        
- Analyze
    - [Supabase Email Limit Issue : Error에 대한 이해](https://www.restack.io/docs/supabase-knowledge-supabase-email-rate-limit-exceeded)
        
        **[Before]**
        
        - 위 자료에 따르면, 30번으로 제한이 되기에 발생하는 에러라고 이해할 수 있다.
        - 다만 본인은 **요청을 30번 이하로 보냈고**, 이를 근거로 보았을 때 해당 문제가 발생한 이유는 
        **무한 요청 logic이 존재**했기 때문이라고 추측했다.
        
        **[After]**
        
        - 실제 프로젝트를 확인해 본 결과 confirm email option이 해제되어 있지 않았고(저장을 누르지 않았음), 
        Rate limit for sending emails는 3회로 설정되어 있었다.         
        - 즉 **무한 요청 logic이 존재하지 않음**을 확신할 수 있었고, 
        **confirm email option 해제**를 저장하자 **정상적으로 회원가입이 진행**되었다.
