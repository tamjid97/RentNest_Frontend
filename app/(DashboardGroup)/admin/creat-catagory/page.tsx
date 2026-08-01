"use client";
import React, { useActionState, useEffect } from "react";
import { FolderPlus, Sparkles,  Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { createCatagory } from "../_action/catagoryAction";
import { toast } from "sonner";



  // work 1
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button 
        type="submit" 
        disabled={pending}
        className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/25 transition-all duration-300"
      >
        {pending ? "Creating..." : "Create Category"}
      </Button>
    );
  }


// work 2
    const initialState = {
    success: false,
    statusCode: 200,
    message: "",
    data: {},
  };




export default function CreateCategoryPage() {

    // work 3
  const [state, formAction] = useActionState(createCatagory, initialState);

// woark8
useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 🌟 Centered Card Container with Ambient Glow */}
      <div className="relative w-full max-w-lg">
      
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 blur-2xl opacity-70 dark:opacity-40 pointer-events-none" />

        {/* Main Card UI */}
        <div className="relative bg-white/90 dark:bg-[#07090e]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-amber-500/5 space-y-8">
          

          <div className="text-center space-y-3">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/25 mx-auto transition-transform duration-300 hover:scale-105">
              <FolderPlus className="w-8 h-8 font-bold" />
              <div className="absolute inset-0 rounded-2xl ring-2 ring-white/30" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center justify-center gap-2">
                Create Category
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
                Add a new property category to organize UrbanNest listings
              </p>
            </div>
          </div>

          
            {/* woark-4 */}
          <form action={formAction} className="space-y-6">
                          {/* wark 5 */}
            <div className="space-y-2">
              <Label 
                htmlFor="categoryName" 
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-1"
              >
                Category Name <span className="text-amber-500">*</span>
              </Label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                  <Tag className="w-5 h-5" />
                </div>
                <Input
                  id="categoryName"
                  // wark-6
                  name="name"
                  type="text"
                  placeholder="e.g. Apartment, Villa, Duplex"
                  required
                  className="h-12 pl-11 pr-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 transition-all duration-200 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Helper Tip Box */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 font-medium">
              <Layers className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Make sure the category name is clear for property seekers.</span>
            </div>

            
            {/* woark-7 */}
            <SubmitButton />
          </form>

        </div>
      </div>
    </div>
  );
}