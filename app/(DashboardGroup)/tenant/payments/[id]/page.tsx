import PaymentDetailsPage from "@/app/(PublicGroup)/payments/[id]/page";

interface DashboardPaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardPaymentPage({ params }: DashboardPaymentPageProps) {
  return <PaymentDetailsPage params={params} />;
}