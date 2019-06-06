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
    iconCls?: any;
    isActive?: boolean;
    isExpand?: boolean;
    children?: Menu[];
    params?: string;
    hideBreadcrumb?: boolean;
    hidden?: boolean;
    isHome?: boolean;
    isAbsolute?: boolean;
    isFirstMenu?: boolean;
}
export const homeMenuList: Menu[] = [
    {
        label: '首页',
        code: 'home-page',
        route: `/main`,
        hidden: true,
        hideBreadcrumb: true,
        isHome: true,
        iconCls: { 'icon-uk-budgetamendment': true },
        children: [
            {
                label: '首页1',
                code: 'code1',
                route: '/main/home/page'
            }
        ]
    },
    {
        label: '我的单据',
        code: 'home-my-bill',
        route: `/main/home/myBill`,
        iconCls: { 'icon-uk-My-documents': true },
    },
    {
        label: '我的企业',
        code: 'home-enterprise',
        route: `/main/home/myEnterprise`,
        iconCls: { 'icon-uk-My-business': true },
    }
]
