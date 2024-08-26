import { IS_ADMIN_AUTH } from "./admin_query_mutation";
import { ADMIN_LOGIN } from "./admin_query_mutation";
import { client } from "./user_related";
import Cookies from "js-cookie"

export const getAdminToken = () => Cookies.get("adminToken");

export const adminLogout = () => {
    Cookies.remove("adminToken")
}

export const adminLogin = async ({ Email, Password }: loginType) => {
    try {
        const { adminLogin }: { adminLogin: responseType } = await client.request(ADMIN_LOGIN, { Email, Password })
        adminLogin.data = JSON.parse(adminLogin.data)
        return adminLogin
    } catch (error: any) {
        console.log(error);
        return { status: false, message: error.message ?? "Internal error occured", data: null, token: "" }
    }
}

export const isAdminAuthenticated = async (token: string) => {
    try {
        const { isAdminAuth }: { isAdminAuth: responseType } = await client.request(IS_ADMIN_AUTH, { Token: token })
        return isAdminAuth
    } catch (error: any) {
        console.log(error)
        return { status: false, message: "unauthenticated" }
    }
}