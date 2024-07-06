import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../Index";
import services from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authservice from "../../appwrite/auth";

export default function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [imageFile, setImageFile] = useState(null)
    const [error, setError] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(URL.createObjectURL(file));
        }
    }

    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);

    const submit = async (data) => {

        try {
            if (post) {
                const file = data.image[0] ? await services.UploadFile(data.image[0]) : null;

                if (file) {
                    await services.DeleteFile(post.featuredImage);
                }

                const dbPost = await services.UpdatePost(post.$id, {
                    ...data,
                    content: data.content,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {

                const file = await services.UploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    const user = await authservice.GetCurrentUser();
                    const USERID = user.$id;
                    console.log("The newly id is:", USERID);

                    // Generate a unique ID for the new post

                    if (!data.content || !data.featuredImage || !data.title || !data.slug) {
                        setError("All fields are required");
                    }

                    const dbPost = await services.CreatePost({ ...data, userId: USERID });

                    if (dbPost) {
                        navigate("/all-posts");
                    }
                }
            }
        } catch (error) {
            console.error("Error occurred during form submission:", error);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const getImageUrl = async (fileId) => {
            try {
                const urlImage = await services.GetFilePreview(fileId);
                setImageUrl(urlImage);
            } catch (error) {
                console.log("Resolved image :: error :", error.message);
                setImageUrl(null);
            }
        }

        if (post && post.featuredImage) {
            getImageUrl(post.featuredImage); // Call getImageUrl when post or featuredImage changes
        }

        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mt-20 text-white
        bg-opacity-5 backdrop-blur-md text-xl p-2 rounded-xl z-30">

            {error && <p className="z-[100] text-xl text-white bg-yellow-400">{error}</p>}

            <div className="w-2/3 px-2 z-30">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 z-50"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2 z-30">

                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onInput={handleImageChange}
                />

                {imageFile && (
                    <div className="w-full mb-4 z-30">
                        <img
                            src={imageFile}
                            alt="upload the image"
                            className="rounded-lg"
                        />
                    </div>
                )}

                {post && (
                    <div className="w-full mb-4 z-30">
                        <img
                            src={imageUrl}
                            alt="upload the image"
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}