"use client";

import Button from "@/app/(landing)/components/ui/button";
import { login } from "@/app/services/auth-services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Cookies from "js-cookie";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.replace("/admin/products");
    }
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await login({ email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        Cookies.set("token", data.token, { expires: 7 });
        router.replace("/admin/products");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl border-t-4 border-primary py-12 px-6 md:px-12 shadow-sm">
        <Image
          src="/images/sporton-admin.svg"
          alt="logo"
          width={304}
          height={51}
          priority
          className="mx-auto mb-4 h-auto w-auto"
        />

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="input-group-admin">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group-admin">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
