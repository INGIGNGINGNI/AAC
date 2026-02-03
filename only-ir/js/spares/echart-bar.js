// -------------------------------------------------------------ฟังก์ชันสร้างกราฟสำหรับแต่ละปี
function createChart(year, data) {
    var dom = document.getElementById('echart_' + year);
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    
    // ฟังก์ชันสร้าง option สำหรับกราฟ
    function createOption() {
        return {
            title: {
                text: 'สรุปภาพรวมกิจการ\nของบริษัทในปี {year|' + (year + 543) + '}',
                subtext: 'หน่วย: ล้านบาท',
                left: 'left',
                bottom: '70%',
                textStyle: {
                    color: '#8C8C8C',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: 16,
                    fontWeight: 'normal',
                    lineHeight: 22,
                    rich: {
                        year: {
                            color: '#262626',
                            fontFamily: 'Prompt, sans-serif',
                            fontSize: 16,
                            fontWeight: 'normal',
                        }
                    }
                },
                subtextStyle: {
                    color: '#595959',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: 14,
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    let content = params.map(item => 
                        `${item.seriesName} : ${item.value.toLocaleString()}`
                    ).join('<br/>');
                    return content;
                }
            },
            legend: {
                orient: 'vertical',
                left: '0%',
                bottom: '5%',
                textStyle: {
                    color: '#595959',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: 14
                },
                itemWidth: 22,
                itemHeight: 22,
                itemGap: 16,
                data: ['รายได้', 'สินทรัพย์', 'หนี้สิน', 'ส่วนของผู้ถือหุ้น']
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: true,
                width: '87.5%',
            },
            xAxis: {
                type: 'category',
                data: [],
                show: false
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [
                {
                    name: 'รายได้',
                    type: 'bar',
                    label: { 
                        show: true, 
                        position: 'top',
                        formatter: params => params.value.toLocaleString()
                    },
                    itemStyle: { 
                        color: '#0D3772', 
                        borderRadius: [8, 8, 8, 8] 
                    },
                    data: data['รายได้']
                },
                {
                    name: 'สินทรัพย์',
                    type: 'bar',
                    label: { 
                        show: true, 
                        position: 'top',
                        formatter: params => params.value.toLocaleString()
                    },
                    itemStyle: { 
                        color: '#99B3D6',
                        borderRadius: [8, 8, 8, 8] 
                    },
                    data: data['สินทรัพย์']
                },
                {
                    name: 'หนี้สิน',
                    type: 'bar',
                    label: { 
                        show: true, 
                        position: 'top',
                        formatter: params => params.value.toLocaleString()
                    },
                    itemStyle: { 
                        color: '#124EA0', 
                        borderRadius: [8, 8, 8, 8] 
                    },
                    data: data['หนี้สิน']
                },
                {
                    name: 'ส่วนของผู้ถือหุ้น',
                    type: 'bar',
                    label: { 
                        show: true, 
                        position: 'top',
                        formatter: params => params.value.toLocaleString()
                    },
                    itemStyle: { 
                        color: '#082348', 
                        borderRadius: [8, 8, 8, 8] 
                    },
                    data: data['ส่วนของผู้ถือหุ้น']
                }
            ]
        };
    }

    // ฟังก์ชันปรับเลย์เอาต์ให้เหมาะสมกับขนาดหน้าจอ
    function adjustLayout() {
        var option = createOption();
        
        if (window.innerWidth < 486) {
            option.title.left = 'center'; // จัด title ให้อยู่กลาง
            option.title.top = '15%';
            option.title.bottom = 'auto'; // ปรับตำแหน่ง bottom
            option.title.text = 'สรุปภาพรวมกิจการของบริษัทในปี {year|2567}';
            option.title.textStyle.fontSize= 15;

            option.legend.orient = 'horizontal'; // เปลี่ยน legend ให้เรียงเป็นแนวนอน
            option.legend.left = 'center'; // จัด legend ให้อยู่กลาง
            option.legend.bottom = '50%'; // ปรับตำแหน่ง bottom
            option.legend.top = '40%';
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 15;
            option.legend.itemGap= 10;

            // ปรับ grid เมื่อขนาดหน้าจอเล็กกว่า 575px
            option.grid.left = '0%'; // ปรับตำแหน่ง left เป็น 50%
            option.grid.right = '0%'; 
            option.grid.top = '65%';
            option.grid.bottom = '0%';
    
        } else if (window.innerWidth < 576) {
            option.title.left = 'center'; // จัด title ให้อยู่กลาง
            option.title.top = '15%';
            option.title.bottom = 'auto'; // ปรับตำแหน่ง bottom
            option.title.text = 'สรุปภาพรวมกิจการของบริษัทในปี {year|2567}';

            option.legend.orient = 'horizontal'; // เปลี่ยน legend ให้เรียงเป็นแนวนอน
            option.legend.left = 'center'; // จัด legend ให้อยู่กลาง
            option.legend.bottom = '50%'; // ปรับตำแหน่ง bottom
            option.legend.top = '40%';
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 15;
            option.legend.itemGap= 10;

            // ปรับ grid เมื่อขนาดหน้าจอเล็กกว่า 575px
            option.grid.left = '0%'; // ปรับตำแหน่ง left เป็น 50%
            option.grid.right = '0%'; 
            option.grid.top = '60%';
            option.grid.bottom = '0%';
            option.grid.width = '95%';

        } else {
            option.title.bottom = '70%'; // ปรับตำแหน่ง bottom
            option.legend.orient = 'vertical'; // เปลี่ยน legend ให้เรียงเป็นแนวตั้ง
            option.legend.left = '0%'; // กลับไปที่เดิม
            option.legend.bottom = '5%'; // กลับไปที่เดิม

            // กลับค่าของ grid เป็นปกติ
            option.grid.left = '20%'; // กลับตำแหน่ง left เป็น 20%
            option.grid.right = '0%';
        }
        
        myChart.setOption(option, true); // อัพเดทการตั้งค่าใหม่
    }

    // เริ่มต้นสร้างกราฟ
    adjustLayout();
    
    // ฟังก์ชัน debounce เพื่อป้องกันการเรียก resize บ่อยเกินไป
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ใช้ debounce สำหรับ resize event
    const debouncedResize = debounce(function() {
        myChart.resize();
        adjustLayout();
    }, 250);

    // เพิ่ม event listener สำหรับ resize
    window.addEventListener('resize', debouncedResize);
    
    // เพิ่ม event listener สำหรับ orientation change (สำหรับมือถือ)
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            myChart.resize();
            adjustLayout();
        }, 500);
    });

    // ส่งคืน chart instance และ function สำหรับการจัดการ
    return {
        chart: myChart,
        resize: function() {
            myChart.resize();
            adjustLayout();
        },
        destroy: function() {
            window.removeEventListener('resize', debouncedResize);
            myChart.dispose();
        }
    };
}

