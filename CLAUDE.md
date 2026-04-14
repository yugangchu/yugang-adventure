# 유강이의 모험 (Yugang Adventure)

HTML Canvas 기반 플랫포머 게임. 단일 `index.html` 파일(15MB+)에 모든 코드/리소스 포함.

## 프로젝트 구조
- `index.html` — PC 버전 게임 전체 (HTML/CSS/JS + base64 이미지/BGM/SFX)
- `mobile/index.html` — 모바일 버전 (터치 조작, 모바일 난이도, PWA)
- `mobile/manifest.json` — PWA 매니페스트
- `mobile/sw.js` — 서비스워커 (오프라인 캐시, 캐시명에 버전 포함)
- `mobile/icon-192.png`, `icon-512.png` — PWA 아이콘
- `star.png`, `mobile/star.png` — 별점 아이콘 (PC/모바일 공통 에셋)
- `thumb.png` — 썸네일
- `opening_cutscene.html` — 참고용 (미사용)

## 게임 구조
- **게임 상태(gs)**: intro → title → opening → worldmap → stagein → playing → clear → gameover/ending → allclear
- **스테이지**: 10개 (World 1: 1-1~1-5, World 2: 2-1~2-5)
- **난이도**: Easy(7목숨), Normal(5목숨), Hard(3목숨)
- **스프라이트**: base64 인코딩, `SPRITE_COORDS` 객체로 좌표 관리
- **BGM**: 상태 기반 자동 전환 (`bgmGetDesired()` → `bgmSwitch()`)
- **SFX**: Web Audio API 합성 (`sfxTone()`, `sfxJump()`, `sfxHit()` 등)

## 주요 함수 위치 (참고용, 줄 번호는 변동 가능)
- `drawTitle()` — 타이틀 화면
- `drawOpening()` / `drawEnding()` — 컷씬
- `drawPaused()` — 일시정지 메뉴
- `drawGuide()` / `drawSettings()` — 가이드/설정 오버레이
- `update()` / `draw()` — 메인 게임 루프
- `handleClick()` — 클릭 이벤트 처리
- `saveGame()` / `loadGame()` / `hasSave()` — 세이브 시스템
- `opChromakey()` — 스프라이트 배경 제거 (2-pass: 배경 제거 + 눈동자 복원)

## 버전 규칙
### PC 버전 (`index.html`)
- `X.Y` 형식. Y는 9 다음 10, 11... (예: 7.9 → 7.10 → 7.11)
- X(앞자리)는 대규모 패치에서만 올림
- 매 커밋마다 Y를 1씩 올림
- 인트로 화면 + 타이틀 화면 우하단에 버전 표시

### 모바일 버전 (`mobile/index.html`)
- `X.Y` 형식, PC와 독립 버전 체계 (v1.0부터 시작)
- **매 업데이트(커밋)마다 반드시 Y를 1씩 올림** (말 안 해도 자동으로)
- 인트로 화면 + 타이틀 화면 우하단에 버전 표시
- `mobile/sw.js`의 `CACHE_NAME`도 같은 버전으로 동기화 (예: `yugang-mobile-v1.3`)

## 패치 기록 — PC (`index.html`)

### v7.x — UI 개선 + 모바일 기능 포팅
| 버전 | 내용 |
|---|---|
| v7.8 | **Phase 2: 별점 시스템** — calcStars + stageStars 난이도별 저장, 월드맵 별 표시, 클리어 화면 Candies 표기, star.png 에셋 |
| v7.7 | **Phase 1: 밸런스 패치 (모바일 v2.4 기반)** — W1 버프, 1-1 바운싱 제거, W1 초반 발판 간격 상향(si<5만), 컨베이어 속도 스케일링 + 2-1/2-2 적응 구간. **W2 너프는 PC 미적용** |
| v7.6 | 버튼 스타일 모바일과 분리 + CLAUDE.md 규칙 추가 |
| v7.5 | 타이틀/인트로 리디자인 + 픽셀아트 버튼 |
| v7.4 | Noto Sans KR 폰트 적용 (모바일과 통일) |
| v7.3 | 이어하기/처음부터 버튼 EASY~HARD와 정렬, HUD 레이아웃 고정 |
| v7.2 | 이어하기/처음부터 클릭 시 노란색 플래시 효과 |
| v7.1 | 타이틀에서 HUD 표시 (스테이지란 → "Main Menu"), 하트 난이도 반영 |
| v7.0 | 타이틀 버튼 레이아웃 난이도 버튼과 정렬, 일시정지 간격 확대 |

