# 탄소 관리 대시보드

## 프로젝트 설명
기업별 탄소 배출량을 시각화하고 감축 목표를 관리할 수 있는 대시보드 프로젝트입니다.


## 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/FC-DEV3-Final-Project/zoop-frontend.git
```
### 2. 패키지 설치
```
npm install
```
### 3. 로컬 서버 실행
```
npm run dev
```
### 4. 로컬 서버 실행 후 브라우저에서 http://localhost:3000 에 접속


## 개발환경
Framework: Next 15.5.4 + React 19.1.0 + TypeScript 5
Styling: Tailwind CSS
State Management: Zustand
Data Fetching: Fake Api
Library: Chart.js(차트), react-icons(아이콘)


## 프로젝트 컨벤션
### 브랜치 전략
**main**, **develop**, **feature** 브랜치 사용
* main : 배포 가능한 상태만을 관리하는 브랜치
* develop : 개발 단계에서 통합 역할을 담당하는 브랜치
* feature : 새롭게 추가되거나 변경되는 기능을 개발

 
### 커밋 컨벤션
* `feat` : 새로운 기능 추가
* `fix` : 버그 수정
* `docs` : 문서 수정
* `design` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
* `refactor` : 코드 리펙토링
* `chore` : 빌드 업무 수정, 패키지 매니저 수정


## 폴더구조
```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx: 한 페이지로 구성
├── components/
│   ├── CarbonReport.tsx: 탄소 리포트 컴포넌트
│   ├── CountryEmissions.tsx: 국가 별 배출량 컴포넌트(도넛 차트)
│   ├── CutEmissions.tsx: 감축률 컴포넌트(도넛 차트)
│   ├── DashboardHeader.tsx: 대시보드 헤더 컴포넌트(기준년도 선택)
│   ├── Header.tsx: 헤더 컴포넌트
│   ├── MonthlyEmissions.tsx: 월 별 배출량 컴포넌트(라인 차트)
│   ├── Sidebar.tsx: 사이드바 컴포넌트
│   ├── TotalEmissions.tsx: 전체 배출량 현황 컴포넌트
│   └── YearlyEmission.tsx: 감축 목표 컴포넌트(라인 차트)
├── lib/
│   ├── api.ts: Fake API
│   └── seed.ts: Database
├── store/
│   └── store.ts: SidebarStore(사이드 바), BaseYearsStore(기준년도), CompanyStore(대시보드 핵심 데이터), PostsStore(탄소 리포트 데이터)
└── types/
    └── index.ts: 전역 상태로 사용되는 데이터 타입 지정
```