// ข้อมูลที่ใช้สำหรับปีต่างๆ
var data2024 = {
    'รายได้': [3552.00],
    'สินทรัพย์': [5182.00],
    'หนี้สิน': [3104.00],
    'ส่วนของผู้ถือหุ้น': [2162.00]
};

var data2023 = {
    'รายได้': [1200.00],
    'สินทรัพย์': [2300.00],
    'หนี้สิน': [1500.00],
    'ส่วนของผู้ถือหุ้น': [2100.00]
};

var data2022 = {
    'รายได้': [2200.00],
    'สินทรัพย์': [3500.00],
    'หนี้สิน': [3000.00],
    'ส่วนของผู้ถือหุ้น': [2100.00]
};

// เก็บ chart instances ไว้สำหรับการจัดการ
var chartInstances = {};

// สร้างกราฟสำหรับแต่ละปี
chartInstances['2024'] = createChart(2024, data2024);
chartInstances['2023'] = createChart(2023, data2023);
chartInstances['2022'] = createChart(2022, data2022);

// เพิ่มกราฟสำหรับปีอื่นๆ ตามที่ต้องการ

// -------------------------------------------------------------ฟังก์ชันรีเฟรขกราฟให้เปิดทุกแท็บ
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('input[name="tabs"]');
    const tabContents = [
        document.getElementById('tab__content--1'),
        document.getElementById('tab__content--2'),
        document.getElementById('tab__content--3')
    ];
    const tabIds = ['tab1', 'tab2', 'tab3'];
    const chartKeys = ['2024', '2023', '2022'];

    // ฟังก์ชันแสดงกราฟและ content ตามแท็บที่เลือก
    const showGraph = (tabIndex) => {
        tabContents.forEach((content, idx) => {
            if (idx === tabIndex) {
                content.style.display = 'block';
                setTimeout(() => {
                    chartInstances[chartKeys[idx]].resize();
                }, 20);
            } else {
                content.style.display = 'none';
            }
        });
    };

    // ตั้งค่าเมื่อเลือกแท็บ
    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', function() {
            tabs.forEach(otherTab => {
                otherTab.checked = false;
            });
            tab.checked = true;
            showGraph(idx);
        });
    });

    // เริ่มต้นแสดงกราฟในแท็บที่เปิดอยู่
    let initialTabIndex = tabIds.findIndex(id => document.getElementById(id).checked);
    if (initialTabIndex === -1) initialTabIndex = 0;
    showGraph(initialTabIndex);

    // เพิ่ม global function สำหรับการจัดการ responsive
    window.handleChartResize = function() {
        Object.keys(chartInstances).forEach(key => {
            chartInstances[key].resize();
        });
    };
});