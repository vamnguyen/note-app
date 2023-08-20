import AuthorModel from "../models/AuthorModel.js";
import FolderModel from "../models/FolderModel.js";
import NoteModel from "../models/NoteModel.js";
// import {AuthorModel,FolderModel ,NoteModel,} from '../models/index.js'
import { GraphQLScalarType } from "graphql";
import { PubSub } from "graphql-subscriptions";
import NotificationModel from "../models/NotificationModel.js";

const pubsub = new PubSub();

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),

  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({ authorId: context.uid }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({ _id: folderId });
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  Folder: {
    author: async (parent, args) => {
      const { authorId } = parent;
      const author = await AuthorModel.findOne({ uid: authorId });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });

      pubsub.publish("FOLDER_CREATED", {
        folderCreated: { message: "A new folder created" },
      });

      await newFolder.save();
      return newFolder;
    },
    deleteFolder: async (parent, args) => {
      const folderId = args.id;

      try {
        // First, delete the notes associated with the folder
        await NoteModel.deleteMany({ folderId });

        // Then, delete the folder itself by its ID
        await FolderModel.findByIdAndDelete(folderId);

        return true;
      } catch (error) {
        console.error("Error deleting folder:", error);
        return false;
      }
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    deleteNote: async (parent, args) => {
      const noteId = args.id;

      try {
        // Delete the note by its ID
        await NoteModel.findByIdAndDelete(noteId);
        return true; // Return true to indicate successful deletion
      } catch (error) {
        console.error("Error deleting note:", error);
        return false; // Return false to indicate an error occurred
      }
    },
    pushNotification: async (parent, args) => {
      const newNotification = new NotificationModel(args);

      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.content,
        },
      });

      await newNotification.save();
      return { message: "SUCCESS" };
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED", "NOTE_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
