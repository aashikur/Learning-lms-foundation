"use client";
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
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react";
import {
  addUser,
  deleteUser,
  getCodeforceLeaderboard,
} from "@/services/codeforce.service";
import { Delete, EllipsisVertical, Plus, Trash2 } from "lucide-react";

export default function CodeforcePage() {
  const [handle, setHandle] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    const data = await getCodeforceLeaderboard();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

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

    loadUsers(); // refresh table
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
      loadUsers(); // refresh table
    });
  };

  return (
    <div className="">
      {/* INPUT SECTION */}

      <Field orientation="horizontal" className="my-6 justify-center ">
        <Input
          type="search"
          value={handle}
          placeholder="Add Your Codeforce Handle"
          onChange={(e) => setHandle(e.target.value)}
        />
        <Button
          className="py-5 px-4"
          onClick={handleAdd}

        >

          <Plus className="h-4 w-4" />
          Add  Handle
        </Button>
      </Field>



      {/* TABLE */}


      <Table>
        <TableCaption>Codeforces Leaderboard</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Handle</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Max Rating</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="text-center max-w-[100px] ml-auto flex justify-end">
             <span> <EllipsisVertical className="h-4 w-4" /></span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u: any, i: number) => (
            <TableRow key={u.handle} className="border-t text-center">
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
              <TableCell className="text-right max-w-[100px]">

                <Button
                  onClick={() => handleDelete(u.handle)}
                  variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>



    </div>
  );
}