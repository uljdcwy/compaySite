// @ts-ignore
import logo from "@public/logo.png";
// @ts-ignore
import banner1 from "@public/banner1.jpg";
// @ts-ignore
import banner2 from "@public/banner2.jpg";
// @ts-ignore
import banner3 from "@public/banner3.jpg";


 const data = {
    zh: {
        vueFooter: {
            Filing: `©2022 xxxxxxxx有限公司 版权所有 备案号：粤ICP备xxxxxx号 技术支持：<a href="javascript:;">曾细亚</a>`,
            telTips: "24小时服务热线",
            tel: "15827328113",
            logoUrl: logo,
            navTips: "致力于打造人工智能智慧生活",
            homeLink: "",
            homeText: "首页",
            telText: "电话资询",
            goTopText: "置顶",
            searchPlaceholder: "请输入搜索关键词",
            searchText: "搜索",
            logoAlt: "提示alt",
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "首页",
                    link: ""
                },
                {
                    title: "产品中心",
                    link: ""
                },
                {
                    title: "解决方案",
                    link: ""
                },
                {
                    title: "工程案例",
                    link: ""
                },
                {
                    title: "品牌介绍",
                    link: ""
                },
                {
                    title: "新闻资讯",
                    link: ""
                }
            ]))
        },
        vueHeader: {
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "首页",
                    link: "/?lang=zh",
                    name: "",
                    query: { lang: 'zh' },
                },
                {
                    title: "产品中心",
                    link: "/products",
                    name: "products",
                    query: { lang: 'zh' },
                    childList: [
                        {
                            title: "标题",
                            icon: "",
                            childNav: [
                                {
                                    title: "标题",
                                    link: ""
                                },
                                {
                                    title: "子路由",
                                    link: ""
                                }]
                        },
                        {
                            title: "标题",
                            icon: "",
                            childNav: [
                                {
                                    title: "标题",
                                    link: ""
                                },
                                {
                                    title: "子路由",
                                    link: ""
                                }]
                        },
                        {
                            title: "标题",
                            icon: "",
                            childNav: [
                                {
                                    title: "标题",
                                    link: ""
                                },
                                {
                                    title: "子路由",
                                    link: ""
                                }]
                        }

                    ]
                },
                {
                    title: "解决方案",
                    link: "/solution?lang=zh",
                    name: "",
                    query: { lang: 'zh' }
                },
                {
                    title: "车场模型",
                    link: "/parkingLot?lang=zh",
                    name: "",
                    query: { lang: 'zh' }
                },
                {
                    title: "品牌介绍",
                    link: "/drawText?lang=zh",
                    name: "",
                    query: { lang: 'zh' }
                },
                {
                    title: "关于我们",
                    link: "about?lang=zh"
                }
            ])),
            tel: "0755-23646330",
            logoUrl: logo,
            searchPlaceholder: "请输入搜索关键词",
        },
        vueProducts: {
            title: "产品中心",
            list: encodeURIComponent(JSON.stringify([
                {
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    title: "测试内容标题",
                    link: "/article",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },
            ])),
        },
        vueIndex: {
            title: '标题',
            author: ' 曾细亚',
            keywords: '细亚',
            description: '内容块加内容显示',
            countblock: encodeURIComponent(JSON.stringify([{
                countNum: 10,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "年",
                describe: "这是一个描述，描述的内容是自定义内容。",
            }, {
                countNum: 50,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "年",
                describe: "这是一个描述，描述的内容是自定义内容。",
            }, {
                countNum: 80,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "年",
                describe: "这是一个描述，描述的内容是自定义内容。",
            }, {
                countNum: 100,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "年",
                describe: "这是一个描述，描述的内容是自定义内容。",
            }])),
            bannerblock: encodeURIComponent(JSON.stringify([
                {
                    alt: "测试图片",
                    src: banner1,
                },
                {
                    alt: "测试地址",
                    src: banner2,
                },
                {
                    alt: "测试路径",
                    src: banner3,
                }
            ]))
        },
        vueAbout: {
            "title": "关于我们",
            "author": "块",
            "keywords": "块",
            "description": "块",
            "mainblock": {
                "title": "标题",
                "QRCode1": "1705290359821.jpg",
                "QRCode2": "1705290361711.jpg",
                "mainInfo": "主要信息",
                "QRCode1Tip": "二维码描述1",
                "QRCode2Tip": "二维码描述2",
                "welcomeDescribe": "欢迎描述"
            }
        }
    },
    en: {
        vueFooter: {
            Filing: `Co., Ltd. All rights reserved Registration number: Guangdong ICP No. xxxxxx Technical support：<a href="javascript:;">Zeng Xiya</a>`,
            telTips: "24-hour service hotline",
            tel: "15827328113",
            logoUrl: logo,
            navTips: "Committed to creating a smart life with artificial intelligence",
            homeLink: "",
            homeText: "home",
            telText: "tel talk",
            goTopText: "go top",
            logoAlt: "tip alt",
            searchPlaceholder: "Enter search keywords",
            searchText: "search",
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "home",
                    link: ""
                },
                {
                    title: "Product Center",
                    link: ""
                },
                {
                    title: "solution",
                    link: ""
                },
                {
                    title: "Project cases",
                    link: ""
                },
                {
                    title: "brand introduction",
                    link: ""
                },
                {
                    title: "news",
                    link: ""
                }
            ]))
        },
        vueHeader: {
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "home",
                    link: "/?lang=zh"
                },
                {
                    title: "Product Center",
                    link: "",
                    childList: [
                        {
                            title: "title",
                            icon: "",
                            childNav: [
                                {
                                    title: "title",
                                    link: ""
                                },
                                {
                                    title: "child router",
                                    link: ""
                                }]
                        },
                        {
                            title: "title",
                            icon: "",
                            childNav: [
                                {
                                    title: "title",
                                    link: ""
                                },
                                {
                                    title: "child router",
                                    link: ""
                                }]
                        },
                        {
                            title: "title",
                            icon: "",
                            childNav: [
                                {
                                    title: "title",
                                    link: ""
                                },
                                {
                                    title: "child router",
                                    link: ""
                                }]
                        }

                    ]
                },
                {
                    title: "solution",
                    link: "/?lang=en"
                },
                {
                    title: "Project cases",
                    link: ""
                },
                {
                    title: "brand introduction",
                    link: ""
                },
                {
                    title: "news",
                    link: ""
                }
            ])),
            tel: "0755-23446330",
            logoUrl: logo,
            searchPlaceholder: "Enter search keywords",
        },
        vueProducts: {
            title: "产品中心",
            list: encodeURIComponent(JSON.stringify([
                {
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },{
                    image: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                    text: "提示文字",
                    link: "/article",
                    title: "测试内容标题",
                    alt: "去文章页"
                },
            ])),
        },
        vueIndex: {
            title: 'title ',
            author: 'xiy1111a',
            keywords: 'xiya',
            description: 'description content',
            countblock: encodeURIComponent(JSON.stringify([{
                countNum: 10,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "en",
                describe: "en",
            }, {
                countNum: 50,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "en",
                describe: "en",
            }, {
                countNum: 80,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "en",
                describe: "en",
            }, {
                countNum: 100,
                imageUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
                unit: "en",
                describe: "en",
            }])),
            bannerblock: encodeURIComponent(JSON.stringify([
                {
                    alt: "test image",
                    src: banner1,
                },
                {
                    alt: "test image",
                    src: banner2,
                },
                {
                    alt: "test path",
                    src: banner3,
                }
            ]))
        },
        vueAbout: {
            "title": "block",
            "author": "block",
            "keywords": "block",
            "description": "block",
            "mainblock": {
                "title": "title ",
                "QRCode1": "1705290481369.jpg",
                "QRCode2": "1705290483435.jpg",
                "mainInfo": "mainInfo",
                "QRCode1Tip": "qr1",
                "QRCode2Tip": "qr2",
                "welcomeDescribe": "main"
            }
        }
    }
}

export default data;

export const langList = [
    {
        lang: "zh",
        text: "中文"
    },
    {
        lang: "en",
        text: "English"
    },
]