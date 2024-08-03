const mongoose = require('mongoose');
const Blog = require('../model/Blog');
const {request, response} = require("express");

const fetchListOfBlogs = async (request, response) => {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch(error) {
        console.error(error);
    }

    if (!blogList) {
        return response.status(404).json({ message: 'No Blogs Found' });
    }

    return response.status(200).json({ blogList });
}

const addNewBlog = async (request, response) => {
    const { title, description } = request.body;
    const currentDate = new Date();

    const newlyCreatedBlog = new Blog({
        title,
        description,
        date: currentDate,
    });

    try {
        await newlyCreatedBlog.save();
    } catch(error) {
        console.error(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreatedBlog.save(session);
        session.commitTransaction();
    } catch (e) {
        console.error(e);
    }

    return response.status(200).json({ newlyCreatedBlog });
}

const deleteABlog = async (request, response) => {
    const id = request.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);

        if (!findCurrentBlog) {
            return response.status(404).json({ message: 'Blog not found' });
        }

        return response.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Unable to delete. Please, try again.' });
    }
}

const updateABlog = async (request, response) => {
    const id = request.params.id;

    const { title, description} = request.body;
    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
            title, description,
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({ message: 'Something went wrong while updating, please, try again' });
    }

    if (!currentBlogToUpdate) {
        return response.status(500).json({ message: 'Unable to update' });
    }

    return response.status(200).json({ currentBlogToUpdate });
}

module.exports = { fetchListOfBlogs, addNewBlog, deleteABlog, updateABlog };