import { getUserFromCookies } from "@/helper";
import db from "@/services/prisma";
import { Blog } from "../../../../../generated/prisma";

export async function getBlogById(x: any, args: { id: string }) {
    const id = args.id;
    const blog = await db.blog.findUnique({
        where: {
            id: id
        }
    });
    return blog
}

export async function searchBlogByQuery(x: any, args: { q: string }) {
    const q = args?.q ?? "";
    const blogs = await db.blog.findMany({
        where: {
            OR:
                [
                    {
                        title: {
                            contains: q,
                            mode: "insensitive"
                        }
                    },
                    {
                        content: {
                            contains: q,
                            mode: "insensitive"
                        }
                    }
                ]
        }
    });
    return blogs;
}

export async function getBlogs() {
    const blogs = await db.blog.findMany();
    return blogs;
}

export async function createNewBlog(x: any, args: any) {

    const user = await getUserFromCookies();
    if (!user) throw new Error("Authentication required");

    const blogToSave = {
        user_id: user.id,
        title: args.title,
        content: args.content,
        imageUrl: args.imageUrl
    };

    try {
        const blog = await db.blog.create({
            data: blogToSave
        });
        return blog;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteBlogFromDB(x: any, args: {
    id: string
}) {
    const id = args.id;
    try {
        await db.blog.delete({
            where: {
                id: id
            }
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateBlog(x: any, args: {
    id: string,
    title?: string,
    content?: string,
    imageUrl?: string
}) {
    const { id, title, content, imageUrl } = args;
    const dataToSave = {
        title,
        content,
        imageUrl
    }
    try {
        const res = await db.blog.update({
            where: {
                id: id
            },
            data: dataToSave
        })
        if (res) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
    }
}

export async function getBlogUser(blog: Blog) {
    const { user_id } = blog;

    try {
        const user = await db.user.findUnique({
            where: {
                id: user_id
            },
            omit: {
                password: true,
            }
        });

        return user;

    } catch (error) {
        console.error(error);
    }

}

export async function getSelectedUserBlogs(_: any, args: {
    id: string
}) {
    const { id } = args;
    try {
        const blogs = await db.blog.findMany({
            where: {
                user_id: id
            }
        });
        return blogs;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export async function getSuggestions(_: any, args: {
    q: string
}) {
    const { q } = args;
    try {
        const sugg = await db.blog.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: q,
                            mode: "insensitive"
                        }
                    },
                    {
                        content: {
                            contains: q,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });
        return sugg;
    } catch (error) {
        console.error(error);
        return null;
    }
}