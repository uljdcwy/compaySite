interface footerIndex {
    Filing: string; // 备案信息
    telTips: string; // 电话提示
    tel: string | number; // 电话号码
    logoUrl: any; // LOGO地址
    navTips: string; // 导航提示
    homeLink: string; // 主页地址
    logoAlt: string; // logo占位文字
    navList: {
        title: string; // 标题
        link: string;// 链接
    }[];
    footerBg: string; // bg图片
}