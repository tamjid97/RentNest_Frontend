"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { 
  User, Phone, Mail, ShieldCheck, Edit3, Save, X, Loader2, 
  ArrowLeft, Calendar, CheckCircle2, BadgeCheck 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getProfileApi, updateProfileApi } from "../_action/profile";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePhoto: "",
    role: "",
    activeStatus: "",
    createdAt: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    profilePhoto: "",
  });

  const fetchProfile = useCallback(async () => {
    try {
      const res = await getProfileApi();
      console.log("API Response:", res);

      // আপনার পোস্টম্যানের রেসপন্স অনুযায়ী ডাটা তোলার সঠিক পাথ
      if (res?.success && res?.data?.profile) {
        const data = res.data.profile;
        setProfile(data);
        setFormData({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          profilePhoto: data.profilePhoto || "",
        });
      } else {
        toast.error(res?.message || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("An error occurred while fetching profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await updateProfileApi(formData);
      
      if (res?.success) {
        toast.success("Profile updated successfully!");
        const updatedData = res?.data?.profile || res?.data || formData;
        setProfile((prev) => ({ ...prev, ...updatedData }));
        setIsEditing(false);
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong during update.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="group mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all hover:border-amber-500 hover:text-amber-500 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        
        {/* Cover Banner */}
        <div className="h-44 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
          <div className="absolute right-6 top-6 hidden sm:flex items-center gap-2 rounded-full bg-black/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <BadgeCheck className="h-4 w-4 text-amber-300" /> Verified Account
          </div>
        </div>

        <div className="px-6 md:px-10 pb-10 relative">
          
          {/* Avatar & Main User Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-20 pb-6 border-b border-slate-200 dark:border-slate-800 gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative h-36 w-36 overflow-hidden rounded-3xl border-4 border-white dark:border-slate-900 bg-gradient-to-tr from-amber-500 to-amber-300 shadow-2xl flex items-center justify-center text-slate-950 text-5xl font-extrabold">
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span>{profile.name ? profile.name.charAt(0).toUpperCase() : "U"}</span>
                )}
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {profile.name || "Unnamed User"}
                </h1>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{profile.email}</p>
                
                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 capitalize">
                    <ShieldCheck className="h-4 w-4" /> {profile.role || "User"}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold capitalize ${profile.activeStatus === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600"}`}>
                    <CheckCircle2 className="h-4 w-4" /> {profile.activeStatus || "Active"}
                  </span>
                </div>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 text-sm font-bold transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <Edit3 className="h-4 w-4" /> Edit Profile
              </button>
            )}
          </div>

          {/* Profile Details Grid or Edit Form */}
          {!isEditing ? (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-5 transition-all hover:border-amber-500/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</p>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{profile.name || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-5 transition-all hover:border-amber-500/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{profile.email || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-5 transition-all hover:border-amber-500/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</p>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{profile.phoneNumber || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-5 transition-all hover:border-amber-500/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Joined Date</p>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Profile Photo URL</label>
                  <input
                    type="text"
                    name="profilePhoto"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-7 py-3 text-sm font-bold shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}