import { Comment } from "./comments";

export type Post = {
    id: string;
    title: string;
    comment: Comment[];
}