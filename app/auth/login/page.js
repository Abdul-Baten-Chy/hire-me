"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const inputStyle = `
    h-12 w-full rounded-lg border border-white/15
    bg-white/[0.035] px-3.5 text-sm text-zinc-100
    placeholder:text-zinc-500 outline-none transition
    focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20
  `;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
     
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      },{
        onSuccess: (data) => {
          alert("Sign in successful:");
          // Handle sign in success here
        },
        onError: (error) => {
          setError(error.message);
        }
      });
     

      
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    // await authClient.signIn.social({
    //   provider: "google",
    //   callbackURL: "/dashboard",
    // });
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#090b10] px-4 py-8 text-zinc-100">

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      {/* Card */}
      <section className="relative w-full max-w-[400px] rounded-2xl border border-white/10 bg-[#11141b] px-6 py-7 shadow-2xl sm:px-8 sm:py-8">

        <h1 className="mb-6 text-center text-2xl font-semibold text-white">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputStyle} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 flex min-w-10 items-center justify-center text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {showPassword ? (
                  <EyeSlash aria-hidden="true" />
                ) : (
                  <Eye aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-xs text-sky-400 hover:text-sky-300 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Error */}
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            isDisabled={isLoading}
            className="!mt-4 w-full rounded-lg bg-sky-500 py-3 font-semibold text-white hover:bg-sky-400"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Sign up link */}
          <p className="text-center text-xs text-zinc-400">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="font-medium text-sky-400 hover:underline"
            >
              Sign Up
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <span className="h-px flex-1 bg-white/15" />
            <span className="text-xs text-zinc-500">or</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex min-h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="size-[18px]"
            >
              <path fill="#4285F4" d="M44.5 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.5a10 10 0 0 1-4.26 6.57l6.88 5.34C42.14 36.48 44.5 30.98 44.5 24.5Z" />
              <path fill="#34A853" d="M24 45c5.4 0 9.93-1.79 13.24-4.85l-6.88-5.34c-1.8 1.2-4.1 1.9-6.36 1.9-5.18 0-9.58-3.5-11.16-8.22l-7.08 5.47C9.69 40.4 16.28 45 24 45Z" />
              <path fill="#FBBC05" d="M12.84 28.49a12.2 12.2 0 0 1 0-7.98l-7.08-5.47a21 21 0 0 0 0 18.92l7.08-5.47Z" />
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 16.28 0 9.69 4.6 5.76 11.04l7.08 5.47C14.42 13 18.82 9.5 24 9.5Z" transform="translate(0 3)" />
            </svg>

            Sign in with Google
          </button>

        </form>
      </section>
    </main>
  );
}