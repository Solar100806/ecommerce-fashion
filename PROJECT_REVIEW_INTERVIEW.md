# Ecommerce Fashion - Project Review (Fresher Frontend Interview)

## 1) Muc tieu review

Tai lieu nay em viet theo goc nhin **fresher frontend** khi trao doi voi tech lead:

- Tom tat kien truc du an.
- Review diem manh, rui ro va kha nang mo rong.
- Giai thich ro luong hoat dong cua **tat ca chuc nang hien co** (Client + Admin).
- Neu ke hoach nang cap trong cac vong tiep theo.

---

## 2) Tong quan ky thuat

### Stack chinh

- React + TypeScript
- React Router DOM
- React Hook Form
- Axios
- TailwindCSS
- JSON Server (mock backend local)
- Luu state ben client bang `localStorage` (user, cart, wishlist)

### Cau truc app

- Entry app: `src/main.tsx`
  - BOC providers: `WishlistProvider` -> `CartProvider` -> `App`
- Router tong: `src/App.tsx`
  - Nhanh Client (`/`)
  - Nhanh Admin (`/admin`)

---

## 3) Review tong the (theo muc do uu tien)

## Critical

- **Khong co bao mat xac thuc/phan quyen that su cho Admin**
  - Route `/admin` mo truc tiep, khong co guard role.
  - Hien tai bat ky ai biet URL deu vao duoc trang quan tri.
  - Anh huong: rui ro nghiem trong neu dua len moi truong that.

- **Dang nhap dang lay toan bo users va so sanh password plain-text o client**
  - Cac logic dang nhap duoc xu ly phia frontend.
  - Password duoc luu va so sanh plain text.
  - Anh huong: sai mo hinh bao mat co ban.

## High

- **Kieu du lieu `id` khong dong nhat giua TS interface va du lieu thuc te**
  - `IProduct.id` dang la `number`, trong `db.json` la chuoi (`"1"`, `"2"`...).
  - De gay bug ngam khi so sanh nghiem ngat, thao tac update/delete, mapping.

- **Trang ProductDetail hien thi tinh trang hang dua vao `status`**
  - `status` la optional va data hien tai khong co field nay.
  - Ket qua: co the hien thi "Het hang" du kho van > 0.

- **Nhieu URL API hard-code**
  - Dang goi truc tiep `http://localhost:3000/...`.
  - Chua co bien moi truong (`VITE_API_URL`) va layer api tap trung.

## Medium

- **Feedback UX dang dung `alert()`**
  - UX bi giat man hinh, khong dong bo style app.
  - Nen thay bang toast/banner.

- **Form Register cho phep submit field `rePassword` len backend**
  - Chua sanitize payload truoc khi POST.
  - Tao du lieu du thua trong `users`.

- **Chua co phan trang server/client cho danh sach lon**
  - Product list va Admin list dang load full.
  - Chua toi uu neu data tang.

## Low

- **Tien te khong dong nhat giua trang**
  - Home dang format `USD`, cac trang con lai dung `VND`.
  - Can thong nhat de tranh nham lan UX.

- **Mot so noi dung placeholder chua hoan thien**
  - Vi du mo ta chi tiet tab danh gia trong ProductDetail.

---

## 4) Diem manh cua du an

- Tach route ro rang giua **Client** va **Admin**.
- Da ap dung TypeScript va custom interfaces.
- Co su dung `react-hook-form` cho validation form.
- Co state dung chung qua Context (`CartContext`, `WishlistContext`).
- Da persist state qua `localStorage` giup trai nghiem lien tuc khi reload.
- Admin da co dashboard va luong CRUD co ban de demo nghiep vu.

---

## 5) Luong hoat dong chi tiet tat ca chuc nang

## 5.1 Khoi tao ung dung

1. App render tai `main.tsx`.
2. `BrowserRouter` phu trach dieu huong.
3. `WishlistProvider` va `CartProvider` cap state global cho toan bo page.
4. `App.tsx` chia route thanh 2 nhom:
   - Client: `/`, `/product`, `/product/:id`, `/cart`, `/wishlist`, `/register`, `/login`, `/contact`
   - Admin: `/admin`, `/admin/product`, `/admin/product/add`, `/admin/product/edit/:id`, `/admin/users`

---

## 5.2 Client - Layout, Header, Footer

1. `ClientLayout` doc user tu `localStorage`.
2. Header hien thi:
   - Link dieu huong
   - Badge so luong gio hang (`cartItems.length`)
   - Badge so luong yeu thich (`wishlistItems.length`)
3. Neu da login:
   - Hien thi "Hi, {email-prefix}" + nut dang xuat.
4. Dang xuat:
   - Xoa `user` trong localStorage
   - Cap nhat state local
   - Navigate ve `/`

---

## 5.3 Dang ky tai khoan (`/register`)

1. Nguoi dung nhap username, email, password, rePassword.
2. `react-hook-form` validate:
   - required
   - pattern email
   - min length password
   - confirm password trung password
3. Submit thanh cong:
   - POST `/users` qua json-server
   - alert thanh cong
   - dieu huong den `/login`

---

## 5.4 Dang nhap (`/login`)

1. User nhap email + password.
2. Frontend GET toan bo `/users`.
3. Tim user khop email/password.
4. Neu dung:
   - Luu user vao `localStorage`
   - alert thanh cong
   - navigate den `/product`
5. Neu sai:
   - alert thong bao sai thong tin.

---

## 5.5 Trang Home (`/`)

1. GET `/products`.
2. Xu ly state loading/error.
3. Tao 3 nhom san pham:
   - Top rated
   - Premium (gia cao)
   - Sap chay hang (so luong thap)
4. Moi card co nut add to cart.

