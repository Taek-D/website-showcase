# AETHERIC — Studio Monograph

> A studio monograph, edited in Seoul. Selected works in brand systems, creative development, and kinetic narrative. **2020 — 2026.**

에디토리얼 무드의 단일 페이지 포트폴리오. React 18 + Vite 6 + Tailwind 4 + Framer Motion 으로 만든 다크 전용 키네틱 인터페이스입니다.

---

## ✨ Highlights

- **커스텀 커서 시스템** — `mix-blend-difference` 기반 원형 커서 + hover 시 72px 확장, 버튼/링크 위에서 색 반전
- **배경 글로우** — 900×900 라디얼 그라데이션이 ~0.1s spring lag 로 마우스를 쫓아감
- **섹션별 패럴럭스** — 각 섹션에 장식용 orb 를 느리게(0.3×), 헤딩을 약간 빠르게(1.25×) 이동시켜 공간감 연출
- **Kinetic word swap** — Hero 에서 5개 단어가 2.6초마다 전환
- **Scroll progress bar** — 상단 2px 프라이머리→세컨더리→터셔리 그라데이션
- **Editorial preloader** — ease-out-expo 로 %loaded 카운트 업
- **Live Seoul clock** — 실시간 GMT+9 표시
- **Cursor-follow preview** — Works index 호버 시 360px 프리뷰가 마우스 좌표를 따라감
- **Keyboard navigation** — `1` – `6` 숫자키로 각 챕터 점프 (input/textarea 제외)

## 🧩 Tech Stack

| 영역 | 선택 |
|---|---|
| Framework | React 18.3 |
| Build | Vite 6.4 |
| Styling | Tailwind CSS 4 (`@theme` 토큰 기반 OKLCH 팔레트) |
| Motion | Framer Motion 11 (`cubic-bezier(0.22, 1, 0.36, 1)`) |
| Typography | Instrument Serif · Manrope · Plus Jakarta Sans · JetBrains Mono · Material Symbols |
| Hosting | Vercel (Git 연동 자동 배포) |

## ♿ Accessibility

- **WCAG 2.2 AA** 대비 기준 준수 (모든 메타 텍스트 `on-surface-variant #adaaaa` / background `#0e0e0e`)
- `prefers-reduced-motion` 전역 대응 (애니/트랜지션 → 0.01ms)
- `prefers-reduced-transparency` 시 grain overlay 제거
- `.skip-link` 본문 건너뛰기 링크
- `focus-visible` 2px primary 링 · `aria-current="page"` · `aria-label` 한국어화
- 모바일 메뉴 토글 44×44px 터치 타겟

## 📱 Responsive

| 폭 | 레이아웃 |
|---|---|
| 0 – 639 (mobile) | 1열 그리드 · 햄버거 메뉴 · px-5 py-24 |
| 640 – 767 (sm) | 태블릿 타이트 · px-8 py-32 · 메타 텍스트 크기 조정 |
| 768 – 1023 (md) | 풀 네비 · 다단 그리드 · 커서/글로우 활성화 |
| 1024 – 1919 (lg) | Featured / Colophon 2단 분할 |
| 1920+ | `max-w-[1920px]` 컨테이너 캡 |

Hero 헤드라인은 `clamp(2.5rem, 9vw, 9rem)` 로 4K 에서도 안정.

## 🚀 Getting Started

```bash
# 설치
npm install

# 개발 서버 (Vite)
npm run dev
# → http://localhost:5173

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📁 Structure

```
src/
├── App.jsx                # Hero · Nav · ProjectIndex · FeaturedCase · Footer
├── main.jsx               # entry
├── index.css              # @theme 토큰 · 유틸 · 반응형 그리드
├── lib/
│   └── motion.js          # easing · variants · viewport 프리셋
├── components/
│   ├── CustomCursor.jsx   # 원형 커서 (spring)
│   ├── MouseGlow.jsx      # 배경 글로우 (~0.1s lag)
│   ├── ScrollProgress.jsx # 상단 진행 바
│   └── Preloader.jsx      # 부트 시퀀스
└── sections/
    ├── TrustBar.jsx       # Chapter 01 — Marquee + Studio Index
    ├── Process.jsx        # Chapter 03 — Approach 매니페스토
    ├── Testimonials.jsx   # Chapter 04 — Recognition (수상)
    ├── FAQ.jsx            # Chapter 05 — Colophon
    └── Contact.jsx        # Chapter 06 — Correspondence

MASTER.md                  # 디자인 시스템 진실원 (컬러·타이포·모션 토큰)
```

## 🎨 Design Tokens

모든 컬러/폰트/라디우스는 `src/index.css` 의 `@theme` 블록에 정의되어 있습니다. 상세 규칙은 [`MASTER.md`](./MASTER.md) 참고.

## 📜 License

© 2020 — 2026 AETHERIC. 개인 쇼케이스 용도의 편집물입니다.

---

🤖 이 프로젝트는 [Claude Code](https://claude.com/claude-code) 와의 협업으로 만들어졌습니다.
