"use client";

import * as React from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { EllipsisVertical, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { getCodeforceLeaderboard, addUser, deleteUser } from "@/services/codeforce.service";
import { CodeforceUser } from "@/types/codeforce.type";
import { cn } from "@/lib/utils";

// Helper function to colorize Codeforces handles by rank style
const getRankColor = (rank: string) => {
  const r = rank?.toLowerCase() || ""
  if (r.includes("legendary") || r.includes("grandmaster")) return "text-red-600 font-bold"
  if (r.includes("master")) return "text-orange-500 font-bold"
  if (r.includes("candidate master")) return "text-violet-500 font-semibold"
  if (r.includes("expert")) return "text-blue-600 font-medium"
  if (r.includes("specialist")) return "text-cyan-600"
  if (r.includes("pupil")) return "text-green-600"
  if (r.includes("newbie")) return "text-muted-foreground"
  return "text-foreground"
}

export default function CodeforcePage() {
  const { mongoUser } = useAuth();
  const [handle, setHandle] = React.useState("");

  // Search & Pagination States
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const [users, setUsers] = React.useState<CodeforceUser[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [totalItems, setTotalItems] = React.useState(0);

  const loadUsers = async (page: number, search: string, rowLimit: number) => {
    setLoading(true);
    try {
      const data = await getCodeforceLeaderboard({
        page,
        limit: rowLimit,
        search,
      });
      if (data?.success) {
        setUsers(data.data);
        setTotalPages(data.meta.totalPages);
        setCurrentPage(data.meta.currentPage);
        setTotalItems(data.meta.totalItems);
      }
    } catch (error) {
      console.error("Error loading users: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search logic tracking state transformations
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadUsers(currentPage, searchTerm, limit);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm, limit]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAdd = async () => {
    if (!handle.trim()) return;
    setLoading(true);
    const res = await addUser(handle.trim());
    setLoading(false);
    
    if (res?.error) {
      alert(res.error);
      return;
    }
    setHandle("");
    loadUsers(currentPage, searchTerm, limit);
  };

  const handleDelete = async (userHandle: string) => {
    if (!confirm(`Are you sure you want to delete ${userHandle}?`)) return;
    setLoading(true);
    try {
      const res = await deleteUser(userHandle);
      if (res?.error) {
        alert(res.error);
      } else {
        // Adjust page step index if deleting the last remaining row item on a page
        const updatedTotal = totalItems - 1;
        const maxPagesAvailable = Math.ceil(updatedTotal / limit) || 1;
        const targetPage = currentPage > maxPagesAvailable ? maxPagesAvailable : currentPage;
        setCurrentPage(targetPage);
        loadUsers(targetPage, searchTerm, limit);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = mongoUser?.role === "admin";

  return (
    <div className="space-y-6">
      {/* INPUT / CONTROL SECTION */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/30 p-4 rounded-xl border">
        <div className="w-full md:w-72">
          <Input
            type="text"
            value={searchTerm}
            placeholder="Search leaderboard..."
            onChange={handleSearchChange}
            className="bg-background"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            type="text"
            value={handle}
            placeholder="Add Codeforces Handle"
            onChange={(e) => setHandle(e.target.value)}
            className="bg-background max-w-md"
          />
          <Button onClick={handleAdd} disabled={loading} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Updating..." : "Add Handle"}
          </Button>
        </div>
      </div>

      {/* LEADERBOARD TABLE LAYOUT */}
      <div className="rounded-md border bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 text-left">
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead>Handle</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Max Rating</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Country</TableHead>
              {isAdmin && <TableHead className="w-[80px] text-center"><EllipsisVertical className="h-4 w-4 mx-auto" /></TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8 text-muted-foreground">
                  {loading ? "Loading leaderboard data..." : "No competitive programmers found"}
                </TableCell>
              </TableRow>
            ) : (
              users.map((u: any, i: number) => {
                const globalIndex = (currentPage - 1) * limit + (i + 1);
                return (
                  <TableRow key={u._id || u.handle} className={cn(i % 2 === 1 && "bg-muted/30")}>
                    <TableCell className="text-center font-medium text-muted-foreground">{globalIndex}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7 border">
                          <AvatarImage src={u.avatar} alt={u.handle} />
                          <AvatarFallback className="text-[10px]">{u.handle?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className={cn("hover:underline cursor-pointer transition-colors", getRankColor(u.rank))}>
                            {u.handle}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{u.rating || 0}</TableCell>
                    <TableCell className="text-muted-foreground">{u.maxRating || 0}</TableCell>
                    <TableCell className="capitalize text-sm">{u.rank || "unrated"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{u.country || "unknown"}</TableCell>
                    {isAdmin && (
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleDelete(u.handle)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION PANEL CONTROLS */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-t pt-4">
          <Field orientation="horizontal" className="flex items-center gap-2">
            <FieldLabel className="text-sm text-muted-foreground shrink-0">
              Total items: <span className="font-medium text-foreground">{totalItems}</span>
            </FieldLabel>
            <Select value={limit.toString()} onValueChange={(val) => { setLimit(Number(val)); setCurrentPage(1); }}>
              <SelectTrigger className="w-20 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                  onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1); }} 
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;
                // Simple logic wrapper to display close pages to handle massive dynamic tables seamlessly
                if (totalPages > 5 && Math.abs(currentPage - pageNumber) > 1 && pageNumber !== 1 && pageNumber !== totalPages) {
                  if (pageNumber === 2 || pageNumber === totalPages - 1) {
                    return <PaginationItem key={i}><PaginationEllipsis /></PaginationItem>
                  }
                  return null;
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === pageNumber}
                      onClick={(e) => { e.preventDefault(); setCurrentPage(pageNumber); }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                  onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(currentPage + 1); }} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}