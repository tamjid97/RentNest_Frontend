# RentNest - API Integration Documentation

This document provides a comprehensive mapping of **RentNest** Next.js App Router routes and frontend components to their respective Backend API Endpoints.

---

## 1. Public Routes

| Route Path | Component / Feature | API Endpoint | Method | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/properties` | Browse Properties | `/api/properties` | GET | Retrieves all properties with query filtering (`?search=`, `?location=`, `?minPrice=`, `?maxPrice=`). |
| `/properties/[id]` | Property Details | `/api/properties/:id` | GET | Fetches detailed information, image galleries, and amenities of a property. |
| `/register` | Registration Form | `/api/auth/register` | POST | Registers a new user account (Tenant or Landlord). |
| `/login` | Login Form | `/api/auth/login` | POST | Authenticates user credentials and returns JWT token. |
| `/profile` | User State Fetch | `/api/auth/me` | GET | Fetches logged-in user profile details upon successful authentication. |

---

## 2. Tenant Routes

| Route Path | Component / Feature | API Endpoint | Method | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/tenant/get-my-rental-requests` | Request History | `/api/rentals` | GET | Retrieves all rental request histories submitted by the tenant. |
| `/tenant/get-my-rental-requests/[id]` | Payment Initiation | `/api/payments/create` | POST | Generates a Stripe checkout session for approved rental requests. |
| `/tenant/payments` | Payment Success | `/api/payments` | POST | Verifies payment transaction status and updates booking state on checkout success.

---

## 3. Landlord Routes

| Route Path | Component / Feature | API Endpoint | Method | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/landlord/property-manage` | Property List | `/api/properties` | GET | Fetches all property listings owned and managed by the logged-in landlord. |
| `/landlord/property-manage` | Delete Listing | `/api/landlord/properties/:id` | DELETE | Removes a specific property listing from the platform. |
| `/landlord/property-manage` | Add Property Form | `/api/landlord/properties` | POST | Creates and publishes a new property listing. |
| `/landlord/property-manage` | Edit Property Form | `/api/landlord/properties/:id` | PATCH | Updates existing property details, price, and availability status. |
| `/landlord/rental-requests` | Incoming Requests | `/api/landlord/requests` | GET | Retrieves all rental requests submitted by tenants for the landlord's properties. |
| `/landlord/rental-requests` | Request Action | `/api/landlord/requests/:id` | PATCH | Approves or rejects a tenant's rental request (`status: "APPROVED" | "REJECTED"`). |

---

## 4. Admin Routes

| Route Path | Component / Feature | API Endpoint | Method | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/admin/userControl` | User Management Table | `/api/admin/users` | GET | Fetches a list of all registered platform users. |
| `/admin/userControl` | User Moderation Action | `/api/admin/users/:id` | PATCH | Performs moderation controls such as blocking/unblocking user accounts. |
| `/admin/creat-catagory` | Add Category Form | `/api/categories` | POST | Creates new property categories for platform-wide organization. |
| `/admin/propertieManage` | All Properties Moderation | `/api/admin/properties` | GET | Retrieves all property listings across the entire platform for admin inspection. |
| `/admin/rental-requests-get` | All Rental Requests Overview | `/api/admin/rentals` | GET | Fetches all rental requests and booking histories across the platform. |
---

## 5. UI Error Handling & Feedback Strategy

* **Toast Notifications:** Toast alerts (`sonner`) trigger automatically for all API successes (e.g., booking submission, request approval) and API errors (e.g., invalid authentication, payment failures).
* **Error Boundaries:** Route-level `error.tsx` handlers capture runtime exceptions gracefully and offer recovery options to users.
* **Loading Skeletons:** Data-fetching screens display responsive skeleton UI cards while resolving asynchronous API responses.
