import Navbar from "@/components/layout/Navbar";
import CodeforcePage from "@/components/sections/CodeforcePage";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyState from "@/components/empty-state/EmptyState";

export default function Home() {
  return (
    <>
      <main className="py-12 md:py-16">
        <section className="container mx-auto">

          <Tabs defaultValue="codeforces" className="">
            <TabsList className="justify-start mb-6 border-b">
              <TabsTrigger value="codeforces">Codeforces</TabsTrigger>
              <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
              <TabsTrigger value="uva">UVa</TabsTrigger>
              <TabsTrigger value="codechef">CodeChef</TabsTrigger>

              <TabsTrigger value="atcoder">atCoder</TabsTrigger>
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
