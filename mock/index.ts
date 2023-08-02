import type {MockMethod} from 'vite-plugin-mock'
import Mock from 'mockjs'


const mock:Array<MockMethod> = [
    {
        url: "/api/admin/login",
        method: 'post',
        statusCode: 200,
        response: () => {
            return {
                code: 0,
                message: "请求成功",
                data: {
                    token: "ASKS99WH7828JAU89892I0A6Y2802J",
                    userInfo: {
                        username: "张三",
                        nickname: '晚风'
                    }
                }
            }

        }
    }
]


export default mock