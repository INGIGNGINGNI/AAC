# คู่มือการจัดการ Header และ Footer แบบหลายภาษา

## โครงสร้างไฟล์

```
components/
├── header-template.html          (TH - header-1 สำหรับหน้าทั่วไป)
├── header-template-en.html       (EN - header-1 สำหรับหน้าทั่วไป)
├── header-home.html              (TH - header-2 template สำหรับ index.html)
├── header-home-en.html           (EN - header-2 template สำหรับ index-en.html)
├── menu-navigation.html          (TH - เมนูหลัก)
├── menu-navigation-en.html       (EN - เมนูหลัก)
├── menu-right-buttons.html       (TH - ปุ่มด้านขวา + mega menu)
├── menu-right-buttons-en.html    (EN - ปุ่มด้านขวา + mega menu)
├── mega-menu-content.html        (TH - เนื้อหา mega menu)
├── mega-menu-content-en.html     (EN - เนื้อหา mega menu)
├── footer-template.html          (TH - footer)
└── footer-template-en.html       (EN - footer)
```

## การทำงานของระบบ

### 1. หน้าที่ใช้ Dynamic Loading (history.html, about.html, etc.)
- JavaScript จะตรวจสอบชื่อไฟล์ว่ามี `-en.html` หรือไม่
- โหลดไฟล์ component ที่ถูกต้องตามภาษา
- ทุกอย่างทำงานอัตโนมัติ

### 2. หน้า index.html และ index-en.html
- ใช้ HTML แบบ inline (ไม่ใช้ dynamic loading สำหรับ header template)
- JavaScript จะโหลดเฉพาะเมนูเข้าไป
- ต้อง copy-paste จาก template เมื่อมีการแก้ไข

## วิธีการอัปเดตเมนู

### สถานการณ์: เพิ่มเมนูใหม่ "Products"

#### ขั้นตอนที่ 1: แก้ไขเมนูหลัก

**1.1 แก้ไข `menu-navigation.html` (TH):**
```html
<li class="menu-desktop"><a href="products.html">สินค้าของเรา</a></li>
```

**1.2 แก้ไข `menu-navigation-en.html` (EN):**
```html
<li class="menu-desktop"><a href="products-en.html">Our Products</a></li>
```

#### ขั้นตอนที่ 2: แก้ไขปุ่มด้านขวา (ถ้าต้องการ)

**2.1 แก้ไข `menu-right-buttons.html` (TH)**
**2.2 แก้ไข `menu-right-buttons-en.html` (EN)**

#### ขั้นตอนที่ 3: แก้ไข Mega Menu (ถ้าต้องการ)

**3.1 แก้ไข `mega-menu-content.html` (TH)**
**3.2 แก้ไข `mega-menu-content-en.html` (EN)**

#### ขั้นตอนที่ 4: อัปเดตหน้า index

**4.1 แก้ไข `header-home.html` (TH template):**
- เพิ่มเมนูใหม่ในไฟล์นี้

**4.2 Copy ไปวาง `index.html`:**
- เปิดไฟล์ `components/header-home.html`
- Copy ทั้งหมด
- Paste ไปแทนที่ใน `index.html` (บรรทัด 63-174)

**4.3 แก้ไข `header-home-en.html` (EN template):**
- เพิ่มเมนูใหม่ในไฟล์นี้

**4.4 Copy ไปวาง `index-en.html`:**
- เปิดไฟล์ `components/header-home-en.html`
- Copy ทั้งหมด
- Paste ไปแทนที่ใน `index-en.html`

#### ขั้นตอนที่ 5: ทดสอบ

1. เปิด `history.html` → ควรเห็นเมนูภาษาไทย
2. เปิด `history-en.html` → ควรเห็นเมนูภาษาอังกฤษ
3. เปิด `index.html` → ควรเห็นเมนูภาษาไทย
4. เปิด `index-en.html` → ควรเห็นเมนูภาษาอังกฤษ

## วิธีการอัปเดต Footer

### สถานการณ์: แก้ไขข้อมูลติดต่อ

**1. แก้ไข `footer-template.html` (TH)**
**2. แก้ไข `footer-template-en.html` (EN)**
**3. Refresh หน้าเว็บ** → ทุกหน้าจะอัปเดตอัตโนมัติ

## สรุปจำนวนไฟล์ที่ต้องแก้

| การเปลี่ยนแปลง | ไฟล์ที่ต้องแก้ | หมายเหตุ |
|---------------|--------------|---------|
| เพิ่ม/แก้เมนูหลัก | 6 ไฟล์ | menu-navigation (TH+EN), header-home (TH+EN), index.html, index-en.html |
| เพิ่ม/แก้ mega menu | 6 ไฟล์ | menu-right-buttons (TH+EN), header-home (TH+EN), index.html, index-en.html |
| แก้ไข footer | 2 ไฟล์ | footer-template (TH+EN) |
| แก้ไข layout header | 4 ไฟล์ | header-template (TH+EN), header-home (TH+EN) + copy-paste |

## Tips & Best Practices

### ✅ ควรทำ:
- แก้ไขที่ไฟล์ template ก่อนเสมอ
- ใช้ Find & Replace เพื่อความรวดเร็ว
- ทดสอบทั้ง TH และ EN หลังแก้ไข
- เก็บ template ไว้เป็นแหล่งอ้างอิง

### ❌ ไม่ควรทำ:
- แก้ไขใน index.html โดยตรงโดยไม่อัปเดต template
- ลืมแก้ไขทั้ง TH และ EN
- ลืม copy-paste ไปยัง index.html/index-en.html

## Troubleshooting

### ปัญหา: เมนูไม่แสดงในหน้า history-en.html
**วิธีแก้:** ตรวจสอบว่าไฟล์ `menu-navigation-en.html` มีอยู่และมีเนื้อหาถูกต้อง

### ปัญหา: เมนูใน index-en.html ยังเป็นภาษาไทย
**วิธีแก้:** ต้อง copy จาก `header-home-en.html` ไปวางใน `index-en.html`

### ปัญหา: Footer ไม่แสดงภาษาอังกฤษ
**วิธีแก้:** ตรวจสอบว่าไฟล์ `footer-template-en.html` มีอยู่และมีเนื้อหาถูกต้อง

## การตรวจสอบว่าระบบทำงานถูกต้อง

เปิด Browser Console (F12) และดูข้อความ:
- `Header Loader: Starting (th)...` หรือ `(en)...`
- `✓ Headers loaded successfully (th)` หรือ `(en)`
- `Footer Loader: Starting (th)...` หรือ `(en)...`
- `✓ Footer loaded successfully (th)` หรือ `(en)`

## ติดต่อ

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อทีม Development
