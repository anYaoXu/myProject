export interface Nav {
    isHome?: boolean;
    label: string;
    code: string;
    visible: boolean;
    route: string;
    isActive?: boolean;
    hidden?: boolean;
    params?: string;
}

export const navList: Nav[] = [
    {
        isHome: true,
        label: '首页',
        code: 'home',
        visible: false,
        route: '/home'
    },
    {
        isHome: false,
        label: '自定义',
        code: 'custom',
        visible: true,
        route: '/custom'
    }
]

export interface Menu {
    label: string;
    code: string;
    route?: string;
    additionalRouters?: any[];
}
