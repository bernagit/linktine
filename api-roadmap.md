# API Roadmap

A checklist of planned/implemented API endpoints and features.

---

## 1. Auth (authentication & user session)

- [x] **POST** `/api/v1/auth/register` — Public
- [x] **POST** `/api/v1/auth/login` — Public
- [ ] **POST** `/api/v1/auth/refresh` — Auth *(optional)*
- [x] **POST** `/api/v1/auth/logout` — Auth
- [x] **GET** `/api/v1/auth/me` — Auth
- [x] **PATCH** `/api/v1/auth/me` — Auth
- [x] **PATCH** `/api/v1/auth/me/password` — Auth

---

## 2. Users (admin & self-management)

- [ ] **GET** `/api/v1/users` — Admin
- [ ] **GET** `/api/v1/users/:id` — Admin/Owner
- [ ] **PATCH** `/api/v1/users/:id` — Admin/Owner
- [ ] **DELETE** `/api/v1/users/:id` — Admin
- [ ] **POST** `/api/v1/users/:id/ban` — Admin

---

## 3. Links (CRUD + bulk ops)

- [ ] **POST** `/api/v1/links` — Auth
- [ ] **GET** `/api/v1/links` — Auth

---

## 4. Tags

- [ ] **GET** `/api/v1/tags` — Auth
- [ ] **GET** `/api/v1/tags/autocomplete` — Auth/Public
- [ ] **POST** `/api/v1/tags` — Admin
- [ ] **PATCH** `/api/v1/tags/:id` — Admin
- [ ] **DELETE** `/api/v1/tags/:id` — Admin

---

## 5. Collections / Folders

- [ ] **POST** `/api/v1/collections` — Auth
- [ ] **GET** `/api/v1/collections` — Auth
- [ ] **GET** `/api/v1/collections/:id` — Auth
- [ ] **PUT** `/api/v1/collections/:id` — Auth
- [ ] **DELETE** `/api/v1/collections/:id` — Auth
- [ ] **POST** `/api/v1/collections/:id/pin` — Auth
- [ ] **POST** `/api/v1/collections/:id/share` — Auth

---

## 6. Sharing

- [ ] Link sharing (`/api/v1/links/:id/share`, list, revoke)
- [ ] Collection sharing (`/api/v1/collections/:id/share`, list, revoke)
- [ ] Public share tokens (`/api/v1/shares/public`, `/s/:token`)
- [ ] Invites (`/api/v1/invites`, `/api/v1/invites/:inviteId/accept`)

---

## 7. Notes & Annotations

- [ ] **POST** `/api/v1/links/:linkId/notes` — Auth
- [ ] **GET** `/api/v1/links/:linkId/notes` — Auth
- [ ] **PUT** `/api/v1/notes/:noteId` — Auth
- [ ] **DELETE** `/api/v1/notes/:noteId` — Auth

---

## 8. Import / Export

- [ ] **POST** `/api/v1/imports/bookmarks` — Auth
- [ ] **GET** `/api/v1/imports/:jobId` — Auth
- [ ] **GET** `/api/v1/exports/collection/:id` — Auth
- [ ] **GET** `/api/v1/exports/links` — Auth

---

## 9. Search & Filters

- [ ] **GET** `/api/v1/search` — Auth
- [ ] **GET** `/api/v1/stats/domains` — Auth

---

## 10. Metadata fetching & thumbnails

- [ ] **POST** `/api/v1/links/:id/fetch-metadata` — Auth
- [ ] **POST** `/api/v1/metadata/fetch` — Admin

---

## 11. Admin & Moderation APIs

- [ ] **GET** `/api/v1/admin/users`
- [ ] **GET** `/api/v1/admin/links`
- [ ] **POST** `/api/v1/admin/links/:id/flag`
- [ ] **POST** `/api/v1/admin/take-down/:id`
- [ ] **GET** `/api/v1/admin/metrics`

---

## 12. Webhooks / Notifications (optional)

- [ ] **POST** `/api/v1/hooks/webhook` — Public
- [ ] Internal notification endpoints (sharing/invites)

---

## 13. Health / Dev / Ops

- [ ] **GET** `/api/v1/healthz` — Public
- [ ] **GET** `/api/v1/version` — Public
- [ ] **GET** `/api/v1/metrics` — Admin/Internal

---

## 15. Extra / Nice-to-have

- [ ] **POST** `/api/v1/links/:id/screenshot`
- [ ] **GET** `/api/v1/autocomplete/links`
- [ ] **GET** `/api/v1/recent` — Auth
- [ ] **GET** `/api/v1/recommendations` — Auth
