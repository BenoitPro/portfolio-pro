import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-h2 font-medium text-text-primary">{profile.name}</h1>
    </div>
  );
}
