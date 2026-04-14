# 유강이의 모험 (Yugang Adventure)

HTML Canvas 기반 플랫포머 게임. 단일 `index.html` 파일(15MB+)에 모든 코드/리소스 포함.

## 프로젝트 구조
- `index.html` — PC 버전 게임 전체 (HTML/CSS/JS + base64 이미지/BGM/SFX)
- `mobile/index.html` — 모바일 버전 (터치 조작, 모바일 난이도, PWA)
- `mobile/manifest.json` — PWA 매니페스트
- `mobile/sw.js` — 서비스워커 (오프라인 캐시, 캐시명에 버전 포함)
- `mobile/icon-192.png`, `icon-512.png` — PWA 아이콘
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

## 패치 기록

### v7.x — 세이브/일시정지 + UI 개선
| 버전 | 내용 |
|---|---|
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

## 스프라이트 시트
- **공주** (`OP_PRINCESS_B64`, 684x365): WALK, IDLE, CRY, HAPPY 좌표 매핑됨
- **악당** (`OP_VILLAIN_B64`, 684x365): IDLE, FLOAT, KIDNAP, DEFEAT
- **유강이** (`OP_DOG_B64`, 375x666): WALK, HAPPY
- **포옹** (`OP_HUG_B64`, 375x666): 전용 시트, APPROACH(12프레임) + HOLD(21프레임)
- 움직임좌표 파일: `~/Desktop/yugang adventure/` 에 공주/악당/유강이 좌표 txt

## 세이브 시스템
- `localStorage` 키: `yugang_save`
- 저장 데이터: currentStage, currentDiff, sharedLives, totalScore, acornCount, bgmOn, sfxOn, masterVol
- 저장 시점: 스테이지 클리어, 설정 변경, 게임 중 타이틀 복귀
- 게임오버/올클리어 시 진행 데이터 삭제 (설정만 유지)

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
