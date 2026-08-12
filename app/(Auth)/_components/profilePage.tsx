"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { User, Phone, Mail, ShieldCheck, Edit3, Save, X, Loader2 } from "lucide-react";
import { getProfileApi, updateProfileApi } from "../_action/profile";

export default function ProfilePage() {
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
  });

  // ফর্মের জন্য আলাদা স্টেট
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    profilePhoto: "",
  });

  // 🌟 useCallback দিয়ে ফেচ ফাংশনটি র‍্যাপ করা হয়েছে যাতে রিক্রিয়েট না হয়
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProfileApi();
      if (res?.success) {
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
      toast.error("An error occurred while fetching profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ইনপুট হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // আপডেট সাবমিট হ্যান্ডলার
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await updateProfileApi(formData);
      if (res?.success) {
        toast.success("Profile updated successfully!");
        setProfile(res.data.profile);
        setIsEditing(false);
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong during update.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-10 shadow-xl backdrop-blur-xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-6">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-amber-500/30 bg-gradient-to-tr from-amber-500 to-amber-300 shadow-lg flex items-center justify-center text-slate-950 text-3xl font-bold">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span>{profile.name ? profile.name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{profile.name || "User Name"}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{profile.email}</p>
              <span className="mt-2 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 capitalize">
                {profile.role}
              </span>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 text-sm font-bold transition-all shadow-md cursor-pointer"
            >
              <Edit3 className="h-4 w-4" /> Edit Profile
            </button>
          )}
        </div>

        {/* View or Edit Form */}
        {!isEditing ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
              <User className="h-6 w-6 text-amber-500" />
              <div>
                <p className="text-xs text-slate-400">Full Name</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{profile.name || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
              <Mail className="h-6 w-6 text-amber-500" />
              <div>
                <p className="text-xs text-slate-400">Email Address</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
              <Phone className="h-6 w-6 text-amber-500" />
              <div>
                <p className="text-xs text-slate-400">Phone Number</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{profile.phoneNumber || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
              <div>
                <p className="text-xs text-slate-400">Account Status</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 capitalize">{profile.activeStatus || "Active"}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="mt-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Profile Photo URL</label>
              <input
                type="text"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 text-sm font-bold shadow-md cursor-pointer disabled:opacity-50"
              >
                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}