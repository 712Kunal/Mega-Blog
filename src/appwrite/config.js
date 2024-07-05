import conf from "../Config/Conf"
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Services {
    client = new Client;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async CreatePost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const posted = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,    
                    status,
                    userId
                }
            );

            return posted;
        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error", error);
            throw error;
        }
    }


    async UpdatePost(slug, { title, content, featuredImage, status }) {
        try {
            const updatepost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //slug contains the document Id
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

            return updatepost;

        } catch (error) {
            console.log("Appwrite Service :: UpdatePost :: error", error);
        }
    }

    async DeletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //slug contains the document Id
                slug
            )

            return true;

        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error", error);
            return false;
        }
    }

    async GetPost(slug) {
        try {
            const getpost = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return getpost;

        } catch (error) {
            console.log("Appwrite Service :: GetPost :: error", error);
            return false;
        }
    }
    

    async GetPosts(userId) {
        try {
            const queries = [
                Query.equal("status","active"),
                Query.equal("userId",userId)
            ]

            const getsposts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );

            return getsposts;

        } catch (error) {
            console.log("Appwrite Service :: GetPosts :: error", error);
            return false;
        }
    }

    async UploadFile(file) {
        try {
            const uploadfile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

            return uploadfile;
        } catch (error) {
            console.log("Appwrite Service :: UploadFile :: error", error);
            throw error; // Rethrow the error to handle it in the component
        }
    }


    async DeleteFile(fileid) {
        try {
            this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileid
            )

            return true;

        } catch (error) {
            console.log("Appwrite Service :: DeleteFile :: error", error);
            return false;
        }
    }

    async GetFilePreview(fileid) {
        const url = await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileid
        );
        const imageUrl = url.href;
        return imageUrl;
    }
    
}

const services = new Services();

export default services