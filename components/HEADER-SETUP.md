# คู่มือการใช้งาน Header Component System

## ภาพรวม

ระบบนี้ช่วยให้คุณแก้ไขเมนู header ครั้งเดียว แล้วส่งผลกับทุกหน้าในเว็บไซต์

## โครงสร้างไฟล์

```
project/
├── components/
│   ├── menu-navigation.html       ← แก้ไขเมนูหลักที่นี่
│   ├── menu-right-buttons.html    ← แก้ไขปุ่มภาษา/เมนูอื่นๆ ที่นี่
│   └── README.md
├── assets/
│   └── js/
│       └── header-loader.js       ← JavaScript ที่โหลด components
└── index.html                      ← ตัวอย่างการใช้งาน
```

## วิธีการทำงาน

### 1. Header ทั้ง 3 ส่วน

เว็บไซต์นี้มี header 3 ส่วนที่ทำงานร่วมกัน:

**Hamburger Menu (Mobile)**
- แสดงเมื่อหน้าจอเล็ก (< 1200px)
- เป็นเมนูแบบ slide-in จากด้านข้าง

**Header Absolute**
- แสดงตอนเปิดหน้าเว็บครั้งแรก
- โปร่งใส วางทับบน hero section
- ใช้โลโก้สีขาว

**Header Sticky**
- แสดงเมื่อ scroll ลงมา
- มีพื้นหลังทึบ ติดด้านบน
- ใช้โลโก้สีเข้ม

### 2. Component System

แทนที่จะเขียนเมนูซ้ำ 3 ครั้ง เราแยกเมนูออกมาเป็นไฟล์แยก:

- `components/menu-navigation.html` - เมนูหลัก
- `components/menu-right-buttons.html` - ปุ่มด้านขวา

JavaScript จะโหลดไฟล์เหล่านี้แล้วแทรกเข้าไปใน header ทั้ง 3 ที่อัตโนมัติ

## การแก้ไขเมนู

### แก้ไขเมนูหลัก

เปิดไฟล์ `components/menu-navigation.html`

**เพิ่มเมนูใหม่:**
```html
<!-- Desktop -->
<li class="menu-desktop"><a href="new-page.html">เมนูใหม่</a></li>

<!-- Mobile -->
<li class="menu-mobile"><a href="new-page.html">เมนูใหม่</a></li>
```

**เพิ่มเมนูย่อย:**
```html
<li class="has-dropdown menu-mobile">
    <a href="javascript:void(0)">เมนูหลัก</a>
    <ul class="sub-menu">
        <li><a href="sub1.html">เมนูย่อย 1</a></li>
        <li><a href="sub2.html">เมนูย่อย 2</a></li>
    </ul>
</li>
```

**เปลี่ยนชื่อเมนู:**
```html
<!-- เดิม -->
<li class="menu-desktop"><a href="javascript:void(0)">เกี่ยวกับเรา</a></li>

<!-- ใหม่ -->
<li class="menu-desktop"><a href="about.html">About Us</a></li>
```

### แก้ไขปุ่มด้านขวา

เปิดไฟล์ `components/menu-right-buttons.html`

**เพิ่มภาษาใหม่:**
```html
<li class="has-dropdown"><a href="javascript:void(0)">TH</a>
    <ul class="sub-menu">
        <li><a href="?lang=th">TH</a></li>
        <li><a href="?lang=en">EN</a></li>
        <li><a href="?lang=zh">中文</a></li>  <!-- เพิ่มภาษาจีน -->
    </ul>
</li>
```

**แก้ไข Mega Menu:**
แก้ไขเนื้อหาใน `<div class="mega-menu-wrapper">` ตามต้องการ

## การนำไปใช้ในหน้าใหม่

### ขั้นตอนที่ 1: คัดลอก HTML Structure

คัดลอกโค้ดนี้ไปใส่ในหน้าใหม่:

