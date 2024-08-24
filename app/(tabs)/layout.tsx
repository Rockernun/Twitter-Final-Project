import SearchBar from "@/components/layout/search-bar";
import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SearchBar />
      {children}
      <TabBar />
    </div>
  );
}
