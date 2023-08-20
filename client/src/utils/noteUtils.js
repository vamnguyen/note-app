/* eslint-disable no-unused-vars */
import { graphqlRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      createAt
      notes {
        id
        content
        updatedAt
      }
    }
  }
  `;

  const data = await graphqlRequest({ query, variables: { folderId } });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }
  `;

  const data = await graphqlRequest({ query, variables: { noteId } });
  return data;
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  console.log("noteUtils.js ~ addNewNote ~ newNote:", newNote);
  console.log("noteUtils.js ~ addNewNote ~ formDataObj:", formDataObj);

  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const { addNote } = await graphqlRequest({ query, variables: formDataObj });
  console.log("noteUtils.js ~ addNewNote ~ addNote:", addNote);

  return addNote;
};

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));
  console.log("updateNote ~ updatedNote:", updatedNote);
  console.log("updateNote ~ formDataObj:", formDataObj);

  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;
  const { updateNote } = await graphqlRequest({
    query,
    variables: formDataObj,
  });
  console.log(
    "🚀 ~ file: noteUtils.js:73 ~ updateNote ~ updateNote:",
    updateNote
  );
  return updateNote;
};

export const deleteNoteById = async (noteId) => {
  const query = `mutation DeleteNote($deleteNoteId: String!) {
    deleteNote(id: $deleteNoteId)
  }`;
  const { deleteNote } = await graphqlRequest({
    query,
    variables: { deleteNoteId: noteId },
  });
  return deleteNote;
};
