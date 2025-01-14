"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/share-buttons";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { Copy, Edit } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface PostCardProps {
  className?: string;
  data: {
    title: string;
    content: string;
    id: string;
    userId: string;
    imageUrl: string;
  };
  authorImage: string;
  username: string;
  onClick?: () => void;
  logedInId: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  className,
  data,
  username,
  onClick,
  authorImage,
  logedInId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex py-20 items-center justify-center">
      <Card
        onClick={onClick}
        className={cn("lg:w-[650px] sm:w-[500px] w-full select-none", className)}
      >
        <CardHeader>
          <CardTitle className="font-bold tracking-tight">
            {data.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <CardDescription>
              <div className="mt-4 flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage src={authorImage} />
                </Avatar>
                @{username}
                <Link href={`/profile/${data.userId}`} className="ml-4">
                  <p className="hover:underline text-zinc-400 transition">
                    View Profile
                  </p>
                </Link>
              </div>
              {logedInId === data.userId ? <Button variant='outline' className="mt-4 items-center" onClick={() => router.push(`/feed/${data.id}/edit`)}><Edit className="h-4 w-4" /> <span className="ml-2">Edit Post</span></Button> : null}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
            {data.content}
          </p>
          <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-cover">
            <Image
              src={data.imageUrl}
              fill
              alt="Post Image"
              className="rounded-lg"
            />
          </div>
        </CardContent>

        <CardFooter className="w-full">
          <Dialog>
            <DialogTrigger className="w-full">
              <Button className="w-full">Share</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share This Post</DialogTitle>
                <DialogDescription>
                  Anyone with the post link will be able to view this post.
                </DialogDescription>
              </DialogHeader>
              <br />
              <h2>Social media</h2>
              <Separator />
              <div className="flex gap-2">
                <ShareButtons
                  urlFacebook={`${window.location}/${data.id}`}
                  urlReddit={`${window.location}/${data.id}`}
                />
              </div>
              <br />
              <h2>Link</h2>
              <Input defaultValue={`${window.location}/${data.id}`} readOnly />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location}/${data.id}`
                  );
                  setIsCopied(true);
                }}
                size="sm"
                className="px-3"
              >
                {!isCopied ? <Copy size={20} /> : "Copied!"}
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};
