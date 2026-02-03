var dom = document.getElementById('echart_line_2022');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var option;

const colors = ['#99B3D6', '#124EA0', '#0D3772'];
option = {
    color: colors,
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross',
        }
    },
    legend: {
        orient: 'vertical', // จัดเรียงแนวตั้ง
        left: '1%', // ขยับ Legend ห่างจากกรอบซ้าย
        top: 'center', // ให้อยู่ตรงกลางแนวตั้ง
        itemGap: 25, // เพิ่มระยะห่างระหว่างไอเท็มใน Legend
        textStyle: {
            color: '#595959',
            fontFamily: 'Prompt, sans-serif',
            fontSize: 14,
            lineHeight: 20,
            rich: {
                roundedIcon: {
                    width: 20, // กำหนดขนาดสี่เหลี่ยม
                    height: 20,
                    backgroundColor: 'inherit', // ใช้สีเดียวกับซีรีส์
                    borderRadius: 3 // ขอบมน 3px
                }
            }
        },
        itemWidth: 20,
        itemHeight: 20,
        icon: 'roundRect' // ใช้ roundRect เพื่อให้รองรับ borderRadius
    },
    grid: {
        left: '33%', // เพิ่มระยะห่างระหว่าง Legend กับกราฟ
        top: '10%',
        bottom: '15%',
        right: '0%',
        width: '70%' // ปรับให้พื้นที่ของกราฟพอดีขึ้น
    },
    tooltip: {
        trigger: 'axis',
        textStyle: {
            color: '#595959',
            fontFamily: 'Prompt, sans-serif',
            fontSize: 14,
            lineHeight: 24,
        },
        formatter: function (params) {
            let result = 'ไตรมาสที่ ' + params[0].axisValue.replace('Q', '') + '<br/>';
            params.forEach(item => {
                result += item.marker + ' ' + item.seriesName + ' : ' + item.data + ' ล้านบาท' + '<br/>';
            });
            return result;
        },
        confine: true, // จำกัด tooltip ให้อยู่ในพื้นที่กราฟ
        extraCssText: 'max-width: 55%; white-space: normal;'
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        let quarterNumber = params.value.replace('Q', ''); // ตัด "Q" ออก
                        return (
                            'ไตรมาสที่ ' + quarterNumber
                        );
                    }
                }
            },
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true,
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} ลบ.',
                margin: 1,
                textStyle: {
                    color: '#888', // เปลี่ยนสีตัวอักษร
                    fontFamily: 'Prompt, sans-serif', // เปลี่ยนฟอนต์
                    fontSize: 12, // ขนาดตัวอักษร
                    fontWeight: 'normal', // น้ำหนักตัวอักษร
                }
            },
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            name: 'เงินสดจาก\nการดำเนินงาน',
            type: 'line',

            smooth: true,
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                width: 1 // ปรับความหนาของเส้นเป็น 4px
            },
            data: [11, 38, 31, 40]
        },
        {
            name: 'เงินสดจาก\nการลงทุน',
            type: 'line',
            smooth: true,
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                width: 1 // ปรับความหนาของเส้นเป็น 4px
            },
            data: [35, 41, 35, 33]
        },
        {
            name: 'เงินสดจาก\nด้านการเงิน',
            type: 'line',
            smooth: true,
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                width: 1 // ปรับความหนาของเส้นเป็น 4px
            },
            data: [40, 45, 53, 47]
        }
    ]
};

// ฟังก์ชันปรับเลย์เอาต์ให้เหมาะสมกับขนาดหน้าจอ
function adjustLayout() {

    if (window.innerWidth < 486) {
        option.grid.top = '50%';

        option.legend.orient = 'horizontal'; // เปลี่ยน legend ให้เรียงเป็นแนวนอน
        option.legend.left = 'center'; // จัด legend ให้อยู่กลาง
        option.legend.bottom = '10%'; // ปรับตำแหน่ง bottom
        option.legend.top = '10%';
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 15;
        option.legend.itemGap = 20;

        // ปรับ grid เมื่อขนาดหน้าจอเล็กกว่า 575px
        option.grid.left = '0%'; // ปรับตำแหน่ง left เป็น 50%
        option.grid.right = '0%';
        option.grid.top = '48%';
        option.grid.bottom = '0%';
        option.grid.width = '100%';

        option.tooltip.extraCssText = 'max-width: 100%; white-space: normal;';


    } else if (window.innerWidth < 576) {
        option.legend.orient = 'horizontal'; // เปลี่ยน legend ให้เรียงเป็นแนวนอน
        option.legend.left = 'center'; // จัด legend ให้อยู่กลาง
        option.legend.bottom = '10%'; // ปรับตำแหน่ง bottom
        option.legend.top = '10%';
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 15;
        option.legend.itemGap = 20;

        // ปรับ grid เมื่อขนาดหน้าจอเล็กกว่า 575px
        option.grid.left = '0%'; // ปรับตำแหน่ง left เป็น 50%
        option.grid.right = '0%';
        option.grid.top = '30%';
        option.grid.bottom = '0%';
        option.grid.width = '100%';

        // ปรับ tooltip ให้กว้าง 80% เมื่อหน้าจอเล็ก
        option.tooltip.extraCssText = 'max-width: 100%; white-space: normal;';

    } else {
        option.legend.orient = 'vertical'; // เปลี่ยน legend ให้เรียงเป็นแนวตั้ง
        option.legend.left = '1%'; // กลับไปที่เดิม
        option.legend.bottom = '0%'; // กลับไปที่เดิม

        // ปรับ tooltip กลับไปเป็นค่าเดิม
        option.tooltip.extraCssText = 'max-width: 55%; white-space: normal;';

        option.grid.top = '10%';
    }

    myChart.setOption(option); // อัพเดทการตั้งค่าใหม่
}

// เรียกใช้ฟังก์ชัน adjustLayout เมื่อขนาดหน้าจอเปลี่ยนแปลง
adjustLayout();
window.addEventListener('resize', adjustLayout);

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
