# Header Components

โฟลเดอร์นี้เก็บ component ของ header ที่ใช้ร่วมกันในทุกหน้า

## ไฟล์ที่สำคัญ

### 1. `header-template.html`
โครงสร้าง header ทั้งหมด ประกอบด้วย:
- Hamburger menu (mobile)
- Header absolute (header โปร่งใส)
- Header sticky (header ที่ติดด้านบน)

**ไฟล์นี้จะถูกโหลดอัตโนมัติ** โดย `assets/js/header-loader.js`

### 2. `menu-navigation.html`
เมนูหลักที่แสดงบน header (ทั้ง desktop และ mobile)
- เมนู desktop: แสดงเป็นแถบบนหน้าจอใหญ่
- เมนู mobile: แสดงเป็น dropdown ในหน้าจอเล็ก

**วิธีแก้ไข:**
แก้ไขไฟล์นี้เพียงครั้งเดียว จะส่งผลกับ:
- Hamburger menu (mobile)
- Header absolute (header โปร่งใส)
- Header sticky (header ที่ติดด้านบน)

### 3. `menu-right-buttons.html`
ปุ่มด้านขวาของ header (ปุ่มเปลี่ยนภาษา + เมนูอื่นๆ)
- ปุ่มเปลี่ยนภาษา (TH/EN)
- ปุ่ม "เมนูอื่นๆ" พร้อม mega menu

**วิธีแก้ไข:**
แก้ไขไฟล์นี้เพียงครั้งเดียว จะส่งผลกับ header ทั้งหมด

## วิธีการทำงาน

ไฟล์ `assets/js/header-loader.js` จะโหลด component เหล่านี้แบบอัตโนมัติเมื่อหน้าเว็บโหลดเสร็จ

```javascript
// ลำดับการโหลด
1. โหลด header-template.html → แทรกเข้า #header-placeholder
2. โหลด menu-navigation.html → แทรกเข้า header ทั้ง 2 ที่
3. โหลด menu-right-buttons.html → แทรกเข้า header ทั้ง 2 ที่
4. Trigger event 'headersLoaded'
5. Initialize meanmenu, dropdown, mega-menu
```

## ตัวอย่างการแก้ไขเมนู

### เพิ่มเมนูใหม่

เปิดไฟล์ `menu-navigation.html` และเพิ่ม:

```html
<!-- สำหรับ desktop -->
<li class="menu-desktop"><a href="new-page.html">เมนูใหม่</a></li>

<!-- สำหรับ mobile -->
<li class="menu-mobile"><a href="new-page.html">เมนูใหม่</a></li>
```

### เพิ่มเมนูย่อย (dropdown)

```html
<li class="has-dropdown menu-mobile">
    <a href="javascript:void(0)">เมนูหลัก</a>
    <ul class="sub-menu">
        <li><a href="page1.html">เมนูย่อย 1</a></li>
        <li><a href="page2.html">เมนูย่อย 2</a></li>
    </ul>
</li>
```

### เปลี่ยน URL ของเมนู

แก้ไข `href` ในไฟล์ component:

```html
<!-- เดิม -->
<li><a href="javascript:void(0)">เกี่ยวกับเรา</a></li>

<!-- ใหม่ -->
<li><a href="about.html">เกี่ยวกับเรา</a></li>
```

## ข้อควรระวัง

1. **ต้องรันผ่าน web server** - ไม่สามารถเปิดไฟล์ HTML โดยตรง (file://) ได้
   - ใช้ Live Server extension ใน VS Code
   - หรือรัน local server: `python -m http.server 8000`

2. **Cache** - ถ้าแก้ไขแล้วไม่เห็นผล ให้ Refresh หน้าเว็บด้วย Ctrl+Shift+R (Windows) หรือ Cmd+Shift+R (Mac)

3. **Class สำคัญ:**
   - `.menu-desktop` - แสดงเฉพาะหน้าจอใหญ่
   - `.menu-mobile` - แสดงเฉพาะหน้าจอเล็ก
   - `.has-dropdown` - เมนูที่มีเมนูย่อย

## การนำไปใช้ในหน้าอื่น

เพียงเพิ่ม placeholder และ JavaScript ในหน้าใหม่:

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
    <!-- Header Placeholder - จะถูกโหลดจาก components/header-template.html -->
    <div id="header-placeholder"></div>

    <!-- เนื้อหาหน้าเว็บ -->
    <main>
        <!-- เนื้อหาของคุณ -->
    </main>

    <!-- JavaScript -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/meanmenu.js"></script>
    <script src="assets/js/header-loader.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/mega-menu-loader.js"></script>
</body>
</html>
```

**สำคัญ:** ต้องมี `<div id="header-placeholder"></div>` ในทุกหน้า

## Troubleshooting

### เมนูไม่แสดง
- ตรวจสอบว่ารันผ่าน web server
- เปิด Console (F12) ดู error
- ตรวจสอบว่าไฟล์ component อยู่ในโฟลเดอร์ `components/`

### เมนู mobile ไม่ทำงาน
- ตรวจสอบว่าโหลด `meanmenu.js` ก่อน `header-loader.js`
- ตรวจสอบว่ามี jQuery โหลดก่อน

### เมนูแสดงช้า
- เป็นเรื่องปกติ เพราะต้องโหลดจากไฟล์แยก
- ถ้าต้องการเร็วขึ้น ให้ใช้ build tool รวมไฟล์ก่อน deploy
