"use client";

import { useState, useEffect, useActionState } from "react";
import { 
  Eye, EyeOff, User, Mail, 
  Home, Lock, Sparkles, Building2, Link as LinkIcon 
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, PostState } from "../_action/registerAction"; 

const initialState: PostState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

export default function RegisterForm() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [role, setRole] = useState<'tenant' | 'landlord'>('tenant');

  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message || "Account created successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(state.message || "Registration failed. Please try again.");
      }
    }
  }, [state, router]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden p-4 sm:p-6 md:p-10 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
      
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-amber-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-amber-600/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        className="relative w-full max-w-xl my-auto"
      >
        <div className="overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-amber-500/30 dark:border-amber-500/20 bg-white/90 dark:bg-slate-900/90 shadow-[0_20px_50px_rgba(245,158,11,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          
          {/* Header */}
          <div className="space-y-2 p-6 sm:p-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring" }}
              className="relative mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/30"
            >
              <Home className="h-7 w-7 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
              </span>
            </motion.div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 backdrop-blur-md uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Join RentNest</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Create an Account
            </h2>
          </div>

          <form action={formAction} className="p-6 sm:p-8 pt-2">
            
            <input type="hidden" name="role" value={role.toUpperCase()} />

            {/* Role Switcher */}
            <div className="mb-6 flex justify-center">
              <div className="relative inline-flex bg-slate-100 dark:bg-slate-950 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner w-full max-w-xs">
                {(['tenant', 'landlord'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setRole(tab)}
                    className={`relative flex-1 py-2.5 rounded-full text-xs font-bold transition-colors duration-300 z-10 uppercase tracking-wider cursor-pointer ${
                      role === tab ? 'text-slate-950 font-extrabold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {tab === 'tenant' ? <User className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                      {tab === 'tenant' ? 'Tenant' : 'Landlord'}
                    </span>
                    {role === tab && (
                      <motion.div
                        layoutId="activeRoleBackground"
                        className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Image Preview */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex flex-col items-center justify-center space-y-2"
            >
              <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-amber-500/50 bg-amber-50/50 shadow-md transition-all dark:bg-slate-950/50">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Invalid+URL";
                    }}
                  />
                ) : (
                  <User className="h-9 w-9 text-amber-500/60 dark:text-amber-400/60" />
                )}
              </div>
            </motion.div>

            {/* Input Fields Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2"
            >
              {/* Full Name */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="pl-10 h-11 sm:h-12 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm"
                  />
                </div>
              </motion.div>

              {/* Email Address */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="pl-10 h-11 sm:h-12 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm"
                  />
                </div>
              </motion.div>

              {/* Profile Photo URL */}
              <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                <Label htmlFor="profilePhoto" className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">
                  Profile Photo URL
                </Label>
                <div className="relative group">
                  <LinkIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={imagePreview}
                    onChange={(e) => setImagePreview(e.target.value)}
                    className="pl-10 h-11 sm:h-12 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-12 h-11 sm:h-12 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2 md:col-span-2">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-11 sm:h-12 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 font-extrabold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-[1.01] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create RentNest Account"
                  )}
                </Button>
              </motion.div>

            </motion.div>

            <div className="mt-6 sm:mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
              <p className="text-center font-medium">
                Already have an account?{" "}
                <Link href="/login" className="font-extrabold text-amber-600 dark:text-amber-400 hover:underline">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}