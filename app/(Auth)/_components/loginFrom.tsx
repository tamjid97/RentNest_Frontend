'use client'

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Eye, EyeOff, Mail, 
  Home, Lock, Sparkles, 
  Loader2
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { loginAction, LoginState } from "../_action/loginAction";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300 } 
  },
};

export default function LoginForm() {
  const router = useRouter();
  

  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction, 
    {}
  );
  
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (state.success === false) {
      toast.error(state.message || "Login failed");
    } else if (state.success === true) {
      toast.success("Welcome back to RentNest!");
      
      setTimeout(() => {
        if (state.role === "TENANT") {
            router.push("/tenant"); 
        } else if (state.role === "LANDLORD") {
            router.push("/landlord"); 
        } else if (state.role === "ADMIN") {
            router.push("/admin");
        } else {
            router.push("/");
        }
      }, 1000); 
    }
  }, [state, router]);


  return (
    <div className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden p-4 md:p-8 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
      
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-amber-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-amber-600/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="relative w-full max-w-lg my-12"
      >
        <div className="overflow-hidden rounded-[2.5rem] border border-amber-500/30 dark:border-amber-500/20 bg-white/80 dark:bg-slate-900/80 shadow-[0_20px_50px_rgba(245,158,11,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          
          <div className="space-y-2 p-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/30"
            >
              <Home className="h-7 w-7 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
              </span>
            </motion.div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 backdrop-blur-md uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Welcome Back</span>
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Login to RentNest
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Access your dashboard, properties, and rental preferences
            </p>
          </div>

          <form action={action} className="p-8 pt-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="pl-11 h-12 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">
                    Password
                  </Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pl-11 pr-12 h-12 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 font-extrabold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-[1.01] transition-all duration-300 active:scale-95 cursor-pointer"
                  disabled={pending}
                >
                  {pending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <span className="flex items-center justify-center text-base">
                  Login to RentNest
                  <motion.span
                    className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-100"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </span>
              )}
                </Button>
              </motion.div>

            </motion.div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
              <p className="text-center font-medium">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-extrabold text-amber-600 dark:text-amber-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}