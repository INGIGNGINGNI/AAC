# IR Header Setup Guide

## ภาพรวม

ระบบ header สำหรับหน้านักลงทุนสัมพันธ์ (IR) ถูกแยกออกจาก header หลักเพื่อให้สามารถจัดการเมนูและเนื้อหาได้อิสระ

## โครงสร้างไฟล์

### ไฟล์ Header IR (ใหม่)
```
components/
├── header-ir-template.html          ← Header IR (ภาษาไทย)
├── header-ir-template-en.html       ← Header IR (ภาษาอังกฤษ)
├── menu-navigation-ir.html          ← เมนูหลัก IR (ภาษาไทย)
├── menu-navigation-ir-en.html       ← เมนูหลัก IR (ภาษาอังกฤษ)
├── menu-right-buttons-ir.html       ← ปุ่มด้านขวา IR (ภาษาไทย)
├── menu-right-buttons-ir-en.html    ← ปุ่มด้านขวา IR (ภาษาอังกฤษ)
├── mega-menu-content-ir.html        ← Mega Menu IR (ภาษาไทย)
└── mega-menu-content-ir-en.html     ← Mega Menu IR (ภาษาอังกฤษ)
```

### ไฟล์ Header หลัก (เดิม)
```
components/
├── header-template.html             ← Header หลัก (ภาษาไทย)
├── header-template-en.html          ← Header หลัก (ภาษาอังกฤษ)
├── menu-navigation.html             ← เมนูหลัก (ภาษาไทย)
├── menu-navigation-en.html          ← เมนูหลัก (ภาษาอังกฤษ)
├── menu-right-buttons.html          ← ปุ่มด้านขวา (ภาษาไทย)
├── menu-right-buttons-en.html       ← ปุ่มด้านขวา (ภาษาอังกฤษ)
├── mega-menu-content.html           ← Mega Menu หลัก (ภาษาไทย)
└── mega-menu-content-en.html        ← Mega Menu หลัก (ภาษาอังกฤษ)
```

## เมนู IR

### เมนูหลัก (Desktop)
1. กลับสู่หน้าหลักเว็บไซต์
2. ปฏิทินนักลงทุนสัมพันธ์
3. ข้อมูลสำหรับการลงทุน
4. เอกสารเผยแพร่
5. ข้อมูลผู้ถือหุ้น
6. ข้อมูลราคาหลักทรัพย์
7. ติดต่อนักลงทุนสัมพันธ์

### เมนูย่อย (Mobile)

#### ข้อมูลสำหรับการลงทุน
- ข้อมูลทั่วไป
- โครงสร้างผู้ถือหุ้น
- คณะกรรมการบริษัท
- ผู้บริหาร
- ข้อมูลหลักทรัพย์

#### เอกสารเผยแพร่
- งบการเงิน
- รายงานประจำปี
- แบบ 56-1 One Report
- นโยบายและเอกสารอื่นๆ
- นำเสนอต่อนักลงทุน

#### ข้อมูลผู้ถือหุ้น
- การประชุมผู้ถือหุ้น
- นโยบายการจ่ายเงินปันผล
- ข้อมูลสิทธิผู้ถือหุ้น

### ปุ่มเมนูอื่นๆ
เมื่อคลิกปุ่ม "เมนูอื่นๆ" จะแสดงเมนู IR ทั้งหมดในรูปแบบ mega menu

## การทำงานของระบบ

### 1. ตรวจสอบประเภทหน้า
`header-loader.js` จะตรวจสอบว่าหน้าปัจจุบันเป็นหน้า IR หรือไม่โดยดูจาก URL:

```javascript
const isIRPage = currentPath.includes('investor');
```

### 2. โหลด Header Template
- **หน้า IR**: โหลด `header-ir-template.html` หรือ `header-ir-template-en.html`
- **หน้าหลัก**: โหลด `header-template.html` หรือ `header-template-en.html`

### 3. โหลดเมนู
- **หน้า IR**: โหลด `menu-navigation-ir.html` และ `menu-right-buttons-ir.html`
- **หน้าหลัก**: โหลด `menu-navigation.html` และ `menu-right-buttons.html`

### 4. รองรับหลายภาษา
ระบบจะตรวจสอบภาษาจากชื่อไฟล์ (`-en.html`) และโหลดไฟล์ที่ตรงกับภาษานั้น

### 5. โหลด Mega Menu
- **หน้า IR**: โหลด `mega-menu-content-ir.html` หรือ `mega-menu-content-ir-en.html`
- **หน้าหลัก**: โหลด `mega-menu-content.html` หรือ `mega-menu-content-en.html`

## Mega Menu IR

### เมนูหลักใน Mega Menu
1. หน้าหลักนักลงทุนสัมพันธ์
2. ข้อมูลทางการเงิน
3. เอกสารเผยแพร่
4. ข้อมูลผู้ถือหุ้น
5. ข้อมูลราคาหลักทรัพย์
6. ติดต่อนักลงทุนสัมพันธ์

### เมนูย่อย

