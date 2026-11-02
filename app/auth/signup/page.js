"use client";

import { useId, useState } from "react";
import { Button } from "@heroui/react";
import { Eye, EyeSlash, LogoGooglePlay } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUp() {
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Enter your name.";
    } else if (name.trim().length > 100) {
      nextErrors.name = "Name is too long.";
    }

    if (!email.trim()) {
      nextErrors.email = "Enter your email.";
    } else if (
      email.trim().length > 254 ||
      !emailPattern.test(email.trim())
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    } else if (password.length < 8) {
      nextErrors.password =
        "Password must be at least 8 characters.";
    } else if (password.length > 128) {
      nextErrors.password = "Password is too long.";
    }

    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
     
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/",
      },{
        onSuccess: (data) => {
          alert("Signup successful:");
          // Handle signup success / verification here
        },
        onError: (error) => {
          setFormError(error.message);
        }
      });
      //
      // if (error) {
      //   setFormError(error.message);
      //   return;
      // }
      //
      // Handle signup success / verification.

    
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    // Connect Better Auth social signup here:
    //
    // await authClient.signIn.social({
    //   provider: "google",
    //   callbackURL: "/dashboard",
    // });
  }

  const inputClass = `
    h-12 w-full rounded-lg
    border border-white/15
    bg-white/[0.035]
    px-3.5 text-sm text-zinc-100
    placeholder:text-zinc-500
    outline-none transition
    hover:border-white/25
    focus-visible:border-sky-400
    focus-visible:ring-2
    focus-visible:ring-sky-400/30
    aria-[invalid=true]:border-red-400
  `;

  return (
    <main className="
      relative isolate flex min-h-dvh
      items-center justify-center
      overflow-hidden bg-[#090b10]
      px-4 py-8 text-zinc-100
    ">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="
          absolute -left-32 -top-32
          h-80 w-80 rounded-full
          bg-blue-600/20 blur-[100px]
        " />

        <div className="
          absolute -bottom-40 -right-32
          h-96 w-96 rounded-full
          bg-cyan-500/10 blur-[110px]
        " />
      </div>

      {/* Signup card */}
      <section
        aria-labelledby="signup-title"
        className="relative w-full max-w-[400px]"
      >
        <div className="
          rounded-2xl
          border border-white/10
          bg-[#11141b]
          px-6 py-7
          shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8)]
          sm:px-8 sm:py-8
        ">
          {/* Heading */}
          <header className="mb-6 text-center">
            <h1
              id="signup-title"
              className="text-2xl font-semibold tracking-tight text-white"
            >
              Sign up
            </h1>
          </header>

          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="signup-title"
            className="space-y-3.5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="sr-only"
              >
                Name
              </label>

              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="name"
                autoCapitalize="words"
                maxLength={100}
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    name: undefined,
                  }));
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? `signup-name-error` : undefined
                }
                className={inputClass}
              />

              {errors.name && (
                <p
                  id="signup-name-error"
                  className="mt-1 text-xs text-red-300"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="sr-only"
              >
                Email
              </label>

              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={254}
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    email: undefined,
                  }));
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? `signup-email-error` : undefined
                }
                className={inputClass}
              />

              {errors.email && (
                <p
                  id="signup-email-error"
                  className="mt-1 text-xs text-red-300"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="sr-only"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? `signup-password-error`
                      : `signup-password-hint`
                  }
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="
                    absolute inset-y-0 right-1
                    flex min-h-11 min-w-11
                    items-center justify-center
                    rounded-md text-zinc-400
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-sky-400
                  "
                >
                  {showPassword ? (
                    <EyeSlash aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </button>
              </div>

              <p
                id="signup-password-hint"
                className="sr-only"
              >
                Use 8 to 128 characters.
              </p>

              {errors.password && (
                <p
                  id="signup-password-error"
                  className="mt-1 text-xs text-red-300"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Form error */}
            {formError && (
              <p
                role="alert"
                className="
                  rounded-lg border border-red-400/20
                  bg-red-400/10 p-3 text-sm text-red-300
                "
              >
                {formError.message || formError}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              isDisabled={isSubmitting}
              className="
                !mt-5 w-full rounded-lg
                bg-sky-500 py-3
                font-semibold text-white
                hover:bg-sky-400
                focus-visible:ring-2
                focus-visible:ring-sky-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#11141b]
                disabled:opacity-60
              "
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Login */}
            <p className="text-center text-xs text-zinc-400">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="
                  font-medium text-sky-400
                  hover:text-sky-300 hover:underline
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-sky-400
                "
              >
                Log In
              </a>
            </p>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="flex items-center gap-3 py-2"
            >
              <span className="h-px flex-1 bg-white/15" />
              <span className="text-xs text-zinc-500">
                or
              </span>
              <span className="h-px flex-1 bg-white/15" />
            </div>

            {/* Google signup */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="
                flex min-h-11 w-full
                items-center justify-center gap-2.5
                rounded-lg border border-white/20
                bg-transparent px-4 py-2.5
                text-sm font-medium text-zinc-200
                transition hover:bg-white/5
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-400
              "
            >
              {/* Google mark */}
              <LogoGooglePlay />

              Sign up with Google
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}