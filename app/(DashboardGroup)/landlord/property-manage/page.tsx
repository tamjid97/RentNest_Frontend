"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Sparkles,
  Plus,
  Search,
  MapPin,
  Edit3,
  Trash2,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProperty, deleteProperty, getProperties, updateProperty } from "../_action/propartyAction";

interface Category {
  id: string;
  name: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  isAvailable: string;
  image?: string;
  category?: { id: string; name: string } | string;
  categoryId: string;
}

export default function LandlordPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "AVAILABLE" | "UNAVAILABLE">("ALL");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const parsePropertiesResponse = (propData: unknown): Property[] => {
    if (Array.isArray(propData)) {
      return propData as Property[];
    }
    
    if (propData !== null && typeof propData === "object") {
      const response = propData as { success?: boolean; data?: unknown; properties?: unknown };
      if (Array.isArray(response.data)) {
        return response.data as Property[];
      }
      if (Array.isArray(response.properties)) {
        return response.properties as Property[];
      }
    }
    
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        setCategories(Array.isArray(catData) ? catData : catData?.data || []);

        const propData = await getProperties();
        setProperties(parsePropertiesResponse(propData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActionLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    // 🔍 কনসোল লগ: ফর্ম থেকে কী ডাটা পাঠানো হচ্ছে তা দেখার জন্য
    console.log("=== CREATE PROPERTY DEBUG (FRONTEND) ===");
    console.log("FormData Entries:", Object.fromEntries(formData.entries()));
    console.log("Amenities Selected:", formData.getAll("amenities"));

    const res = await createProperty(formData); 
    console.log("Create Property Server Response:", res);
    
    if (res.success) {
      setIsAddModalOpen(false);
      const updatedProps = await getProperties();
      setProperties(parsePropertiesResponse(updatedProps));
      alert("Property Added Successfully!");
    } else {
      alert(res.message || "Failed to add property");
    }
    setIsActionLoading(false);
  };

  const handleUpdateProperty = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setIsActionLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
  

    const res = await updateProperty(id, formData); 
    console.log("Update Property Server Response:", res);
    
    if (res.success) {
      setEditModalId(null);
      const updatedProps = await getProperties();
      setProperties(parsePropertiesResponse(updatedProps));
      alert("Property Updated Successfully!");
    } else {
      alert(res.message || "Failed to update property");
    }
    setIsActionLoading(false);
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    const res = await deleteProperty(id);
    console.log("Delete Property Response:", res);

    if (res.success) {
      setProperties(properties.filter(p => p.id !== id));
      alert("Property Deleted!");
    } else {
      alert(res.message || "Failed to delete");
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      property.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "ALL" || property.isAvailable === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              My Properties
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Manage your listings, update details, or remove properties
            </p>
          </div>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300">
              <Plus className="mr-2 h-5 w-5 stroke-[3]" />
              Add New Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white dark:bg-[#07090e] border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Property</DialogTitle>
              <DialogDescription>Fill in the details below to list a new property.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateProperty} className="py-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Property Title</label>
                  <Input name="title" required placeholder="e.g. Modern Apartment" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Location</label>
                  <Input name="location" required placeholder="e.g. Dhaka, Bangladesh" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Price (৳) / month</label>
                  <Input name="price" type="number" required placeholder="e.g. 10000" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-500" /> Image URL
                  </label>
                  <Input name="image" placeholder="https://example.com/property-image.jpg" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Availability Status</label>
                  <select name="isAvailable" defaultValue="AVAILABLE" className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent">
                    <option value="AVAILABLE">Available</option>
                    <option value="UNAVAILABLE">Unavailable / Rented</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Category</label>
                  <select name="categoryId" required defaultValue="" className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent">
                    <option value="" disabled>{loadingCategories ? "Loading..." : "Select a category..."}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea name="description" required placeholder="Write a detailed description..." className="flex min-h-[100px] w-full rounded-xl border px-3 py-3 text-sm bg-transparent"></textarea>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-semibold">Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["gym", "garage", "wifi", "security"].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer">
                        <input type="checkbox" name="amenities" value={amenity} className="w-4 h-4 rounded text-amber-500" />
                        <span className="text-sm font-medium capitalize">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isActionLoading} className="bg-amber-500 text-slate-950 font-bold">
                  {isActionLoading ? "Saving..." : "Save Property"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location..." 
            className="h-11 pl-10 pr-4 rounded-xl" 
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Button onClick={() => setFilterStatus("ALL")} variant="outline" className={`h-10 rounded-xl font-bold ${filterStatus === "ALL" ? "bg-amber-500 text-slate-950" : ""}`}>
            All ({properties.length})
          </Button>
          <Button onClick={() => setFilterStatus("AVAILABLE")} variant="outline" className={`h-10 rounded-xl ${filterStatus === "AVAILABLE" ? "bg-emerald-500 text-white border-emerald-500" : ""}`}>
            Available
          </Button>
          <Button onClick={() => setFilterStatus("UNAVAILABLE")} variant="outline" className={`h-10 rounded-xl ${filterStatus === "UNAVAILABLE" ? "bg-slate-800 text-white border-slate-800" : ""}`}>
            Unavailable / Rented
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500 font-medium">Loading properties...</div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-10 text-slate-500 font-medium">No properties found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="group relative bg-white dark:bg-[#07090e] border rounded-3xl p-4 flex flex-col sm:flex-row gap-5">
              <div className="relative w-full sm:w-52 h-52 sm:h-auto rounded-2xl overflow-hidden shrink-0">
                <img src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop"} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                
                <div className="absolute bottom-3 left-3">
                  {property.isAvailable === "AVAILABLE" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white">
                      <CheckCircle2 className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-slate-300">
                      <Home className="w-3 h-3" /> Unavailable
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <h3 className="text-xl font-bold line-clamp-1">{property.title}</h3>
                  <p className="text-xs flex items-center gap-1.5 mt-2 font-medium">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> {property.location}
                  </p>
                  
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-2xl font-extrabold text-amber-600">৳{property.price?.toLocaleString()}</span>
                    <span className="text-sm mb-1">/mo</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t">
                  <Dialog open={editModalId === property.id} onOpenChange={(isOpen) => setEditModalId(isOpen ? property.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 h-10 text-amber-600 hover:bg-amber-500 hover:text-slate-950 font-bold">
                        <Edit3 className="w-4 h-4 mr-2" /> Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Update Property</DialogTitle>
                      </DialogHeader>
                      
                      <form onSubmit={(e) => handleUpdateProperty(e, property.id)} className="py-4 flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold">Title</label>
                            <Input name="title" defaultValue={property.title} required className="h-11 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Location</label>
                            <Input name="location" defaultValue={property.location} required className="h-11 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Price</label>
                            <Input name="price" type="number" defaultValue={property.price} required className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-amber-500" /> Image URL
                            </label>
                            <Input name="image" defaultValue={property.image || ""} placeholder="https://example.com/property-image.jpg" className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold">Availability</label>
                            <select name="isAvailable" defaultValue={property.isAvailable || "AVAILABLE"} className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent">
                              <option value="AVAILABLE">Available</option>
                              <option value="UNAVAILABLE">Unavailable / Rented</option>
                            </select>
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold">Category</label>
                            <select 
                              name="categoryId" 
                              defaultValue={property.categoryId || (typeof property.category === 'object' ? property.category?.id : "")} 
                              required 
                              className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent"
                            >
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold">Description</label>
                            <textarea name="description" defaultValue={property.description} required className="flex min-h-[100px] w-full rounded-xl border px-3 py-3 text-sm bg-transparent"></textarea>
                          </div>
                          
                          <div className="space-y-3 md:col-span-2">
                            <label className="text-sm font-semibold">Amenities</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {["gym", "garage", "wifi", "security"].map((amenity) => (
                                <label key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer">
                                  <input type="checkbox" name="amenities" value={amenity} defaultChecked={property.amenities?.includes(amenity)} className="w-4 h-4 rounded text-amber-500" />
                                  <span className="text-sm font-medium capitalize">{amenity}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                          <Button type="button" variant="outline" onClick={() => setEditModalId(null)}>Cancel</Button>
                          <Button type="submit" disabled={isActionLoading} className="bg-amber-500 text-slate-950 font-bold">
                             {isActionLoading ? "Updating..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    onClick={() => handleDeleteProperty(property.id)} 
                    variant="outline" 
                    className="flex-1 h-10 text-rose-600 hover:bg-rose-500 hover:text-white font-bold"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 bg-white dark:bg-[#07090e] border rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredProperties.length} properties</span>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" disabled className="h-8 w-8 rounded-lg"><ChevronLeft className="w-4 h-4" /></Button>
          <Button size="icon" variant="outline" disabled className="h-8 w-8 rounded-lg"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}