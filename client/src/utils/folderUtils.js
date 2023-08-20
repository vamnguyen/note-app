import { graphqlRequest } from "./request";

export const folderLoader = async () => {
  const query = `query Folders {
    folders {
      id
      name
      createAt
    }
  }`;

  const data = await graphqlRequest({ query });
  return data;
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphqlRequest({
    query,
    variables: { name: newFolder.name },
  });
  return data;
};

export const deleteFolderById = async (folderId) => {
  const query = `mutation DeleteFolder($deleteFolderId: String!) {
    deleteFolder(id: $deleteFolderId)
  }`;
  const { deleteFolder } = await graphqlRequest({
    query,
    variables: {
      deleteFolderId: folderId,
    },
  });

  return deleteFolder;
};