### v6.x — 세이브 시스템 + 스프라이트 보정
| 버전 | 내용 |
|---|---|
| v6.9 | 인트로/타이틀/오프닝에서 하단 HUD 숨김 |
| v6.8 | 처음부터 버튼 연두색, 일시정지 Title → Main Menu |
| v6.7 | 게임 중 타이틀 복귀 시 세이브 저장 |
| v6.6 | 게임오버/올클리어 시 진행 삭제(설정 유지), 일시정지 간격 확대 |
| v6.5 | 일시정지 이모지 제거 + 영문 (PAUSED/Resume/Restart Stage/Main Menu) |
| v6.4 | **세이브 시스템** (localStorage) + **일시정지 메뉴** (ESC) 추가 |
| v6.3 | 포옹 스프라이트 클리핑으로 공주 발 잔여물 제거 |
| v6.2 | DOG_HAPPY 윗부분 크롭 |
| v6.1 | 엔딩 마지막 포옹 정지 컷신 5초 추가 (총 21초) |
| v6.0 | DOG_HAPPY 스프라이트 윗부분 공주 발 잔여물 제거 |

### v5.x — 엔딩 애니메이션
| 버전 | 내용 |
|---|---|
| v5.9 | chromakey 스마트 보정 (2-pass: 배경 제거 + 눈동자 복원) |
| v5.8 | chromakey threshold 조정 |
| v5.7 | DOG_HAPPY 스프라이트 윗행 잔여물 수정 |
| v5.6 | 공주 HAPPY 스프라이트 책 잔여물 수정 |
| v5.5 | HUG 스프라이트 chromakey 건너뛰기 (눈 투명 버그 수정) |
| v5.4 | 엔딩 BGM + 보스 처치 SFX (3연타 폭발 + 승리 차임), 별빛 제거 |
| v5.3 | **나노바나나 고퀄리티 포옹 스프라이트 시트** 교체 (36프레임) |
| v5.2 | 공식 움직임좌표 기반 스프라이트 정밀 수정, 엔딩 16초로 연장 |
| v5.1 | **엔딩 애니메이션** 추가 (4씬: 대면→전투→재회→포옹) |
| v5.0 | GUIDE/⚙ 버튼 위치 조정, 톱니바퀴 24px, 인트로에 버전 표기 |

### v4.x 이전 — 기본 기능
- 가이드 오버레이, 설정 메뉴, 키보드 스크롤
- 가이드/설정 버튼 글로우 스타일
- drawGuide 괄호 버그 수정

## 패치 기록 — 모바일 (`mobile/index.html`)

### v3.x — PWA 자동 업데이트
| 버전 | 내용 |
|---|---|
| v3.1 | HTTP 캐시 우회 수정 — install에서 `cache:'reload'`, fetch에서 `cache:'no-cache'` (GH Pages max-age=600으로 구 index.html 캐싱되던 문제 해결) |
| v3.0 | 자동 업데이트 테스트용 버전 bump (코드 변경 없음) |

### v2.x — 밸런스 + 자동 업데이트
| 버전 | 내용 |
|---|---|
| v2.5 | **PWA 자동 업데이트** (stale-while-revalidate). `updateViaCache:'none'`, `visibilitychange → reg.update()`, fetch 핸들러 SWR 전략 |
| v2.4 | **별점 로직 복원** (lost 기반, ≤-2 ★★★ / ≤1 ★★), **1-1 바운싱 제거** (bouncing[0]=0 + DIFF_BONUS W1 bouncing 삭제) |
| v2.3 | 별점 개편 시도 (deaths 기반) — v2.4에서 롤백 |
| v2.2 | **W1 버프 / W2 너프 / 컨베이어 속도 스케일링**. gap si<3 상향, conveyor 2-1=0.65/2-2=0.80/2-3~2-5 스케일 |
| v2.1 | 발판 간격 PC와 동일하게 복구 |
| v2.0 | 점프 상향 + 2단 점프 가이드 |

