"use client";
import { adminLogin, getAdminToken, isAdminAuthenticated } from "@/app/Functions/admin_related";
import { validateEmail, validatePassword } from "@/app/Functions/validation";
import LoadingPage from "@/app/loading";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Login() {
    const [cred, setCred] = useState({ Email: "", Password: "" });
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        isAdminAuthenticated(getAdminToken() + "").then(({ status }) => {
            if (status) {
                router.push("/admin/dashboard")
            } else {
                setLoading(false)
            }
        })
    }, [])

    const submitButton = () => {
        if (validateEmail(cred.Email)) {
            if (validatePassword(cred.Password)) {

                (async () => {
                    const { data, status, token } = await adminLogin({ Email: cred.Email + "", Password: cred.Password + "" });
                    if (status && token) {
                        Cookies.set("adminToken", token)
                        router.push("/admin/dashboard")
                    } else {
                        setError(data.message)
                    }
                })();

            } else {
                setError("Invalid Password")
            }
        } else {
            setError("Invalid Email")
        }

    }

    if (loading) { return <LoadingPage /> }

    return (
        <div className="min-h-screen flex overflow-hidden bottom-0 justify-center items-center"
            style={{
                backgroundColor: "#1A1A2E",
                color: "#FFFFFF"
            }}
        >
            <section className="container flex justify-center items-center h-full">
                <div className="relative w-[385px] h-auto">
                    <div className="absolute w-32 h-32 rounded-full top-0 left-0 z-[-1] transform translate-x-[-45%] translate-y-[-45%] bg-[#0F3460]" />
                    <div className="border border-gray-200 shadow-lg rounded-lg backdrop-blur-lg z-10 p-8">
                        <img
                            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                            alt="illustration"
                            className="absolute top-[-14%] right-[-2px] w-[65%]"
                        />
                        <h1 className="opacity-60 text-2xl font-bold mb-4">ADMIN LOGIN</h1>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="text"
                            placeholder="EMAIL"
                            className="block p-4 w-full mb-4 border-none rounded-md font-medium text-sm backdrop-blur-md focus:outline-none focus:shadow-lg"
                            onChange={(e) => setCred(rest => ({ ...rest, Email: e.target.value }))}
                            style={{
                                color: "#FFFFFF",
                                backgroundColor: "#9191911f"
                            }}
                        />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            className="block p-4 w-full mb-4 border-none rounded-md font-medium text-sm backdrop-blur-md focus:outline-none focus:shadow-lg"
                            onChange={(e) => setCred(rest => ({ ...rest, Password: e.target.value }))}
                            style={{
                                color: "#FFFFFF",
                                backgroundColor: "#9191911f"
                            }}
                        />
                        <button
                            type="button" onClick={() => submitButton()}
                            className="block relative z-50 p-4 w-full rounded-md text-lg font-bold mb-4 cursor-pointer hover:shadow-md hover:scale-105 transition-all ease-in-out"
                            style={{ backgroundColor: "#0F3460", color: "#FFFFFF" }}
                        >
                            SUBMIT
                        </button>
                    </div>

                </div>


            </section>
        </div>
    );
};

export default Login;
