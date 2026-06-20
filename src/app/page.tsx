"use client"

import CodeforcePage from "@/components/sections/CodeforcePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyState from "@/components/empty-state/EmptyState";

interface Platform {
  label: string
  value: string
  component: React.ReactNode
}

export default function Home() {
  const platforms: Platform[] = [
    { label: "Codeforces", value: "codeforces", component: <CodeforcePage /> },
    { label: "LeetCode", value: "leetcode", component: <EmptyState /> },
    { label: "UVa", value: "uva", component: <EmptyState /> },
    { label: "CodeChef", value: "codechef", component: <EmptyState /> },
    { label: "atCoder", value: "atcoder", component: <EmptyState /> },
    { label: "Beecrowd", value: "beecrowd", component: <EmptyState /> },
    { label: "HackerRank", value: "hackerrank", component: <EmptyState /> },
  ]

  return (
    <main className="py-8 md:py-16">
      <section className="container mx-auto px-4">
        <Tabs defaultValue="codeforces" className="w-full">
          
          {/* Optimized Scrollable Tab List Container */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <TabsList className="inline-flex flex-nowrap items-center justify-start border mb-4 h-11 p-1 bg-muted/50 w-full min-w-max gap-1 rounded-xl">
              {platforms.map((p) => (
                <TabsTrigger 
                  key={p.value} 
                  value={p.value} 
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium transition-all rounded-lg data-[state=active]:shadow-sm"
                >
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content Display */}
          {platforms.map((p) => (
            <TabsContent key={p.value} value={p.value} className="focus-visible:outline-none focus-visible:ring-0 mt-2">
              {p.component}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
}