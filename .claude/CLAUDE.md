# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mục lục
- Project Overview
- Architecture
- Deployment
- Conventions
- Common Tasks

## Project Overview
Static marketing website cho game studio **JoyCraft Games** — positioned là một "Vietnam-based, AI-augmented game studio". Hosted via **GitHub Pages** ở custom domain `joycraftgames.net` (cấu hình qua `CNAME`). Không có build step, không có package dependencies, không có test suite — chỉ HTML/CSS + vanilla JS tĩnh.

## Architecture
Site có **2 loại trang**:

**1. Data-driven pages** (`index.html`, `careers.html`) — HTML shell gần như rỗng (`#nav-root` / `#main` / `#footer-root`), content render bằng vanilla JS từ một data file:
- `assets/js/data.js` — **single source of truth** cho mọi content (`window.JOYCRAFT`): brand, nav, contact, hero, about (disciplines + founders), games, careers + jobs. Sửa copy / thêm game / thêm job → chỉ sửa file này, không đụng HTML.
- `assets/js/components.js` — shared chrome (nav + footer), expose `window.JC` (gồm helper `esc` để escape text inject qua `innerHTML`). Classic script, chạy được qua `file://`.
- `assets/js/home.js` / `assets/js/careers.js` — per-page renderer, inject content vào `#main` và mount chrome.
- `assets/js/theme.js` — wire dark/light toggle + mobile hamburger. Initial theme apply bằng inline snippet trong `<head>` để tránh FOUC; lưu vào `localStorage` key `joycraft-theme`.
- **Script order trong HTML quan trọng:** `data.js` → `components.js` → page renderer → `theme.js`.
- CSS shared trong `assets/css/`: `main.css` (chrome + design tokens, dùng chung mọi trang), `home.css`, `careers.css`.

**2. Standalone legal pages** (`privacy-ring-slide.html`, `data-deletion.html`) — self-contained, **inline CSS**, KHÔNG dùng hệ data-driven ở trên. `privacy-ring-slide.html` là privacy policy cho app Ring Slide: Colorful Yarn (generated từ App Privacy Policy Generator). `data-deletion.html` là GDPR-style data deletion request flow.

`app-ads.txt` ở root là Google authorized digital sellers manifest cho mobile ads — aggregate từ các ad network (AppLovin, Unity, IronSource, Mintegral, ...), maintain trong Google Sheet *joycraft | app-ads.txt* làm single source of truth. Header `#UpdatedOn<date>` (nằm trong sheet) đánh dấu lần update gần nhất. **Không edit `app-ads.txt` bằng tay** — sửa trong sheet rồi export CSV + regenerate (xem Common Tasks).

## Deployment
Push lên branch `main` → GitHub Pages tự deploy ra `joycraftgames.net`. Không có CI, không có staging.

## Conventions
- Ngôn ngữ discussion: tiếng Việt; technical terms: tiếng Anh.
- **Thêm game / job mới hoặc sửa copy:** edit `assets/js/data.js` (`games.items` / `jobs` array) — KHÔNG sửa HTML.
- **Thêm game có app riêng:** ngoài data.js, tạo file privacy policy theo pattern `privacy-<game-slug>.html` (standalone, inline CSS).
- JS phải là **classic scripts** (không ES module) để chạy được qua `file://`; mọi text inject qua `innerHTML` phải escape bằng `JC.esc`.
- Contact emails phân theo mục đích: `business@` (general/partnership), `hiring@` (careers), `admin@` (data deletion), `huytranh@` (privacy contact trong policy).

## Common Tasks
- Test local: mở `index.html` / `careers.html` trực tiếp trong browser (no server needed — classic scripts).
- **Refresh `app-ads.txt`:** source of truth là Google Sheet *joycraft | app-ads.txt*, export ra `~/Downloads/joycraft _ app-ads.txt - Sheet1.csv`. CSV bọc mỗi dòng trong `"..."` (Sheets quote cell chứa dấu phẩy) — sai format IAB nếu up nguyên, phải strip quote đầu/cuối mỗi dòng rồi ghi đè `app-ads.txt`. Header `#UpdatedOn<date>` đã nằm sẵn trong sheet, không thêm tay. Giữ no-BOM + CRLF như file gốc. PowerShell:
  ```powershell
  $src="$HOME\Downloads\joycraft _ app-ads.txt - Sheet1.csv"; $dst="D:\website\app-ads.txt"
  $lines=[System.IO.File]::ReadAllLines($src) | ForEach-Object { $_.Trim('"') }
  [System.IO.File]::WriteAllLines($dst, $lines)
  ```