### v1.x — 모바일 최초 런칭 → UI 다듬기 (2026-04-14 새벽)
| 버전 | 내용 |
|---|---|
| v1.12 | 2단 점프(MAX_JUMPS=2) + 공유 카드 리디자인 |
| v1.11 | 클리어 결과 카드 공유 기능 (Web Share API) |
| v1.10 | PC와 버튼 스타일 분리 |
| v1.9 | 난이도/플레이 버튼 스타일 복구 |
| v1.8 | 타이틀/인트로 리디자인 (픽셀아트 배경 + 버튼 PNG) |
| v1.7 | 별 PNG 아이콘, 월드맵 전체 별 표시, 설정 정렬 |
| v1.6 | 별점 시스템 (난이도별 저장, 월드맵 별, 둥근 별 UI), 볼륨바 제거 |
| v1.5 | 별점/클리어/게임오버/설정 글래스 UI, 해상도 부스트 |
| v1.4 | 시간 300s, 게임오버 정렬, 앱 이름, 해상도 개선 |
| v1.3 | 튜토리얼/조이스틱/HUD 개선 |
| v1.2 | pause 메뉴 재설계, 버튼 글래스 디자인, HUD pill, BGM/SFX 버그 수정 |
| v1.1 | HUD 리디자인 + Noto Sans KR Bold 폰트 + 아이콘 교체 |
| v1.0 | 모바일 버전 최초 추가, PC→모바일 자동 리다이렉트 |

## 스프라이트 시트
- **공주** (`OP_PRINCESS_B64`, 684x365): WALK, IDLE, CRY, HAPPY 좌표 매핑됨
- **악당** (`OP_VILLAIN_B64`, 684x365): IDLE, FLOAT, KIDNAP, DEFEAT
- **유강이** (`OP_DOG_B64`, 375x666): WALK, HAPPY
- **포옹** (`OP_HUG_B64`, 375x666): 전용 시트, APPROACH(12프레임) + HOLD(21프레임)
- 움직임좌표 파일: `~/Desktop/yugang adventure/` 에 공주/악당/유강이 좌표 txt

## 세이브 시스템
- `localStorage` 키: PC `yugang_save` / 모바일 `yugang_save_m`
- 저장 데이터: currentStage, currentDiff, sharedLives, totalScore, acornCount, bgmOn, sfxOn, masterVol, **stageStars**
- `stageStars` 구조: `{easy:[10칸], normal:[10칸], hard:[10칸]}` — 난이도별 스테이지별 최고 별점
- 구 포맷 호환: `Array.isArray(stageStars)`면 Normal 데이터로 마이그레이션
- 저장 시점: 스테이지 클리어, 설정 변경, 게임 중 타이틀 복귀
- 게임오버/올클리어 시 진행 데이터 삭제 (설정/별점만 유지)

## 코드 구조 & 주요 위치 (PC/모바일 대부분 공통, 새 대화 시 참고용)

**중요**: 줄 번호는 수시로 바뀌므로 `grep`/`Grep`으로 **심볼명 검색**이 빠름. 아래는 심볼명 가이드.

### 핵심 상수 (파일 상단 200~500줄 부근)
- `JFORCE, GRAV_UP, GRAV_DOWN, CUT_VY` — 점프 물리 (모바일엔 `MAX_JUMPS=2` 추가)
- `MAP_W=4060, BASE_TIME=300` — 맵 길이, 제한시간
- `CANDY_LIFE_EVERY=5, CANDY_INVULN_EVERY=10, INVULN_DURATION=300` — 사탕 효과
- `DIFFS` — 난이도별 {label, color, spd, enemySpd, lives, desc}
- `STAGE_THEMES` — 10개 스테이지 배경 테마 (skyTop/skyBot/stars/lava 등)
- `SP_COUNT[10]` — 스테이지별 {mov, fal, sha} 특수 발판 개수
- `DENSITY` — 적/장애물 종류별 10스테이지 개수 배열
- `DIFF_BONUS = {easy:{w1,w2}, normal:..., hard:...}` — 난이도별 DENSITY 보정치

### 스테이지 생성 — `function makeStage(si)`
- gap 공식: `gapMax = floor(d.spd*airF*(gapK-si*0.03)), gapMin = gapBase+si*2`
  - PC v7.7+, 모바일 v2.2+: W1만 `gapK=0.75, gapBase=20`, W2는 0.60/10
