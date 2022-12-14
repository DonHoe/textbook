export default {
    title: '个人日志',
    base:"/textbook/",
    themeConfig: {
        siteTitle: "个人日志",
        logo: "/favicon.ico",
        nav: [
            { text: '编程', link: '/chapter/code/' },
            // { text: '数学', link: '/chapter/math/linearAlgebra' },
            {
                text: '数据库', items: [
                    { text: 'mysql', link: '/chapter/database/mysql' },
                    { text: 'redis', link: '/chapter/database/redis' },
                ]
            },
            {
                text: 'DevOps', items: [
                    { text: 'docker', link: '/chapter/devops/docker' },
                    { text: '其他', link: '/chapter/devops/other' },
                ]
            },
        ],
        sidebar: {
            '/chapter/code/': [
                {
                    text: "算法",
                    items: [
                        {
                            text: '排序',
                            link: "/chapter/code/leetcode/sort",
                        },
                        {
                            text: '回溯算法',
                            link: "/chapter/code/leetcode/backtracking",
                        },
                        {
                            text: '树算法',
                            link: "/chapter/code/leetcode/tree",
                        },
                        {
                            text: '链表算法',
                            link: "/chapter/code/leetcode/listnode",
                        },
                        {
                            text: '字符串',
                            link: "/chapter/code/leetcode/string",
                        },
                        {
                            text: '其他',
                            link: "/chapter/code/leetcode/other",
                        },
                    ],
                },
                {
                    text:"多线程",
                    items:[
                        {
                            text: 'synchronized',
                            link: "/chapter/code/thread/synchronized",
                        },
                    ]
                }
            ],
        }
    },
}