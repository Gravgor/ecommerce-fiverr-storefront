import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/auth-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

enum LOGIN_VIEW {
  SIGN_IN = "sign_in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot_password"
}


export default function Login() {
  return <LoginTemplate initialView={LOGIN_VIEW.SIGN_IN}/>
}
