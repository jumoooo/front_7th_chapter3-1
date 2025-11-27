# 🚀 GitHub Pages 배포 설정 가이드

> 📅 **작성 일자**: 2025년  
> 🎯 **목적**: GitHub Pages에 after 패키지가 정상적으로 배포되도록 설정

---

## 🔍 문제 상황

현재 `https://jumoooo.github.io/front_7th_chapter3-1/`에 접속하면 README.md가 표시되고, after 웹페이지가 표시되지 않는 문제가 발생했습니다.

---

## 📋 원인 분석

### 가능한 원인들

1. **GitHub Pages 설정이 잘못됨**
   - Source가 `gh-pages` 브랜치로 설정되지 않음
   - 또는 GitHub Actions가 아닌 다른 소스로 설정됨

2. **배포 워크플로우가 실행되지 않음**
   - Actions 탭에서 워크플로우가 실패했거나 실행되지 않음

3. **gh-pages 브랜치에 빌드된 파일이 없음**
   - 빌드가 실패했거나 배포가 완료되지 않음

4. **base 경로 설정 문제**
   - vite.config.ts의 base 경로가 잘못 설정됨

---

## ✅ 해결 방법

### 1단계: GitHub 저장소 Settings 확인 및 설정

1. **GitHub 저장소로 이동**
   - `https://github.com/jumoooo/front_7th_chapter3-1`

2. **Settings → Pages 메뉴로 이동**

3. **Source 설정 확인**
   - **옵션 1: Deploy from a branch (권장)**
     - Source: `Deploy from a branch` 선택
     - Branch: `gh-pages` 선택
     - Folder: `/ (root)` 선택
     - **Save** 클릭
   
   - **옵션 2: GitHub Actions (최신 방식)**
     - Source: `GitHub Actions` 선택
     - 이 경우 워크플로우가 자동으로 배포를 처리합니다

### 2단계: Actions 탭에서 배포 상태 확인

1. **Actions 탭으로 이동**
   - `https://github.com/jumoooo/front_7th_chapter3-1/actions`

2. **"Deploy to GitHub Pages" 워크플로우 확인**
   - 최근 실행 내역 확인
   - 성공(초록색 체크)인지 실패(빨간색 X)인지 확인

3. **실패한 경우**
   - 워크플로우를 클릭하여 에러 로그 확인
   - 에러 내용에 따라 수정

### 3단계: gh-pages 브랜치 확인

1. **브랜치 목록 확인**
   - 저장소의 브랜치 목록에서 `gh-pages` 브랜치가 있는지 확인
   - `https://github.com/jumoooo/front_7th_chapter3-1/branches`

2. **gh-pages 브랜치 내용 확인**
   - `https://github.com/jumoooo/front_7th_chapter3-1/tree/gh-pages`
   - `index.html` 파일이 있는지 확인
   - `assets` 폴더가 있는지 확인

3. **파일이 없는 경우**
   - 배포 워크플로우를 수동으로 실행하거나
   - main 브랜치에 push하여 자동 배포 트리거

### 4단계: 수동으로 배포 워크플로우 실행 (필요한 경우)

1. **Actions 탭으로 이동**
2. **"Deploy to GitHub Pages" 워크플로우 선택**
3. **"Run workflow" 버튼 클릭**
4. **Branch: `main` 선택**
5. **"Run workflow" 클릭**

---

## 🔧 현재 설정 확인

### 배포 워크플로우 설정

**파일**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Build after package
        run: pnpm build:after
        env:
          NODE_ENV: production

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/after/dist
```

### Vite 설정

**파일**: `packages/after/vite.config.ts`

```typescript
// GitHub Pages 배포를 위한 base 경로 설정
// 저장소 이름이 URL에 포함되므로 저장소 이름을 base 경로로 설정
const base: string =
  process.env.NODE_ENV === "production" ? "/front_7th_chapter3-1/" : "";
```

---

## 📝 체크리스트

배포가 정상적으로 작동하려면 다음을 확인하세요:

- [ ] GitHub Settings → Pages에서 Source가 `gh-pages` 브랜치 또는 `GitHub Actions`로 설정됨
- [ ] Actions 탭에서 "Deploy to GitHub Pages" 워크플로우가 성공적으로 실행됨
- [ ] gh-pages 브랜치에 `index.html` 파일이 존재함
- [ ] gh-pages 브랜치에 `assets` 폴더가 존재함
- [ ] `vite.config.ts`의 base 경로가 `/front_7th_chapter3-1/`로 설정됨
- [ ] 배포 워크플로우의 `publish_dir`이 `./packages/after/dist`로 설정됨

---

## 🚨 문제 해결

### 문제 1: README.md가 표시됨

**원인**: GitHub Pages가 gh-pages 브랜치를 읽지 못하고 main 브랜치를 읽고 있음

**해결**:
1. Settings → Pages에서 Source를 `gh-pages` 브랜치로 변경
2. 또는 GitHub Actions로 변경

### 문제 2: 404 에러 발생

**원인**: base 경로가 잘못 설정됨

**해결**:
1. `vite.config.ts`의 base 경로 확인
2. 저장소 이름과 일치하는지 확인 (`/front_7th_chapter3-1/`)

### 문제 3: 빌드된 파일이 없음

**원인**: 배포 워크플로우가 실행되지 않았거나 실패함

**해결**:
1. Actions 탭에서 워크플로우 실행 상태 확인
2. 에러 로그 확인 및 수정
3. 수동으로 워크플로우 실행

### 문제 4: 권한 에러 (403)

**원인**: GitHub Actions 권한 부족

**해결**:
1. Settings → Actions → General
2. "Workflow permissions"에서 "Read and write permissions" 선택
3. 또는 워크플로우에 `permissions` 추가 (이미 추가됨)

---

## 🎯 예상 결과

설정이 완료되면:

1. **배포 URL**: `https://jumoooo.github.io/front_7th_chapter3-1/`
2. **표시 내용**: after 패키지의 ManagementPage가 표시됨
3. **배포 시간**: main 브랜치에 push 후 약 1-2분 소요

---

## 📚 참고 자료

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [Vite 공식 문서 - 정적 사이트 배포](https://vitejs.dev/guide/static-deploy.html)

---

> ✅ **다음 액션**: GitHub Settings → Pages에서 Source 설정 확인 및 변경