- 발판 자동 생성 → usable 필터링 → mov/fal/sha로 교체 → 장애물/적 배치 → 사탕 분배
- 컨베이어 속도 (PC v7.7+, 모바일 v2.2+): `convBase = si===5?0.65 : si===6?0.80 : 0.95+(si-7)*0.10`; `spd = convBase+rand()*0.4`

### 게임 루프
- `update()` / `draw()` — 메인 루프
- `initStage(si)` — 스테이지 초기화. `stageLivesStart=sharedLives; stageAcornStart=acornCount;` 스냅샷 여기서
- `respawnEnemies()` — 사망 후 적 재배치
- `takeDmg()` / `takeFallDmg()` — 피격/추락 데미지

### UI/화면
- `drawIntro()` — 인트로 화면 (버전 표시 1)
- `drawTitle()` — 타이틀 화면 (버전 표시 2)
- `drawOpening()` / `drawEnding()` — 컷씬
- `drawWorldmap()` 또는 `startWorldMap(from,to)` + 내부 forEach — 월드맵 (별점 PNG 표시)
- `drawClear()` — 스테이지 클리어 화면 (별점 + Candies 표기)
- `drawGameover()` / `drawAllClear()` — 게임오버/엔딩
- `drawPaused()` — 일시정지 메뉴 (ESC)
- `drawGuide()` / `drawSettings()` — 가이드/설정 오버레이
- 모바일만: `drawStageResult()` (클리어 결과 카드 + 공유 버튼)

### 별점 시스템 (PC v7.8+, 모바일 v1.6+)
- `function calcStars()`:
  ```js
  var lost = stageLivesStart - sharedLives;
  if(lost<=-2) return 3;  // ★★★
  if(lost<=1)  return 2;  // ★★
  return 1;               // ★
  ```
- 저장: `stageStars[currentDiff][currentStage] = max(기존, 새 별점)`
- 별 이미지: `_starImg = new Image(); _starImg.src='star.png'`
- 월드맵에서 모든 기록된 스테이지에 `stageStars[currentDiff][gi]` 기반으로 3개 별 표시

### 사운드
- `bgmGetDesired()` → `bgmSwitch()` — 게임 상태별 BGM 자동 전환
- `sfxTone, sfxJump, sfxHit, sfxCandy, sfxStomp` — Web Audio API 합성

### 스프라이트 처리
- `opChromakey(img, threshold, preserveEyes)` — 2-pass: 배경 제거 + 눈동자 복원
- threshold=45 기본, `OP_HUG_B64`는 chromakey 건너뜀

### PWA (모바일 전용)
- `mobile/sw.js` — 서비스워커
  - `CACHE_NAME = 'yugang-mobile-vX.Y'` (매 버전 동기화 필수)
  - install: `cache:'reload'`로 ASSETS fetch → HTTP 캐시 우회
  - fetch: stale-while-revalidate (캐시 즉시 반환 + 백그라운드 갱신 `cache:'no-cache'`)
- `mobile/index.html` 상단에 registration: `{updateViaCache:'none'}` + visibilitychange reg.update()

## 밸런스 튜닝 치트시트

**원하는 조정 → 어디 건드리나**

| 조정 목표 | 수정 위치 |
|---|---|
| 특정 스테이지 적/장애물 증감 | `DENSITY` 배열의 [si] 인덱스 |
| 난이도별 추가 적/장애물 | `DIFF_BONUS.normal.w1/w2` 또는 `.hard.w1/w2` |
| 특정 스테이지 이동/낙하/흔들 발판 개수 | `SP_COUNT[si]` 의 {mov, fal, sha} |
| 발판 간격 | `makeStage()` 내 gapK/gapBase 공식 |
| 컨베이어 속도 | `makeStage()` 내 convBase 공식 |
| 사탕 개수 (난이도별) | `makeStage()` 내 `acCount = ?16:?14:19` |
| 물리 점프감 | 파일 상단 `JFORCE/GRAV_UP/GRAV_DOWN` |
| 난이도 목숨/속도 | `DIFFS[난이도].lives/spd/enemySpd` |
| 별점 기준 | `calcStars()` 내부 lost 임계값 |
| BASE_TIME (제한시간) | 파일 상단 `BASE_TIME=300` |

