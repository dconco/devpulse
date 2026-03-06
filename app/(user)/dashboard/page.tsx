import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DashboardWithKey from "../../components/dashboard/WithKey";
import DashboardWithoutKey from "../../components/dashboard/WithoutKey";
import LeaderboardsList from "@/app/components/dashboard/LeaderbordList";
import Stats from "@/app/components/dashboard/Stats";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("wakatime_api_key, email")
    .eq("id", user.id)
    .single();

  if (!profile?.wakatime_api_key) {
    return <DashboardWithoutKey email={profile?.email || user.email!} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-10 py-2 md:py-6 lg:py-10 space-y-3 md:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 items-start">
          <DashboardWithKey email={profile?.email || user.email!} />
          <LeaderboardsList />
        </div>

        <div className="w-full">
          <Stats />
        </div>
      </div>
    </div>
  );
}
