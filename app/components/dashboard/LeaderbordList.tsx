import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import BoardList from "../BoardList";

export default async function LeaderboardsList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: owned } = await supabase
    .from("leaderboards")
    .select("id, name, slug, join_code")
    .eq("owner_id", user.id);

  const { data: joined } = await supabase
    .from("leaderboard_members")
    .select("leaderboards(id, name)")
    .eq("user_id", user.id);

  const joinedBoards = joined?.map((j: any) => j.leaderboards) || [];

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-semibold mb-6">Your Leaderboards</h3>

      <div className="space-y-3">
        {owned?.map((board) => (
          <div key={board.id}>
            <BoardList board={board} />
          </div>
        ))}

        {joinedBoards.map((board) => (
          <div key={board.id}>
            <BoardList board={board} />
          </div>
        ))}

        {!owned?.length && !joinedBoards.length && (
          <p className="text-gray-500 text-sm">No leaderboards yet.</p>
        )}
      </div>
    </div>
  );
}
