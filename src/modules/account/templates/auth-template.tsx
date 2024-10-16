"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { motion } from "framer-motion"
import { logCustomerIn, signUp } from "@modules/account/actions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/layout/components/ui/button"
import { Input } from "@modules/layout/components/ui/input"
import { Label } from "@modules/layout/components/ui/label"
import { ArrowRight, Mail, Lock, User, Phone } from "lucide-react"

enum LOGIN_VIEW {
  SIGN_IN = "sign_in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot_password"
}

type Props = {
  initialView: LOGIN_VIEW
}

export default function AnimatedAuth({ initialView }: Props) {
  const [view, setView] = useState<LOGIN_VIEW>(initialView)
  const [loginMessage, loginFormAction] = useFormState(logCustomerIn, null)
  const [registerMessage, registerFormAction] = useFormState(signUp, null)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
    setView(newDirection > 0 ? LOGIN_VIEW.REGISTER : LOGIN_VIEW.SIGN_IN)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      <div className="w-full max-w-md relative right-[135px] bottom-40">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {view === LOGIN_VIEW.SIGN_IN ? (
            <div className="space-y-8 bg-white p-8 shadow-2xl rounded-2xl" data-testid="login-page">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-black">Welcome Back</h2>
                <p className="mt-2 text-sm text-gray-600">
                  New here?{" "}
                  <button
                    onClick={() => paginate(1)}
                    className="font-medium text-black hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              </div>
              <form className="space-y-6" action={loginFormAction}>
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                        placeholder="Email address"
                        data-testid="email-input"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                        placeholder="Password"
                        data-testid="password-input"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                {loginMessage && (
                  <p className="text-sm text-red-600" data-testid="login-error-message">
                    {loginMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2"
                  data-testid="sign-in-button"
                >
                  Sign in
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 bg-white p-8 shadow-2xl rounded-2xl" data-testid="register-page">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-black">Create an Account</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => paginate(-1)}
                    className="font-medium text-black hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
              <form className="space-y-6" action={registerFormAction}>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="first_name" className="sr-only">
                        First name
                      </Label>
                      <div className="relative">
                        <Input
                          id="first_name"
                          name="first_name"
                          type="text"
                          required
                          className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                          placeholder="First name"
                          data-testid="first-name-input"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="last_name" className="sr-only">
                        Last name
                      </Label>
                      <div className="relative">
                        <Input
                          id="last_name"
                          name="last_name"
                          type="text"
                          required
                          className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                          placeholder="Last name"
                          data-testid="last-name-input"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="sr-only">
                      Email address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                        placeholder="Email address"
                        data-testid="email-input"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="sr-only">
                      Phone number
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                        placeholder="Phone number (optional)"
                        data-testid="phone-input"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password" className="sr-only">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="pl-10 bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                        placeholder="Password"
                        data-testid="password-input"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                {registerMessage && (
                  <p className="text-sm text-red-600" data-testid="register-error">
                    {registerMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2"
                  data-testid="register-button"
                >
                  Create Account
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Button>
              </form>
              <p className="mt-2 text-center text-xs text-gray-600">
                By creating an account, you agree to Medusa Store&apos;s{" "}
                <LocalizedClientLink href="/content/privacy-policy" className="font-medium text-black hover:underline">
                  Privacy Policy
                </LocalizedClientLink>{" "}
                and{" "}
                <LocalizedClientLink href="/content/terms-of-use" className="font-medium text-black hover:underline">
                  Terms of Use
                </LocalizedClientLink>
                .
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}