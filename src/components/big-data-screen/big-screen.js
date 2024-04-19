import * as echarts from 'echarts';
import { GET } from "@/http/index.js"

export const initMap = () => {

    let currentZLevel = 0;
    let chinese = null;
    let citys = null;
    let countys = null;
    let listData = null;

    const runMap = (data, center) => {
        myChart = echarts.init(chartDom);
        echarts.registerMap('chinese', data || chinese);

        let mapData = [];
        let linesData = [];

        if (currentZLevel == 0) {
            listData = [];
            chinese.features.forEach((elem) => {
                // 热力图
                listData.push({
                    name: elem.properties.name,
                    value: Math.floor(Math.random() * 100000)
                })
                // 散点图 
                // listData.push({
                //     name: elem.properties.name,
                //     value: elem.properties.center && elem.properties.center.concat(Math.floor(Math.random() * 100000))
                // });
                // 飞线图
                // if (elem.properties.center) {
                //     mapData.push({
                //         name: elem.properties.name,
                //         value: elem.properties.center && elem.properties.center.concat(Math.floor(Math.random() * 100000))
                //     });
                //     linesData.push({
                //         formName: elem.properties.name,
                //         toName: chinese.features[0].properties.name,
                //         coords: [elem.properties.center, chinese.features[0].properties.center]
                //     });
                // }
            });
        } else if (currentZLevel == 1) {
            citys.features.forEach((elem) => {
                listData.push({
                    name: elem.properties.name,
                    value: Math.floor(Math.random() * 100000)
                })
            });
        } else {
            countys.features.forEach((elem) => {
                listData.push({
                    name: elem.properties.name,
                    value: Math.floor(Math.random() * 100000)
                })
            });
        }

        option = {
            geo: {
                name: '车场数据分布图',
                type: 'map',
                map: 'chinese',
                roam: false,
                emphasis: {
                    label: {
                        show: true
                    },
                    itemStyle: {
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                        shadowBlur: 1
                    }
                },
                zoom: 1,
                center: center,
                data: []
            },
            title: {
                text: '车场数据分布图',
            },
            visualMap: {
                left: 'right',
                min: 0,
                max: 100000,
                inRange: {
                    color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                    ]
                },
                text: ['高', '低'],
                // show: false,
                calculable: true
            },
            tooltip: {
                trigger: 'item',
            },
            stateAnimation: {
                duration: 1000
            },
            series: [
                {
                    name: '车场数据分布图',
                    type: 'map',
                    map: 'chinese',
                    roam: false,
                    emphasis: {
                        label: {
                            show: true
                        },
                        itemStyle: {
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 1
                        }
                    },
                    zoom: 1,
                    center: center,
                    data: listData
                },
                // 飞线图
                // {
                //     name: "北京",
                //     type: 'lines',
                //     zlevel: 6,
                //     effect: {
                //         show: true,
                //         period: 5,
                //         trailLength: 0.1,
                //         symbol: 'arrow',
                //         color: '#fff',
                //         symbolSize: 6,
                //     },
                //     lineStyle: { // 映射了地图颜色后无法应用线 是合理的
                //         normal: {
                //             color: '#000',
                //             width: 1,
                //             type: 'solid',
                //         },
                //         emphasis: {
                //             color: '#000', // 高亮时的样式
                //         }
                //     },
                //     data: linesData
                // },
                // 波纹效果
                // {
                //     name: "北京",
                //     type: 'effectScatter',
                //     coordinateSystem: 'geo',
                //     zlevel: 0,
                //     rippleEffect: { //涟漪特效
                //         period: 5, //特效动画时长 
                //         scale: 4, //波纹的最大缩放比例
                //         brushType: 'stroke' //波纹的绘制方式：stroke | fill
                //     },
                //     label: {
                //         normal: {
                //             show: false,
                //             position: 'right',
                //             formatter: '{b}'
                //         }
                //     },
                //     symbol: 'circle',
                //     symbolSize: function (val) {
                //         console.log(val, "val")
                //         //根据某项数据值设置符号大小
                //         return val[2] / 10;
                //     },
                //     itemStyle: {
                //         normal: {
                //             color: '#f19000'
                //         }
                //     },
                //     data: listData.map(function (el) {
                //         return {
                //             name: el.formName,
                //             value: el.coords[0].concat([Math.floor(Math.random() * 100)])
                //         };
                //     })
                // }
            ]
        };

        myChart.setOption(option);
        myChart.hideLoading();
    };

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    myChart.showLoading();
    getChina().then((res) => {
        chinese = res.data;
        runMap(chinese);
    })

    myChart.on('dblclick', function (params) {
        let data = null;
        if (currentZLevel == 0) {
            myChart.showLoading();
            chinese && chinese.features.forEach((el) => {
                if (el.properties.name == params.name) {
                    let center = el.properties.center;
                    let adcode = el.properties.adcode;
                    data = el;
                    getProvince(adcode).then((res) => {
                        citys = res.data;
                        runMap(citys, center);
                    }).catch((res) => {
                        currentZLevel = 0;
                        myChart.hideLoading();
                    })
                }
            });
            currentZLevel = 1;
        } else if (currentZLevel == 1) {
            myChart.showLoading();
            citys && citys.features.forEach((el) => {
                if (el.properties.name == params.name) {
                    let center = el.properties.center;
                    let adcode = el.properties.adcode;
                    data = el;
                    getCitys(adcode).then((res) => {
                        countys = res.data;
                        runMap(countys, center);
                    }).catch((res) => {
                        currentZLevel = 1;
                        myChart.hideLoading();
                    })
                }
            });
            currentZLevel = 1.05;
        }

        if (!data) {
            myChart.hideLoading();
            return;
        }
    });

    chartDom.addEventListener('contextmenu', function (event) {
        if (currentZLevel == 1) {
            currentZLevel = 0;
            runMap(chinese, "");
        } else if (currentZLevel == 1.05) {
            currentZLevel = 1;
            runMap(citys, "");
        };
        event.preventDefault();
        return false;
    });
}


const getChina = () => {
    return GET("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
}
const getProvince = (adcode) => {
    return GET(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);
}
const getCounty = (adcode) => {
    return GET(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);
}
const getCitys = (adcode) => {
    return GET(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);
}