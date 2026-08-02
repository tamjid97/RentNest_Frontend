export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import Link from "next/link";
import {
  Building2,
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPropertyById } from "../../_action/propertyAction";
import RentalActionBox from "../../_components/RentalActionBox";

// Interfaces matching your exact backend response
interface Landlord {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  profilePhoto?: string | null;
  [key: string]: unknown;
}

interface Category {
  id?: string;
  name?: string;
  [key: string]: unknown;
}

interface PropertyData {
  id?: string;
  title?: string;
  description?: string;
  location?: string | Record<string, unknown>;
  price?: number;
  amenities?: string[];
  isAvailable?: string;
  createdAt?: string;
  updatedAt?: string;
  categoryId?: string;
  landlordId?: string;
  category?: Category | string;
  landlord?: Landlord | string;
  beds?: number;
  baths?: number;
  sqft?: number | string;
  image?: string;
  status?: string;
  currentUserRequestStatus?: string;
  rentalRequestId?: string; 
  currentRentalRequestId?: string;
  myRequest?: { status?: string; id?: string; [key: string]: unknown };
  rentalRequest?: { status?: string; id?: string; [key: string]: unknown };
  rentalRequests?: Array<{ status?: string; id?: string; [key: string]: unknown }>;
  requests?: Array<{ status?: string; id?: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

// Safe helper function using `unknown` instead of `any`
const renderValue = (value: unknown, fallback: string = ""): string => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const name = obj.name;
    const title = obj.title;
    const username = obj.username;
    if (typeof name === "string") return name;
    if (typeof title === "string") return title;
    if (typeof username === "string") return username;
    return fallback;
  }
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  return fallback;
};

// Robust helper to extract status
const getStatusFromProperty = (prop: PropertyData): string => {
  if (typeof prop.status === "string" && prop.status.trim() !== "") {
    return prop.status;
  }
  if (typeof prop.currentUserRequestStatus === "string" && prop.currentUserRequestStatus.trim() !== "") {
    return prop.currentUserRequestStatus;
  }
  if (prop.myRequest && typeof prop.myRequest.status === "string") {
    return prop.myRequest.status;
  }
  if (prop.rentalRequest && typeof prop.rentalRequest.status === "string") {
    return prop.rentalRequest.status;
  }
  
  const reqs = prop.rentalRequests || prop.requests;
  if (Array.isArray(reqs) && reqs.length > 0 && reqs[0]?.status) {
    return String(reqs[0].status);
  }

  return "";
};

// Updated helper to extract rental request ID
const getRequestIdFromProperty = (prop: PropertyData): string => {
  if (typeof prop.currentRentalRequestId === "string" && prop.currentRentalRequestId.trim() !== "") {
    return prop.currentRentalRequestId;
  }
  if (typeof prop.rentalRequestId === "string" && prop.rentalRequestId.trim() !== "") {
    return prop.rentalRequestId;
  }
  if (prop.requestId && typeof prop.requestId === "string") {
    return prop.requestId;
  }
  
  // Check myRequest
  if (prop.myRequest) {
    if (typeof prop.myRequest.id === "string") return prop.myRequest.id;
    if (typeof prop.myRequest._id === "string") return prop.myRequest._id;
  }
  
  // Check rentalRequest
  if (prop.rentalRequest) {
    if (typeof prop.rentalRequest.id === "string") return prop.rentalRequest.id;
    if (typeof prop.rentalRequest._id === "string") return prop.rentalRequest._id;
  }
  
  // Check arrays (rentalRequests or requests)
  const reqs = prop.rentalRequests || prop.requests;
  if (Array.isArray(reqs) && reqs.length > 0) {
    const firstReq = reqs[0] as Record<string, unknown>;
    if (typeof firstReq?.id === "string") return firstReq.id;
    if (typeof firstReq?._id === "string") return firstReq._id;
  }

  return ""; 
};

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  const response = await getPropertyById(propertyId);
  const property = (response?.data ?? null) as PropertyData | null;

  if (!response?.success || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#04060a] text-center p-6">
        <Building2 className="w-12 h-12 text-amber-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Property Not Found
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          The property you are looking for does not exist or could not be loaded.
        </p>
        <Link href="/properties">
          <Button className="rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  // Safe variables for rendering
  const categoryName = renderValue(property.category, "Apartment");
  const locationName = renderValue(property.location, "Location not specified");
  const titleName = renderValue(property.title, "Property Details");
  
  // Landlord Details
  let landlordName = "Property Owner";
  let landlordAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";

  if (property.landlord && typeof property.landlord === "object") {
    const landlordObj = property.landlord as Landlord;
    if (typeof landlordObj.name === "string") {
      landlordName = landlordObj.name;
    }
    if (typeof landlordObj.profilePhoto === "string" && landlordObj.profilePhoto.trim() !== "") {
      landlordAvatar = landlordObj.profilePhoto;
    }
  }

  // Property Image fallback since backend response lacks image field
  const imageUrl =
    typeof property.image === "string" && property.image.trim() !== ""
      ? property.image
      : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop";

  // Safe extraction of status and request ID
  const currentStatus = getStatusFromProperty(property);
  const currentRentalRequestId = getRequestIdFromProperty(property);
  const propertyAvailability = typeof property.isAvailable === "string" ? property.isAvailable : "AVAILABLE";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-900 dark:text-slate-100 pb-20">
      
      {/* Top Navigation */}
      <div className="bg-white dark:bg-[#07090e] border-b border-slate-200/80 dark:border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/properties">
            <Button
              variant="outline"
              className="h-11 px-4 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              propertyAvailability === "AVAILABLE" 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            }`}>
              {propertyAvailability}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Main Property Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Image Banner */}
            <div className="relative h-[350px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80">
              <img
                src={imageUrl}
                alt={titleName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-extrabold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-white/10">
                {categoryName}
              </div>
            </div>

            {/* Title & Location */}
            <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {titleName}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  {locationName}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 px-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-amber-500 shrink-0" /> {typeof property.beds === "number" ? property.beds : 0} Beds
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-amber-500 shrink-0" /> {typeof property.baths === "number" ? property.baths : 0} Baths
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-amber-500 shrink-0" /> {property.sqft ?? "N/A"} sqft
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  About Property
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {typeof property.description === "string" ? property.description : "No description provided."}
                </p>
              </div>

              {/* Amenities */}
              {Array.isArray(property.amenities) && property.amenities.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Key Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.amenities.map((item: string, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

         {/* Right Side: Action Box Component */}
          <div className="lg:col-span-4 sticky top-6">
            <RentalActionBox
              propertyId={property?.id || ""}
              price={Number(property?.price || 0)}
              landlord={property?.landlord}
              initialStatus={currentStatus}
              rentalRequestId={currentRentalRequestId} 
              isAvailable={propertyAvailability} // 🌟 প্রপার্টির স্ট্যাটাস এখানে পাস করে দেওয়া হলো, ফলে এখন আনঅ্যাভেলেবল হলে পেমেন্ট বাটন হাইড হয়ে যাবে!
            />
          </div>

        </div>
      </div>

    </div>
  );
}