```html
<!doctype html>
<html lang="th">
<head>
    <meta charset="utf-8">
    <title>หน้าใหม่</title>
    <!-- CSS ตามปกติ -->
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <!-- Hamburger Menu -->
    <div class="hamburger-area d-xl-none">
        <div class="hamburger_bg"></div>
        <div class="hamburger_wrapper">
            <div class="hamburger_inner">
                <div class="hamburger_top d-flex align-items-center justify-content-between">
                    <div class="hamburger_logo">
                        <a href="index.html" class="mobile_logo">
                            <img src="assets/images/logos/aac-light-logo.svg" alt="AAC logo">
                        </a>
                    </div>
                    <div class="hamburger_close">
                        <button class="hamburger_close_btn"><i class="fa-thin fa-times"></i></button>
                    </div>
                </div>
                <div class="hamburger_menu">
                    <div class="mobile_menu"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Header Absolute -->
    <header class="header-area header-2 header-absolute section-gap-x">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="header-wrapper">
                        <div class="site_logo">
                            <a class="logo" href="index.html">
                                <img src="assets/images/logos/aac-light-logo.svg" alt="AAC logo">
                            </a>
                        </div>

                        <div class="menu-area d-none d-lg-inline-flex align-items-center">
                            <nav id="mobile-menu" class="mainmenu">
                                <!-- เมนูจะถูกโหลดจาก components/menu-navigation.html -->
                            </nav>
                        </div>

                        <div class="header-right-item d-none d-xl-inline-flex">
                            <div class="header-menu-button">
                                <nav class="mainmenu">
                                    <!-- ปุ่มจะถูกโหลดจาก components/menu-right-buttons.html -->
                                </nav>
                            </div>
                        </div>

                        <div class="menu_bar mobile_menu_bar d-xl-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Header Sticky -->
    <header class="header-area header-2 header-duplicate header-sticky">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="header-wrapper">
                        <div class="site_logo">
                            <a class="logo" href="index.html">
                                <img src="assets/images/logos/aac-primary-logo.svg" alt="AAC logo">
                            </a>
                        </div>

                        <div class="menu-area d-none d-lg-inline-flex align-items-center">
                            <nav class="mainmenu">
                                <!-- เมนูจะถูกโหลดจาก components/menu-navigation.html -->
                            </nav>
                        </div>

                        <div class="header-right-item d-none d-lg-inline-flex">
                            <div class="header-menu-button">
                                <nav id="mobile-menu" class="mainmenu">
                                    <!-- ปุ่มจะถูกโหลดจาก components/menu-right-buttons.html -->
                                </nav>
                            </div>
                        </div>

                        <div class="menu_bar mobile_menu_bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- เนื้อหาหน้าเว็บ -->
    <main>
        <!-- เนื้อหาของคุณ -->
    </main>

    <!-- JavaScript -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/meanmenu.js"></script>
    <script src="assets/js/header-loader.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

### ขั้นตอนที่ 2: ตรวจสอบ JavaScript

ตรวจสอบว่าโหลด JavaScript ตามลำดับนี้:
1. `jquery.min.js` - ต้องโหลดก่อนเสมอ
2. `meanmenu.js` - สำหรับ mobile menu
3. `header-loader.js` - โหลด components
4. `main.js` - JavaScript หลัก

## ข้อกำหนดสำคัญ

### 1. ต้องรันผ่าน Web Server

❌ **ไม่ได้:** เปิดไฟล์โดยตรง (file:///path/to/index.html)
✅ **ได้:** รันผ่าน web server (http://localhost:8000)

**วิธีรัน Local Server:**

**VS Code:**
- ติดตั้ง extension "Live Server"
- คลิกขวาที่ไฟล์ HTML → "Open with Live Server"

**Python:**
```bash
python -m http.server 8000
# เปิด http://localhost:8000
```

**Node.js:**
```bash
npx http-server
# เปิด http://localhost:8080
```

### 2. Path ของไฟล์

ตรวจสอบว่า path ถูกต้อง:
- Components: `components/menu-navigation.html`
- JavaScript: `assets/js/header-loader.js`
- Images: `assets/images/logos/...`

### 3. Class ที่สำคัญ

**สำหรับ Header:**
- `.header-absolute` - header โปร่งใส
- `.header-sticky` - header ติดด้านบน
- `.header-duplicate` - ใช้คู่กับ sticky

**สำหรับ Menu:**
- `.menu-desktop` - แสดงเฉพาะ desktop
- `.menu-mobile` - แสดงเฉพาะ mobile
- `.has-dropdown` - เมนูที่มีเมนูย่อย

## Troubleshooting

### เมนูไม่แสดง

**ตรวจสอบ:**
1. รันผ่าน web server หรือไม่?
2. เปิด Console (F12) มี error หรือไม่?
3. ไฟล์ component อยู่ในโฟลเดอร์ `components/` หรือไม่?
4. โหลด `header-loader.js` หรือยัง?

**แก้ไข:**
```javascript
// เปิด Console (F12) แล้วพิมพ์
console.log('Testing header loader');
```

### เมนู Mobile ไม่ทำงาน

**ตรวจสอบ:**
1. โหลด `meanmenu.js` ก่อน `header-loader.js` หรือไม่?
2. มี jQuery โหลดก่อนหรือไม่?
3. มี element `.mobile_menu` หรือไม่?

### เมนูแสดงช้า

**สาเหตุ:**
- ต้องโหลดจากไฟล์แยก ใช้เวลาเล็กน้อย

**แก้ไข:**
- ใช้ build tool (Gulp, Webpack) รวมไฟล์ก่อน deploy
- หรือใช้ Server-Side Includes (SSI)

### Cache ไม่อัพเดท

**แก้ไข:**
- Hard Refresh: `Ctrl + Shift + R` (Windows) หรือ `Cmd + Shift + R` (Mac)
- Clear Cache ใน Browser
- เพิ่ม version query: `header-loader.js?v=2`

## ตัวอย่างการใช้งาน

### ตัวอย่างที่ 1: เพิ่มเมนู "บริการ"

**ไฟล์: `components/menu-navigation.html`**

```html
<!-- เพิ่มหลังเมนู "ธุรกิจของเรา" -->
<li class="menu-desktop"><a href="services.html">บริการ</a></li>

