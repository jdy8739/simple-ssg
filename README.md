# SIMPLE SSG 🚀⚡
### 미완성 html, 마크다운을 완성된 html 문서로 빌드하는 간단한 SSG 시스템

이 프로젝트는 **프레임워크에서 제공하는 정적 빌드의 원리를 이해하고**,  
작은 규모로 직접 적용해 본 실험적인 프로젝트입니다.  
프레임워크 없이 직접 구현해 보며 빌드 프로세스를 경험하는 것이 목적입니다.  

---

## 🎯 **프로젝트 목표 (Goals)**  

✅ **HTML 문서의 빈 공간을 필요한 데이터로 채워 정적 빌드 수행**  
✅ **마크다운(.md) 파일을 HTML로 변환하는 정적 변환 시스템 구현**  
✅ **정적 사이트 생성(SSG)의 기초 원리 학습 및 적용**  

---

## 🏗 **주요 기능 (Features)**  

- **정적 HTML 빌드** 🏗  
  - 데이터 소스를 기반으로 HTML 파일을 완성하여 빌드  

- **마크다운 변환 시스템** ✍  
  - `.md` 파일을 HTML로 변환하여 정적인 페이지 생성  

---

## 🛠 **기술 스택 (Tech Stack)**  

- **[front-matter](https://hexo.io/docs/front-matter)** - 마크다운 파일의 **메타데이터(YAML Front Matter)**를 파싱하는 라이브러리  
- **[mustache](https://mustache.github.io/)** - HTML 템플릿 엔진으로, 변수 치환 및 템플릿 렌더링 기능 제공, 정적 HTML을 동적으로 생성  
- **[showdown](https://showdownjs.com/)** - Markdown → HTML 변환기  
- **[static-server](https://www.npmjs.com/package/static-server)** - 간단한 정적 파일 서버 제공  

---

## 🚀 **설치 및 실행 방법 (Installation & Setup)**  

이 프로젝트를 실행하려면 **Node.js 20 이상**이 필요합니다.  
아래 명령어를 실행하여 프로젝트를 로컬에서 실행할 수 있습니다.  

```sh
# 의존성 설치
yarn

# 프로젝트 빌드
yarn build

# 정적파일 서버 구동
yarn serve
```

---

## 💡 배운 점 & 기술적 인사이트 (Learnings & Insights)

🔹 마크다운을 HTML로 변환하고 정적 페이지를 생성하는 과정 이해  
🔹 Front Matter를 활용한 메타데이터 관리 및 템플릿 엔진(mustache) 적용 경험  
🔹 정적 빌드 원리를 직접 구현하며 프레임워크의 SSG 방식에 대한 개념 확립   

---

## 🔧 향후 개선점 (Improvements)

🚧 스타일 개선  
cdn을 통한 정적 css 파일 요청 및 적용  

🚧 배포 진행  
Vercel을 통한 배포  