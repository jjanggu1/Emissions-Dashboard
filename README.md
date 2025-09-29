# 탄소 관리 대시보드

## 프로젝트 설명
기업별 탄소 배출량을 시각화하고 감축 목표를 관리할 수 있는 대시보드 프로젝트입니다.


## 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/jjanggu1/Emissions-Dashboard.git
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
Framework: Next 15.5.4 + React 19.1.0 + TypeScript 5<br>
Styling: Tailwind CSS<br>
State Management: Zustand<br>
Data Fetching: Fake Api<br>
Library: Chart.js(차트), react-icons(아이콘)<br>


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
│   └── page.tsx: 단일 페이지로 구성, API 호출 및 Store 저장 컴포넌트
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

## 아키텍처 개요
* 상태 관리: Zustand (전역 상태 저장, 기준년도, 기업, 탄소 리포트 등 주요 데이터 저장)
* 폴더 구조 설계: 단일 페이지 대시보드 이므로 page.tsx에 주요 화면을 구성하고 세부 UI는 components 폴더에 분리
* 데이터 흐름
  1. API → Zustand Store → React 컴포넌트
  2. 기준년도 Select / Company Data 변경 되었을 시 -> Store 업데이트 -> UI 리렌더링

## 디자인 의사결정
* 레이아웃: 반응형(Flexbox), 모바일 -> 데스크탑 순서.
* 컬러 시스템: Tailwind 색상 토큰 기반, 주요 포인트 컬러는 차트에서 각 데이터를 구분하기 좋고 보기 편안한 색상으로 결정
* 차트: Chart.js를 사용, 스택 바 차트, 라인 차트, 도넛 차트로 비율과 감축량 추이를 직관적으로 표현
* 탄소 리포트: 차트 데이터 오른쪽 영역에 기업의 보고서를 배치하여 차트와 탄소 리포트를 한눈에 볼 수 있도록 배치
