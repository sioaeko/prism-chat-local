# 🌈 Prism Chat

<div align="center">
  
  <a href="https://github.com/sioaeko/prism-chat">
    <img src="https://github.com/user-attachments/assets/eb45568e-6d67-4555-aecc-efc5c24d4f31" alt="Prism Chat 메인" width="100%" />
  </a>

  <p align="center">
    <a href="https://reactjs.org">
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://vitejs.dev">
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="MIT License" />
    </a>
  </p>

  <h2>🤖 Deepseek R1 기반의 강력한 AI 채팅 플랫폼</h2>

  <p align="center">
    <b>
      <a href="#-기능">기능</a> •
      <a href="#-시작하기">시작하기</a> •
      <a href="#-설치-방법">설치 방법</a> •
      <a href="#-사용-방법">사용 방법</a> •
      <a href="#-기술-스택">기술 스택</a>
    </b>
  </p>

  <p align="center">
    <a href="README.md">English</a> | <a href="README.ko.md">한국어</a>
  </p>

  <br />
</div>

## ✨ 기능

<div align="center">
  <img src="https://github.com/user-attachments/assets/c77cc78c-93b9-4a4a-ac50-28233f91364e" alt="모델 선택" width="100%" />
</div>

<br />

### 🎯 주요 기능

- 🤖 **다양한 모델 크기**
  | 모델 | 설명 | 추천 용도 |
  |------|------|-----------|
  | 1.5B | 초경량 모델 | 기본적인 작업, 빠른 응답 |
  | 7B | 효율적인 모델 | 일상적인 사용, 일반적인 질문 |
  | 8B | 개선된 경량 모델 | 향상된 이해력 |
  | 14B | 균형잡힌 모델 | 다양한 작업, 좋은 성능 |
  | 32B | 대형 모델 | 복잡한 추론, 상세한 응답 |
  | 70B | 고급 모델 | 전문적인 작업, 심층 분석 |
  | 671B | 최상위 모델 | 최고 성능, 전문가 수준 작업 |

- 🔄 **자동 모델 전환**
  - 설치된 Ollama 모델 간 자연스러운 전환
  - 실시간 모델 감지 및 통합
  - 채팅별 모델 설정 유지

- 🌟 **향상된 기능**
  - 🌍 다국어 지원 (한국어/영어)
  - 💬 고급 채팅 관리
  - 🎨 테마 커스터마이징
  - 📱 반응형 디자인
  - ⌨️ 스마트 입력 처리
  - 🔤 유연한 글자 크기 조절

## 🚀 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- [Ollama](https://ollama.ai) 설치 및 Deepseek R1 모델

### 설치 방법

1️⃣ 리포지토리 클론
```bash
git clone https://github.com/sioaeko/prism-chat.git
cd prism-chat
```

2️⃣ 의존성 설치
```bash
npm install
```

3️⃣ Ollama 실행 및 모델 다운로드
```bash
# 기본 모델 (14B)
ollama run deepseek-r1:14b

# 추가 모델
ollama run deepseek-r1:1.5b  # 초경량
ollama run deepseek-r1:7b    # 효율적
ollama run deepseek-r1:8b    # 개선된 경량
ollama run deepseek-r1:32b   # 대형
ollama run deepseek-r1:70b   # 고급
ollama run deepseek-r1:671b  # 최상위
```

4️⃣ 개발 서버 실행
```bash
npm run dev
```

## 💻 사용 방법

### 채팅 시작하기

<div align="center">
  <img src="https://github.com/user-attachments/assets/114ca64e-f180-426e-b700-46ac5480547c" alt="채팅 인터페이스" width="100%" />
</div>

1. "새로운 채팅" 버튼 클릭
2. 원하는 모델 선택
3. 메시지 입력
4. Enter 키 또는 전송 버튼으로 전송

### 모델 선택

<div align="center">
  <img src="https://github.com/user-attachments/assets/8e8e8bbf-ef25-4b9d-86b8-57bf8e73043d" alt="설정" width="100%" />
</div>

지능형 모델 선택기 기능:
- 🔍 설치된 모델 자동 감지
- 🔄 즉시 모델 전환
- 💾 채팅별 모델 기억
- 🎯 스마트 기본값 선택

### 설정 및 커스터마이징

다양한 개인화 옵션:
- 🎨 **테마 옵션**
  - 밝은 환경을 위한 라이트 모드
  - 어두운 환경을 위한 다크 모드
  - 시스템 기반 자동 전환
- 📏 **글자 크기**
  - 작게: 간단한 보기
  - 중간: 최적의 가독성
  - 크게: 향상된 가시성
- 🌐 **언어 선택**
  - 한국어 인터페이스
  - 영어 인터페이스
- ⚡ **빠른 동작**
  - Enter 키 설정
  - 단축키 커스터마이징

## 🛠 기술 스택

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" width="48" height="48" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="TypeScript" width="48" height="48" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/wind.svg" alt="Tailwind" width="48" height="48" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" alt="Vite" width="48" height="48" />
        <br>Vite
      </td>
    </tr>
  </table>
</div>

## 💬 채팅 예시

<div align="center">
  <img src="https://github.com/user-attachments/assets/a7bc8ef8-a25f-4931-a88c-795dfa7dc832" alt="채팅 예시" width="100%" />
</div>

## 📝 라이선스

이 프로젝트는 [MIT](LICENSE) 라이선스를 따릅니다.

## 🤝 기여하기

여러분의 기여를 환영합니다! 참여 방법:

1. 🍴 프로젝트 포크
2. 🌿 기능 브랜치 생성
   ```bash
   git checkout -b feature/멋진기능
   ```
3. 💾 변경사항 커밋
   ```bash
   git commit -m '멋진 기능 추가'
   ```
4. 📤 브랜치에 푸시
   ```bash
   git push origin feature/멋진기능
   ```
5. 🔍 Pull Request 열기

## 📧 연락처

<div align="center">
  
  **프로젝트 링크:** [https://github.com/sioaeko/prism-chat](https://github.com/sioaeko/prism-chat)
  
  <br />
  
  <sub>sioaeko가 ❤️로 만들었습니다</sub>
</div>
