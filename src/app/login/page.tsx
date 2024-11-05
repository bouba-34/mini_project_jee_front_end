"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {LoginEmploye} from "@/actions/use-login";
import toast from "react-hot-toast";
import {useEmployeStore} from "@/store";
import {useRouter} from "next/navigation";

export type LoginProps = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const [login, setLogin] = useState<LoginProps>({
        email: "",
        password: ""
    })

    const setEmail = useEmployeStore(state => state.setEmail);
    const setFullname = useEmployeStore(state => state.setFullname);
    const setCode = useEmployeStore(state => state.setCode);

    const handleLogin = async () => {
        try {
            const response = await LoginEmploye(login);
            console.log(response.code);
            setEmail(response.data.email);
            setFullname(response.data.fullname);
            setCode(response.data.codeEmploye);
            toast.success("Login successful");
            router.push("/");
        } catch (error) {
            toast.error("Email or password is incorrect");
            console.error(error);
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                onChange={(e) => setLogin({...login, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                onChange={(e) => setLogin({...login, password: e.target.value})}
                                required />
                        </div>
                        <Button type="submit" className="w-full" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;