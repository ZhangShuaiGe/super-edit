import { v4 as uuid } from 'uuid';
export default {
    x:0,
    y:0,
    width: "800",
    height: "300",
	children:[
        {
            tabName:'用户管理',
            name:`tab-0`,//默认
            children:[

            ]
        },
        {
            tabName:'用户管理1',
            name:`tab-${uuid()}`,
            children:[
                
            ]
        }
    ]
}
