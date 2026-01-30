# Language Switcher Documentation

## ภาพรวม
ระบบเปลี่ยนภาษาสำหรับเว็บไซต์ AAC รองรับ 2 ภาษา: ไทย (TH) และอังกฤษ (EN)

## โครงสร้างไฟล์

### 1. JavaScript
- **ไฟล์:** `assets/js/language-switcher.js`
- **หน้าที่:** ตรวจสอบภาษาปัจจุบันและสร้างลิงก์ไปยังภาษาตรงข้าม

### 2. HTML Components
- **Desktop Menu:** `components/menu-right-buttons.html`
- **Mobile Menu:** `components/header-template.html` (ส่วน hamburger-language)

### 3. CSS
- **ไฟล์:** `assets/css/custom-style.css`
- **หน้าที่:** จัดการ active state และ hover effects

## รูปแบบการตั้งชื่อไฟล์

### ภาษาไทย (Default)
```
filename.html
```
ตัวอย่าง: `index.html`, `about.html`, `contact.html`

### ภาษาอังกฤษ
```
filename-en.html
```
ตัวอย่าง: `index-en.html`, `about-en.html`, `contact-en.html`

## วิธีการทำงาน

### 1. ตรวจสอบภาษาปัจจุบัน
สคริปต์จะอ่าน URL ของหน้าปัจจุบันและตรวจสอบว่าลงท้ายด้วย `-en.html` หรือไม่

```javascript
if (currentFile.endsWith('-en.html')) {
    // หน้าปัจจุบันเป็นภาษาอังกฤษ
    currentLang = 'EN';
    alternateUrl = currentFile.replace('-en.html', '.html');
} else {
    // หน้าปัจจุบันเป็นภาษาไทย
    currentLang = 'TH';
    alternateUrl = currentFile.replace('.html', '-en.html');
}
```

### 2. อัพเดทลิงก์
สคริปต์จะอัพเดทลิงก์ทั้ง 2 ตำแหน่ง:
- **Desktop:** Dropdown menu ในส่วน header
- **Mobile:** Hamburger menu

### 3. Active State
- ภาษาปัจจุบันจะมี class `active`
- ลิงก์ของภาษาปัจจุบันจะเป็น `javascript:void(0)` (ไม่สามารถคลิกได้)
- ลิงก์ของภาษาตรงข้ามจะเป็น URL ของหน้าภาษานั้น

## การติดตั้ง

### สำหรับไฟล์ HTML ใหม่
เพิ่มสคริปต์ก่อน `</body>`:

```html
<script src="assets/js/language-switcher.js"></script>
</body>
```

### ไฟล์ที่ติดตั้งแล้ว
✅ ไฟล์ HTML ทั้งหมดในโปรเจคได้รับการติดตั้งแล้ว

## การสร้างหน้าใหม่

### ขั้นตอนที่ 1: สร้างหน้าภาษาไทย
```
example.html
```

### ขั้นตอนที่ 2: สร้างหน้าภาษาอังกฤษ
```
example-en.html
```

### ขั้นตอนที่ 3: เพิ่มสคริปต์
ตรวจสอบว่าทั้ง 2 ไฟล์มีการโหลด `language-switcher.js` ก่อน `</body>`

## CSS Classes

### Desktop Menu
```css
.header-menu-button .language-switcher .sub-menu li a.active {
    color: var(--tj-color-theme-primary);
    font-weight: var(--tj-fw-medium);
    pointer-events: none;
}
```

### Mobile Menu
```css
.hamburger-language .language-links ul li.active a {
    color: var(--tj-color-theme-primary);
    font-weight: var(--tj-fw-medium);
    pointer-events: none;
}
```

## การทดสอบ

### 1. ทดสอบบนหน้าภาษาไทย
- เปิด `index.html`
- ตรวจสอบว่าปุ่มแสดง "TH"
- คลิก dropdown และตรวจสอบว่า "TH" มี active state
- คลิก "EN" เพื่อไปยัง `index-en.html`

### 2. ทดสอบบนหน้าภาษาอังกฤษ
- เปิด `index-en.html`
- ตรวจสอบว่าปุ่มแสดง "EN"
- คลิก dropdown และตรวจสอบว่า "EN" มี active state
- คลิก "TH" เพื่อกลับไปยัง `index.html`

### 3. ทดสอบบน Mobile
- เปิด hamburger menu
- ตรวจสอบ active state ของภาษาปัจจุบัน
- คลิกเปลี่ยนภาษา

## Troubleshooting

### ปัญหา: ลิงก์ไม่ทำงาน
**แก้ไข:** ตรวจสอบว่าไฟล์ภาษาตรงข้ามมีอยู่จริง

### ปัญหา: Active state ไม่แสดง
**แก้ไข:** ตรวจสอบว่า CSS ถูกโหลดหลังจาก `custom-style.css`

### ปัญหา: สคริปต์ไม่ทำงาน
**แก้ไข:** 
1. ตรวจสอบว่า `language-switcher.js` ถูกโหลดหลังจาก `jquery.min.js`
2. เปิด Console ใน Browser เพื่อดู error messages

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes
- ระบบจะ default เป็นภาษาไทยเสมอ (ไฟล์ที่ไม่มี `-en` ในชื่อ)
- ไฟล์ที่มี pattern พิเศษ เช่น `index-1.html`, `index-rtl.html` จะไม่ถูกจัดการโดยระบบนี้
- สคริปต์ทำงานอัตโนมัติเมื่อหน้าเว็บโหลดเสร็จ (DOMContentLoaded)
