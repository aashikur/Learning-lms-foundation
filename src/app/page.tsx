"use client"
import CodeforcePage from "@/components/sections/CodeforcePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyState from "@/components/empty-state/EmptyState";

export default function Home() {
  const platforms = [
    { label: "Codeforces", value: "codeforces" },
    { label: "LeetCode", value: "leetcode" },
    { label: "UVa", value: "uva" },
    { label: "CodeChef", value: "codechef" },
    { label: "atCoder", value: "atcoder" },
  ]
  return (
    <>
      <main className="py-12 md:py-16">
        <section className="container mx-auto">

          <Tabs defaultValue="codeforces" >
            <TabsList className="flex items-center justify-center border mb-6 w-full">
              {platforms.map((p) => (
                <TabsTrigger key={p.value} value={p.value}>
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="codeforces">
              <CodeforcePage />
            </TabsContent>

            <TabsContent value="beecrowd">
              <EmptyState />
            </TabsContent>


            <TabsContent value="leetcode">
              <EmptyState />
            </TabsContent>
            <TabsContent value="uva">
              <EmptyState />
            </TabsContent>
            <TabsContent value="codechef">
              <EmptyState />
            </TabsContent>
            <TabsContent value="hackerrank">
              <EmptyState />
            </TabsContent>
            <TabsContent value="atcoder">
              <EmptyState />
            </TabsContent>
          </Tabs>

        </section>
      </main>
    </>
  );
}
