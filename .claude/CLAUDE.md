# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mục lục
- Project Overview
- Architecture
- Deployment
- Conventions
- Common Tasks
- Legacy (cần review)

## Project Overview
Static marketing website cho game studio **JoyCraft Games**, hosted via **GitHub Pages** ở custom domain `joycraftgames.net` (cấu hình qua `CNAME`). Không có build step, không có dependencies, không có test suite — chỉ là HTML/CSS tĩnh.

## Architecture
Mỗi page là một file HTML độc lập, **CSS inline trong `<style>` block** (không có shared stylesheet). Layout chia 3 page chính:
- `index.html` — landing page (hero, games grid, about, contact). Game card hiện tại link tới Ring Slide trên Google Play.
- `privacy-ring-slide.html` — privacy policy cho app Ring Slide: Colorful Yarn.
- `data-deletion.html` — GDPR-style data deletion request flow (email admin@joycraftgames.net).

`app-ads.txt` ở root là Google authorized digital sellers manifest cho mobile ads — generated từ ad network dashboards (AppLovin, Unity, IronSource, Mintegral, Meta, LiftOff). Header `#UpdatedOn<date>` đánh dấu lần update gần nhất. **Không edit manual** — copy từ network khi cần refresh.

## Deployment
Push lên branch `main` → GitHub Pages tự deploy ra `joycraftgames.net`. Không có CI, không có staging.

## Conventions
- Ngôn ngữ discussion: tiếng Việt; technical terms: tiếng Anh.
- Khi thêm game mới: thêm 1 `.game-card` block trong `index.html` + tạo file privacy policy riêng (theo pattern `privacy-<game-slug>.html`).
- Contact emails phân theo mục đích: `business@` (general), `admin@` (data deletion), `huytranh@` (privacy contact trong policy).

## Common Tasks
- Test local: mở `index.html` trực tiếp trong browser (no server needed).
- Refresh ad networks list: paste content mới vào `app-ads.txt`, update `#UpdatedOn` header.

## Legacy (cần review)
Dòng dưới đây tồn tại trong CLAUDE.md cũ, không rõ context — anh quyết định giữ hay xoá:
> redo theo entry — xin lỗi tốn token".