---

## 5.6 Trang danh sach san pham (`/product`)

1. GET `/products`.
2. Nguoi dung thao tac bo loc:
   - Search keyword
   - Category
   - Price range
   - Sort
3. `useMemo` tinh danh sach da loc (`filteredProducts`).
4. Card san pham ho tro:
   - Xem chi tiet
   - Them gio hang (disabled khi het so luong)
   - Toggle wishlist (icon tim)
5. Co empty state neu khong co ket qua.

---

## 5.7 Trang chi tiet san pham (`/product/:id`)

1. Lay `id` tu URL params.
2. GET `/products/:id`.
3. Hien thi thong tin:
   - Anh, ten, mo ta, gia, ton kho
4. Chon so luong mua:
   - Nut `-` khong cho xuong duoi 1
   - Nut `+` khong vuot qua ton kho
5. Hanh dong:
   - Them gio hang voi quantity da chon
   - Mua ngay -> add to cart va chuyen den `/cart`
   - Toggle wishlist ngay tai trang detail

---

## 5.8 Gio hang (`/cart`)

1. Du lieu gio hang doc tu `CartContext` (co persist localStorage).
2. Cho phep:
   - Tang/giam so luong
   - Xoa tung item
   - Xoa toan bo gio
3. Tinh tong tien:
   - `subtotal`
   - `shippingFee`
   - `discount` theo coupon
   - `total`
4. Coupon:
   - `SAVE10`: giam 10% subtotal
   - `FREESHIP`: phi ship = 0
5. Checkout:
   - Kiem tra co `user` trong localStorage khong
   - Neu chua login -> yeu cau dang nhap
   - Neu co login -> gia lap xu ly don hang, clear cart, hien modal thanh cong

---

## 5.9 Wishlist (`/wishlist`)

1. Wishlist luu trong `WishlistContext` + localStorage.
2. Hien thi danh sach san pham yeu thich.
3. Cho phep:
   - Xem chi tiet
   - Them nhanh vao gio
   - Xoa tung item
   - Xoa toan bo wishlist
4. Header cap nhat so luong realtime.

---

## 5.10 Contact (`/contact`)

1. Form lien he validate bang `react-hook-form`.
2. Submit dang mo phong bang `setTimeout`.
3. Khi thanh cong:
   - Reset form
   - Hien thong bao thanh cong tam thoi

---

## 5.11 Admin - Layout (`/admin/*`)

1. Sidebar menu:
   - Tong quan
   - San pham
   - Nguoi dung
2. Topbar co shortcut:
   - `+ Them san pham`
3. Noi dung render qua `Outlet`.

---

## 5.12 Admin Dashboard (`/admin`)

1. Goi song song:
   - GET `/products`
   - GET `/users`
2. Tinh KPI:
   - Tong san pham
   - Tong nguoi dung
   - So san pham sap het hang (<=10)
   - Tong gia tri ton kho
3. Hien thi danh sach:
   - Low stock products
   - Top rated products

---

## 5.13 Admin Product List (`/admin/product`)

1. GET `/products`.
2. Ho tro bo loc:
   - Search ten/mo ta
   - Filter category
   - Sort gia/kho
3. Bang hien thi:
   - Anh, ten, danh muc, gia, kho, rating
4. CRUD action:
   - Edit -> `/admin/product/edit/:id`
   - Delete -> goi DELETE API, cap nhat state tai cho

---

## 5.14 Admin Add Product (`/admin/product/add`)

1. Form validate field bat buoc.
2. Preview anh tu URL nguoi dung nhap.
3. Submit:
   - Chuan hoa so (`price`, `quantity`)
   - Gan rating default
   - POST `/products`
4. Thanh cong thi navigate ve danh sach product admin.

---

## 5.15 Admin Edit Product (`/admin/product/edit/:id`)

1. Lay id tu params.
2. GET `/products/:id` -> `reset()` form.
3. Cho phep sua thong tin + xem preview anh.
4. Submit:
   - Chuan hoa kieu so
   - PUT `/products/:id`
5. Thanh cong -> quay lai danh sach product admin.

---

## 5.16 Admin Users (`/admin/users`)

1. GET `/users`.
2. Search theo username/email.
3. Delete user:
   - confirm
   - DELETE `/users/:id`
   - update state local

---

## 6) De xuat nang cap theo lo trinh

## Phase 1 (uu tien cao)

- Them auth backend that su:
  - login API tra token
  - role-based route guard cho `/admin`
- Dong bo kieu `id` (toan bo string hoac toan bo number).
- Tao `apiClient` chung + bien moi truong `VITE_API_URL`.

## Phase 2

- Thay `alert()` bang toast (`react-hot-toast`).
- Them pagination + server filtering cho list lon.
- Tach business logic thanh custom hooks (`useProducts`, `useAuth`, `useCheckout`).

## Phase 3

- Unit test cho util/hooks va integration test cho flow quan trong.
- Toi uu UX:
  - skeleton loading
  - optimistic UI cho thao tac xoa/sua
  - trang thai loi chi tiet hon.

---

## 7) Cach em pitch trong buoi phong van (fresher)

"Em da xay mot ecommerce frontend voi React + TypeScript, co 2 module chinh la Client va Admin.  
Phia Client em xu ly duoc browse san pham, filter/search/sort, cart, wishlist, auth co ban va contact form.  
Phia Admin em lam dashboard theo KPI, CRUD san pham va quan ly user.  
Em chu dong nhan ra cac diem can nang cap de production nhu route guard, auth backend, dong bo kieu du lieu va toi uu API layer.  
Neu vao team, em uu tien fix bao mat va chuan hoa kien truc truoc, sau do toi uu trai nghiem va test."
