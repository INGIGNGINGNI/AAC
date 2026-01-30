document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".partner-wrapper");
    const toggleBtn = document.querySelector(".partner-container .text-btn");
    const overlay = document.querySelector(".partners-gradient-overlay");
    const container = document.querySelector(".partner-container");

    if (!wrapper) {
        console.error("ไม่พบ element .partner-wrapper");
        return;
    }

    fetch("assets/data/partner.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(brands => {
            brands.forEach(brand => {
                const item = document.createElement("div");
                item.className = "partner-item";

                item.innerHTML = `
          <div class="product-image">
            <img src="${brand.logo}" alt="${brand.name}" loading="lazy">
          </div>
        `;

                wrapper.appendChild(item);
            });

            // เพิ่มฟังก์ชันหุบ-ขยาย
            if (toggleBtn) {
                toggleBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const isCollapsed = container.classList.contains("collapsed");
                    const btnText = toggleBtn.querySelector(".btn-text span");
                    const btnIcon = toggleBtn.querySelector(".btn-icon span");

                    if (isCollapsed) {
                        // ขยาย
                        overlay.style.opacity = "0";
                        setTimeout(() => {
                            container.classList.remove("collapsed");
                        }, 50);
                        btnText.textContent = "แสดงน้อยลง";
                        btnIcon.textContent = "arrow_upward";
                    } else {
                        // หุบ
                        container.classList.add("collapsed");
                        btnText.textContent = "แสดงทั้งหมด";
                        btnIcon.textContent = "arrow_downward";
                        
                        // Scroll กลับไปด้านบนของ section อย่างนุ่มนวล
                        setTimeout(() => {
                            overlay.style.opacity = "1";
                            const section = document.querySelector(".tj-partner-section");
                            if (section) {
                                const sectionTop = section.offsetTop - 100;
                                window.scrollTo({
                                    top: sectionTop,
                                    behavior: "smooth"
                                });
                            }
                        }, 100);
                    }
                });

                // ตั้งค่าเริ่มต้นเป็นหุบ
                container.classList.add("collapsed");
            }
        })
        .catch(err => {
            console.error("โหลด partner ไม่สำเร็จ", err);
        });
});