#### ข้อมูลทางการเงิน (Financial Information)
- งบการเงิน
- ข้อมูลสำคัญทางการเงิน
- คำอธิบายและการวิเคราะห์
- สุขภาพหุ้น

#### เอกสารเผยแพร่ (Publications)
- แบบ 56-1 One Report
- หนังสือชี้ชวน
- ศูนย์รวมเอกสารเผยแพร่

#### ข้อมูลผู้ถือหุ้น (Shareholder Information)
- การประชุมผู้ถือหุ้น
- โครงสร้างผู้ถือหุ้น
- นโยบายและประวัติการจ่ายเงินปันผล
- ปฏิทินกิจกรรมนักลงทุนสัมพันธ์
- ข้อมูลนำเสนอแบบบัตคัมมี่เดีย
- บทวิเคราะห์
- สรุปข้อสนเทศ

#### ข้อมูลราคาหลักทรัพย์ (Stock Information)
- ราคาหลักทรัพย์ล่าสุด
- ราคาหลักทรัพย์ย้อนหลัง
- เครื่องคำนวณการลงทุน

## การใช้งาน

### หน้า IR ปัจจุบัน
- `investor.html` (ภาษาไทย)

### หน้า IR ที่จะสร้างในอนาคต
- `investor-en.html` (ภาษาอังกฤษ)
- หน้าย่อยอื่นๆ ที่มี URL ประกอบด้วยคำว่า "investor"

### ไม่ต้องแก้ไขอะไรในหน้า HTML
ระบบจะโหลด header IR อัตโนมัติเมื่อตรวจพบว่าเป็นหน้า IR

## การแก้ไขเมนู

### แก้ไขเมนู IR
แก้ไขไฟล์ในโฟลเดอร์ `components/`:
- `menu-navigation-ir.html` (เมนูหลัก - ไทย)
- `menu-navigation-ir-en.html` (เมนูหลัก - อังกฤษ)
- `menu-right-buttons-ir.html` (ปุ่มด้านขวา - ไทย)
- `menu-right-buttons-ir-en.html` (ปุ่มด้านขวา - อังกฤษ)
- `mega-menu-content-ir.html` (Mega Menu - ไทย)
- `mega-menu-content-ir-en.html` (Mega Menu - อังกฤษ)

### แก้ไขเมนูหลัก
แก้ไขไฟล์:
- `menu-navigation.html` (เมนูหลัก - ไทย)
- `menu-navigation-en.html` (เมนูหลัก - อังกฤษ)
- `menu-right-buttons.html` (ปุ่มด้านขวา - ไทย)
- `menu-right-buttons-en.html` (ปุ่มด้านขวา - อังกฤษ)
- `mega-menu-content.html` (Mega Menu - ไทย)
- `mega-menu-content-en.html` (Mega Menu - อังกฤษ)

## การทดสอบ

### ทดสอบหน้า IR
1. เปิด `investor.html`
2. ตรวจสอบว่าเมนูแสดงเมนู IR (กลับสู่หน้าหลัก, ปฏิทินนักลงทุน, ฯลฯ)
3. คลิกปุ่ม "เมนูอื่นๆ" ตรวจสอบว่าแสดงเมนู IR

### ทดสอบหน้าหลัก
1. เปิด `index.html` หรือ `history.html`
2. ตรวจสอบว่าเมนูแสดงเมนูหลัก (เกี่ยวกับเรา, ธุรกิจของเรา, ฯลฯ)
3. คลิกปุ่ม "เมนูอื่นๆ" ตรวจสอบว่าแสดงเมนูหลัก

### ทดสอบการสลับภาษา
1. คลิกปุ่มสลับภาษา TH/EN
2. ตรวจสอบว่าเมนูเปลี่ยนภาษาถูกต้อง

## หมายเหตุ

- ไฟล์ `header-loader.js` ได้รับการปรับปรุงให้รองรับหน้า IR อัตโนมัติ
- ไฟล์ `mega-menu-loader.js` ได้รับการปรับปรุงให้โหลด mega menu IR อัตโนมัติ
- ไม่ต้องแก้ไขโค้ดในหน้า HTML เพิ่มเติม
- ระบบจะตรวจสอบและโหลด header และ mega menu ที่เหมาะสมโดยอัตโนมัติ
- การแก้ไขเมนู IR จะไม่กระทบเมนูหลัก และในทางกลับกัน

## รายการไฟล์ทั้งหมดที่สร้างสำหรับ IR

```
components/
├── header-ir-template.html          ✨ สร้างใหม่
├── header-ir-template-en.html       ✨ สร้างใหม่
├── menu-navigation-ir.html          ✨ สร้างใหม่
├── menu-navigation-ir-en.html       ✨ สร้างใหม่
├── menu-right-buttons-ir.html       ✨ สร้างใหม่
├── menu-right-buttons-ir-en.html    ✨ สร้างใหม่
├── mega-menu-content-ir.html        ✨ สร้างใหม่
└── mega-menu-content-ir-en.html     ✨ สร้างใหม่
```

**รวม 8 ไฟล์**

## วันที่สร้าง
3 กุมภาพันธ์ 2026