## 클리어 난이도 분석 프레임 (유저가 "난이도 분석해줘" 요청 시)

**작업 순서**:
1. 대상 플랫폼 확인 — PC/모바일 명시 없으면 **먼저 질문**
2. 현재 버전 확인 (커밋 로그 또는 파일 버전 표시)
3. 아래 데이터 원천에서 수치 추출:
   - `DENSITY` 배열 (10스테이지 × 모든 적/장애물 종류)
   - `SP_COUNT[10]` (이동/낙하/흔들 발판)
   - `DIFF_BONUS.normal.w1/w2`, `DIFF_BONUS.hard.w1/w2` (난이도 보정치)
   - `DIFFS[난이도]` (목숨/속도)
   - `acCount`: Easy 19 / Normal 16 / Hard 14 (난이도별 사탕 개수)
   - `MAP_W`, `BASE_TIME`, 물리 상수
4. 난이도별(Easy/Normal/Hard) 테이블 3개 작성
5. 전체 총계 비교 표 + 난이도 등급 + 권장 조정 방향 제시

### 테이블 필수 컬럼

**발판 테이블**:
| 스테이지 | 일반(추정) | Moving | Falling | Shaking | Conveyor | 특수합 |

일반 발판 추정:
- `평균 step = 평균 gap + 평균 width` (width 60~118 → 평균 89)
- `rawPlats ≈ (MAP_W - 510) / 평균 step` + 시작/끝 고정 3개
- 거기서 특수(mov+fal+sha+conveyor) 제외 = 일반 발판

**적 테이블**:
| 스테이지 | Slime | Bird | W2Slime | W2Bat | Spider | Knight | Wizard | Ghost | Chaser* | 합계 |

*Chaser: si≥4(1-5부터)에서 조건부 최대 2마리. 합계는 "X(+2)" 형식으로 별도 표기.

**장애물 테이블**:
| 스테이지 | Spike | Bouncing | VertSpike | Cannon | Laser | LavaPillar | DarkOrb | Teleport | 합계 |

**수집/기믹 테이블**:
| 스테이지 | 사탕 | DarkOrb(시야) | Teleport | 비고 |

### 잉여 발판 / 밀도 지표

**잉여 발판 수 = 일반 발판 - (스파이크+바운싱+버티컬스파이크+지상적+다크오브 배치 발판)**
- 근사치로 계산 (실제로는 코드가 세트로 중복 회피 — 정확치 계산 불가)
- 공중 적(bird/bat/ghost)은 발판 점유 안 함

**밀도 = (적+장애물 합계) / 일반 발판 수**
- 0.3 이하: 여유로움 → 쉬움
- 0.3~0.5: 적당
- 0.5~0.7: 도전적
- 0.7 이상: 빡빡 → 어려움

**난이도 점수 (1~10)** 산정 가이드:
- 기본: 밀도 × 10
- 보정: 속도 배수(si×0.18 누적), 컨베이어/용암/레이저 같은 타이밍 기믹(+1~+2), Chaser 가능성(+0.5), 목숨 5 → +0.5/3 → +1
- W2는 기본 +0.5 (처음 보는 기믹 학습 페널티)

### 전체 총계 비교 테이블 (필수 출력)

| 난이도 | W1 적 | W1 장애물 | W2 적 | W2 장애물 | 사탕 | 평균 밀도 | 전체 |
|---|---|---|---|---|---|---|---|

### 출력 말미에 포함할 것

- **주목할 밸런스 포인트**: 난이도 스파이크/드롭, 과포화/희박 지점
- **권장 조정**: 필요 시 DENSITY/SP_COUNT/발판간격/컨베이어 속도 조정 제안
- **★★★ 달성 난이도 별도 언급** (lost ≤ -2 조건이라 사탕 수집과 사망 둘 다 반영 필수)

## 패치 기획안 작성 규칙 (유저가 "밸런스/난이도 패치 기획해줘" 요청 시)

