"use client";
import { Field, FieldLabel } from "@/components/ui/field"

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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useEffect, useRef, useState } from "react";
import {
  addUser,
  deleteUser,
  getCodeforceLeaderboard,
} from "@/services/codeforce.service";
import { Delete, EllipsisVertical, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { CodeforceUser } from "@/types/codeforce.type";

export default function CodeforcePage() {
  const [handle, setHandle] = useState("");

  // 2. Search & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const [users, setUsers] = useState<CodeforceUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const loadUsers = async (currentPage: number, searchTerm: string, limit: number) => {
    setLoading(true);
    try {
      const data = await getCodeforceLeaderboard({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        
      });
      console.log('==========: ', data);

      setUsers(data.data);
      setTotalPages(data.meta.totalPages);
      setCurrentPage(data.meta.currentPage);
      setTotalItems(data.meta.totalItems);
    } catch (error) {
      console.log("error loading users: ", error)
    } finally {
      setLoading(false)
    }
  };


  // 4. Debounced Side-Effect Hook
  // Refetches data when currentPage changes OR 300ms after user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadUsers(currentPage, searchTerm, limit);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm, limit]);


  // 5. Reset pagination to page 1 whenever someone updates the search filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const handleAdd = async () => {
    if (!handle) return;

    setLoading(true);

    const res = await addUser(handle);

    setLoading(false);
    setHandle("");

    if (res.error) {
      alert(res.error);
      return;
    }

    loadUsers(currentPage, searchTerm, limit);
  };

  const handleDelete = async (handle: string) => {
    if (!confirm(`Are you sure you want to delete ${handle}?`)) return;
    setLoading(true);
    deleteUser(handle).then((res) => {
      setLoading(false);
      if (res.error) {
        alert(res.error);
        return;
      }
      loadUsers(currentPage, searchTerm, limit); // refresh table
    });
  };

  const { mongoUser } = useAuth();

  return (
    <div className="">
      {/* INPUT SECTION */}

      <Field orientation="horizontal" className="my-6 justify-center ">
        {/* Leaderboard Search Filter */}
        <div className="w-full md:w-72">
          <Input
            type="text"
            value={searchTerm}
            placeholder="Search leaderboard..."
            onChange={handleSearchChange}
          />
        </div>

        {/* Add Handle System */}
        <Field orientation="horizontal" className="justify-center gap-2">
          <Input
            type="search"
            value={handle}
            placeholder="Add Your Codeforce Handle"
            onChange={(e) => setHandle(e.target.value)}
          />

          <Button
            className="py-5 px-4"
            onClick={handleAdd}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            {loading ? "Updating..." : "Add  Handle"}
          </Button>
        </Field>
      </Field>



      {/* TABLE */}


      <Table>
        {/* <TableCaption>Codeforces Leaderboard</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-muted text-left">
            <TableHead>#</TableHead>
            <TableHead>Handle</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Max Rating</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Country</TableHead>
            {
              mongoUser?.role === "admin" && (
                <TableHead className="text-center max-w-25 ml-auto flex justify-end items-center mr-3">
                  <span> <EllipsisVertical className="h-4 w-4" /></span>
                </TableHead>
              )
            }
          </TableRow>
        </TableHeader>

        <TableBody>
          {

            users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No users found</TableCell>
              </TableRow>
            ) : (

              users.map((u: any, i: number) => (
                <TableRow key={u.handle} className="border-t text-left">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <div className="text-left">
                      <div>{u.handle} </div>
                      <div className="text-[10px] text-muted-foreground">
                        {u.handle}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{u.rating}</TableCell>
                  <TableCell>{u.maxRating}</TableCell>
                  <TableCell>{u.rank}</TableCell>
                  <TableCell>{u.country}</TableCell>
                  {
                    mongoUser?.role === "admin" && (
                      <TableCell className="text-right max-w-25">
                        <Button
                          onClick={() => handleDelete(u.handle)}
                          variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )
                  }
                </TableRow>
              ))

            )

          }
        </TableBody>
      </Table>


      {/* // paginatoin  */}
      <div className="flex items-center  py-4 mt-5 gap-2">
        {
          totalPages > 1 && (<Field orientation="horizontal" className="w-fit">
            <FieldLabel className="max-w-fit w-100" htmlFor="select-rows-per-page">Total : {totalItems}</FieldLabel>
            <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
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
          </Field>)

        }


        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }} />
              </PaginationItem>


              {
                Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNumber);
                      }}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })
              }

              {
                totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>)}

      </div>
    </div>
  );
}


// {
//     "success": true,
//     "data": [
//         {
//             "_id": "6a270893f2dc19cab4680364",
//             "handle": "strapple",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/1569515/avatar/40caebea5869f243.jpg",
//             "country": "China",
//             "maxRating": 3515,
//             "rank": "legendary grandmaster",
//             "rating": 3515
//         },
//         {
//             "_id": "6a2dd5eda6a69e2c03a3eb1a",
//             "handle": "DFS",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
//             "country": "Poland",
//             "maxRating": 1849,
//             "rank": "expert",
//             "rating": 1617
//         },
//         {
//             "_id": "6a2dd628a6a69e2c03a3eb26",
//             "handle": "Amin",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/34180/avatar/f0c6e58907983dfd.jpg",
//             "country": "Egypt",
//             "maxRating": 1424,
//             "rank": "specialist",
//             "rating": 1424
//         },
//         {
//             "_id": "6a2d7c15a6a69e2c03a3dc12",
//             "handle": "islomjon_yd",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/4816396/avatar/6e513e6226fb9b4f.jpg",
//             "country": "Tajikistan",
//             "maxRating": 1169,
//             "rank": "newbie",
//             "rating": 1048
//         },
//         {
//             "_id": "6a2dd5e7a6a69e2c03a3eb19",
//             "handle": "fdfd",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
//             "country": "unknown",
//             "maxRating": 889,
//             "rank": "newbie",
//             "rating": 889
//         },
//         {
//             "_id": "6a2dd247a6a69e2c03a3ea91",
//             "handle": "AAAs",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
//             "country": "unknown",
//             "maxRating": 1366,
//             "rank": "newbie",
//             "rating": 805
//         },
//         {
//             "_id": "6a2dd5e2a6a69e2c03a3eb16",
//             "handle": "anik",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/96358/avatar/5d01f2c2651622b7.jpg",
//             "country": "Bangladesh",
//             "maxRating": 787,
//             "rank": "newbie",
//             "rating": 787
//         },
//         {
//             "_id": "6a2dd5fba6a69e2c03a3eb1d",
//             "handle": "dfdf",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/4200979/avatar/184d1c3a60be1ffd.jpg",
//             "country": "unknown",
//             "maxRating": 406,
//             "rank": "newbie",
//             "rating": 406
//         },
//         {
//             "_id": "6a2dd5d7a6a69e2c03a3eb13",
//             "handle": "Asde",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
//             "country": "unknown",
//             "maxRating": 0,
//             "rank": "unrated",
//             "rating": 0
//         },
//         {
//             "_id": "6a2dd23da6a69e2c03a3ea8e",
//             "handle": "Assa",
//             "__v": 0,
//             "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
//             "country": "unknown",
//             "maxRating": 0,
//             "rank": "unrated",
//             "rating": 0
//         }
//     ],
//     "meta": {
//         "totalItems": 12,
//         "totalPages": 2,
//         "currentPage": 1,
//         "itemsPerPage": 10,
//         "hasNextPage": true,
//         "hasPrevPage": false
//     }
// }