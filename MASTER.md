# MASTER.md — AETHERIC Design System

> IMPROVE 모드. 기존 `src/index.css` @theme 토큰을 정본으로 계승한다.
> 본 문서는 감사/개선 시 참조하는 진실의 원천이다. 값을 발명하지 않고 이 문서의 값만 적용한다.

---

## 1. 프로덕트 컨텍스트

- **Product:** AETHERIC — Studio Monograph / Portfolio Archive (2020—2026)
- **Type:** portfolio / editorial single-page
- **Industry:** creative design studio · kinetic narrative · brand systems
- **Tone:** archival · quiet confidence · "남는 것을 만든다"
- **Copy voice:** 한국어(본문) + 영어(메타/키네틱/어워드) 이중 구성, editorial short-form

## 2. Style Keywords (확정)

`editorial` · `dark` · `minimalist-luxury` · `kinetic` · `archival` · `monograph`

→ 화려한 그라디언트·3D illustration 금지. 타이포 · 여백 · 그레인 · 분절된 규칙선(rule) 중심.

## 3. Color Tokens (출처: `src/index.css` @theme — 변경 금지)

### Brand
- `--color-primary: #df8eff` / `primary-fixed #d878ff` / `primary-dim #bb00fc`
- `--color-secondary: #00eefc` / `secondary-dim #00deec`
- `--color-tertiary: #a2ffbf` / `tertiary-dim #00ed89`
- `--color-error: #ff6e84`

### Surface (Dark-only)
- `background #0e0e0e` · `surface-container-lowest #000000` · `low #131313`
- `container #1a1919` · `high #201f1f` · `highest #262626`
- `on-surface #ffffff` · `on-surface-variant #adaaaa`
- `outline #777575` · `outline-variant #494847` · `muted #a0a0a0`

### 사용 규칙
- 새로운 hex 추가 금지. 투명도가 필요하면 `color-mix(in oklab, <token> X%, transparent)` 또는 Tailwind `/NN` opacity.
- 현재 코드 내 반복되는 `white/5 /10 /15 /20 /30` 는 유지. 새 값은 5 step으로만 (5, 10, 15, 20, 30, 60).

## 4. Typography (출처: `src/index.css` @theme)

| 역할 | 폰트 | 사용처 |
|---|---|---|
| `font-display` | Instrument Serif (italic) | hero accent · chapter title · large quotes |
| `font-headline` | Manrope 200/400/500/700/800 | section heading · 대형 블랙 타이틀 |
| `font-body` | Plus Jakarta Sans | 본문 텍스트 |
| `font-label` | Plus Jakarta Sans | — (body와 동일. 추후 통합 고려) |
| `font-mono` | JetBrains Mono | meta · chapter index · timestamp · kbd |

### Type scale (현행 관례)
- Hero: `clamp(3rem, 10vw, 10.5rem)` · leading 0.9 · tracking -0.045em
- Section heading: `text-5xl md:text-7xl font-black` · tracking -0.03em
- Display italic: `clamp(2.5rem, 7vw, 6.5rem)` · leading 1.02
- Mono label: `text-[11px] uppercase tracking-[0.3em]`
- Body: `text-base md:text-lg` · `text-on-surface-variant` · leading-relaxed

### 위계 규칙
- 같은 섹션 내 headline + display 혼용은 최대 2단계(예: `font-headline` 메인 + `font-display` accent).
- 본문 단락에 `font-display italic` 금지 (가독성).

## 5. Spacing & Radius

- Section padding: `py-32 md:py-44` (standard) / `py-24 md:py-32` (featured) / `py-48` (contact climax)
- Container: `max-w-7xl mx-auto` / featured only `max-w-[1480px]`
- Horizontal: `px-6 md:px-12`
- Radius: pill(9999) · sm .75rem · md 1.25rem · lg 2rem · xl 2.5rem · 2xl 3rem
  - Current editorial usage: nav/badge pill · image `rounded-sm` · mobile menu `rounded-3xl`

## 6. Motion Language

- Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` (smoothEase)
- Preloader easing: `cubic-bezier(0.76, 0, 0.24, 1)` (cinematic)
- Spring defaults: damping 22–32, stiffness 220–420
- Durations: fade 0.6–1.2s · spring layout (nav active pill)
- Parallax: scroll-linked, y offsets ≤ ±60px, scale 1.0–1.08
- Reduced motion: transition/animation → 0.01ms globally; kinetic word freezes; preloader skips

## 7. Layout Rhythm

- Chapter marker (mono meta) → heading (display+headline) → content → 규칙선 divider
- 모든 섹션은 `Chapter NN — TITLE` 으로 넘버링 (01 Archive · 02 Works · 03 Approach · 04 Recognition · 05 Colophon · 06 Correspondence)
- Divider: `border border-white/10` 또는 `color-mix(in oklab, white 8%, transparent)`
- Grid: bento-grid 정의 존재하나 **현재 미사용** → 제거 또는 향후 용도 예약

## 8. Anti-patterns (본 프로젝트 기준)

- Inter 폰트 사용 금지 (Manrope 유지)
- 순수 `#000` 본문 배경 금지 (`#0e0e0e` 유지). `surface-container-lowest #000000` 은 포인트만
- 라운드 14px~22px 범용 카드 금지. editorial이므로 `rounded-sm` 또는 `rounded-full` 극단 대비
- 하드 드롭 섀도우(`0 2px 8px`)는 editorial 무드 파괴. 이미 존재하는 `0_8px_32px` / `0_12px_40px` / `0_30px_80px` 3개 형태로 통일
- 과도한 이모지 / AI-stock illustration 금지

## 9. Accessibility Floor

- WCAG 2.2 AA
- `prefers-reduced-motion` 준수 (이미 전역 적용)
- `prefers-reduced-transparency` 시 grain-overlay 제거 (적용됨)
- Focus ring: `outline 2px var(--color-primary)` offset 4px
- Skip link `.skip-link` 유지
- Keyboard shortcuts 1–6 은 input/textarea/contentEditable 내에서 비활성

## 10. 변경 허용 범위 (IMPROVE 모드 가드레일)

- **Allow:** 접근성 수정, 누락된 focus/hover state, dead code 제거, aria-* 수정, 대비 개선, 하드코딩 컬러 → 토큰화, 모션 퍼포먼스 최적화
- **Forbid:** 컬러 팔레트 변경, 폰트 교체, 섹션 재배열, 카피 문구 임의 수정, 다크→라이트 전환, editorial 톤을 corporate로 변경