**변동 표기 규칙 — 기존 대비 delta 반드시 괄호 표기**:
```
예시:
| spikes | [2,3,4,5,6,3,3,3,4,4] | [3,4,5,5,6,3,3,3,4,4] (+1,+1,+1,0,0,0,0,0,0,0) |
또는
slimes: 1-1 3→4 (+1), 1-2 4→5 (+1), 1-3 5→6 (+1)

컨베이어 속도:
2-1 (si=5): 1.20~1.80 (avg 1.50) → 0.65~1.05 (avg 0.85, -57%)
```

**기획안 구조**:
1. **목표 명시** (왜 패치하는가 — "W1 심심함 해소", "Hard 과도한 난이도 완화" 등)
2. **변경 항목별 전후 비교** (위 delta 표기 규칙 적용)
3. **전후 총계 비교 표** (사용자가 임팩트 한눈에 볼 수 있게)
4. **영향 받는 코드 위치** (파일:라인 또는 심볼명)
5. **버전 bump 계획** (PC vX.Y → vX.Y+1 또는 모바일 vX.Y → vX.Y+1 + sw.js CACHE_NAME)
6. **리스크/트레이드오프** 명시
7. **유저 컨펌 받은 뒤 작업 진행** — 임의 구현 금지

## 빠르게 파일 탐색하기 (새 대화 시)

**15MB 파일을 통째로 읽지 말 것.** 다음 패턴 사용:
```
Grep "const DENSITY\|const SP_COUNT\|const DIFF_BONUS" → 밸런스 위치
Grep "function makeStage\|function initStage\|function calcStars" → 핵심 함수
Grep "drawTitle\|drawClear\|drawWorldmap" → UI 함수
Grep "v7\.\|v3\.\|fillText('v" → 현재 버전 위치 (버전 업 시 2곳 수정)
Grep "CACHE_NAME" (sw.js) → 모바일 SW 캐시명
```
Read할 때는 `offset`/`limit` 필수.

## 작업 시 주의사항

### 공통
- 파일이 15MB+로 매우 큼. `Read`는 반드시 offset/limit으로 부분 읽기
- 스프라이트 좌표 수정 시 미리보기에서 시각적 확인 필수
- `opChromakey` threshold=45, HUG 이미지만 chromakey 건너뜀

### ⚠️ PC/모바일 버전 구분 (최우선)
- **유저가 수정 대상을 명시하지 않으면 반드시 먼저 물어볼 것** — 절대 추측해서 양쪽 다 건드리지 않기
- PC(`index.html`)와 모바일(`mobile/index.html`)은 **완전히 독립된 코드베이스**. 한쪽에서 수정한 걸 다른 쪽에 자동 반영하지 않음
- 명시적으로 "PC+모바일 공통" 또는 "양쪽 다"라고 했을 때만 동시 수정
- 커밋 메시지에도 대상 버전 명시 (예: "PC v7.6", "모바일 v1.10", "PC+모바일 공통")

### PC 버전 패치 시
- 버전 체계: `X.Y` (Y는 9→10→11…), 대규모 패치에서만 X 올림
- 매 커밋마다 Y +1
- 버전 표시 위치 **2곳** 동기화 필수: `drawIntro()` 인트로 + `drawTitle()` 타이틀 우하단
- 모바일과 독립 버전 체계 — PC 버전 올린다고 모바일 버전 올리지 말 것

### 모바일 버전 패치 시
- 버전 체계: `X.Y`, PC와 독립 (v1.0부터 시작)
- **매 커밋마다 Y +1 (유저가 말 안 해도 자동)**
- 버전 표시 **2곳** 동기화: 인트로 + 타이틀 우하단
- **`mobile/sw.js`의 `CACHE_NAME`도 같은 버전으로 동기화** 필수 (예: `yugang-mobile-v1.3`) — 안 바꾸면 서비스워커 캐시 때문에 업데이트 반영 안 됨
- PWA 매니페스트/아이콘/오프라인 캐시 동작 고려
- 터치 조작·조이스틱·HUD 레이아웃은 모바일 전용 — PC 코드와 구조가 다름

### 타이틀/인트로 수정 시
- PC와 모바일 **둘 다 픽셀아트 배경 + 버튼 PNG 기반 리디자인됨** (2026-04-14)
- 폰트는 양쪽 **Noto Sans KR Bold**로 통일
- 버튼 스타일은 **분리** (PC와 모바일이 서로 다름) — 한쪽 스타일을 다른 쪽에 복붙 금지