<!-- เพิ่มในส่วน mobile ด้วย -->
<li class="has-dropdown menu-mobile">
    <a href="services.html">บริการ</a>
    <ul class="sub-menu">
        <li><a href="service-1.html">บริการที่ 1</a></li>
        <li><a href="service-2.html">บริการที่ 2</a></li>
    </ul>
</li>
```

### ตัวอย่างที่ 2: เปลี่ยนโลโก้

**ไฟล์: `index.html` (และหน้าอื่นๆ)**

```html
<!-- Header Absolute - โลโก้สีขาว -->
<img src="assets/images/logos/new-light-logo.svg" alt="Logo">

<!-- Header Sticky - โลโก้สีเข้ม -->
<img src="assets/images/logos/new-dark-logo.svg" alt="Logo">
```

### ตัวอย่างที่ 3: เพิ่มปุ่ม Social Media

**ไฟล์: `components/menu-right-buttons.html`**

```html
<!-- เพิ่มหลังปุ่มเมนูอื่นๆ -->
<li>
    <a href="https://facebook.com/yourpage" target="_blank">
        <i class="fab fa-facebook"></i>
    </a>
</li>
```

## Best Practices

1. **แก้ไขเมนูที่ components เท่านั้น** - อย่าแก้ไขใน HTML หลัก
2. **ทดสอบทุกหน้า** - หลังแก้ไขเมนู ควรทดสอบทุกหน้า
3. **Backup ก่อนแก้ไข** - สำรองไฟล์ก่อนแก้ไขครั้งใหญ่
4. **ใช้ Git** - Version control ช่วยติดตามการเปลี่ยนแปลง
5. **Comment โค้ด** - เขียน comment อธิบายการเปลี่ยนแปลงสำคัญ

## สรุป

✅ **ข้อดี:**
- แก้ไขครั้งเดียว ส่งผลทุกหน้า
- โค้ดสั้นลง อ่านง่าย
- Maintainable และ Scalable

⚠️ **ข้อควรระวัง:**
- ต้องรันผ่าน web server
- มี delay เล็กน้อยตอนโหลด
- SEO อาจได้รับผลกระทบเล็กน้อย

## ติดต่อ / ช่วยเหลือ

หากมีปัญหาหรือข้อสงสัย:
1. อ่าน `components/README.md` สำหรับรายละเอียดเพิ่มเติม
2. ตรวจสอบ Console (F12) หา error
3. ดู source code ใน `assets/js/header-loader.js`
