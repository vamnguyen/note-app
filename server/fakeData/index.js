export default {
  authors: [
    {
      id: 123,
      name: "VAM",
    },
    {
      id: 999,
      name: "VAM Nguyen",
    },
    {
      id: 69,
      name: "Minh Nguyen",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Home",
      createdAt: "2022-11-18T03:42:13Z",
      authorId: 123,
    },
    {
      id: "2",
      name: "Game",
      createdAt: "2022-10-18T03:42:13Z",
      authorId: 999,
    },
    {
      id: "3",
      name: "Work",
      createdAt: "2022-09-18T03:42:13Z",
      authorId: 69,
    },
  ],
  notes: [
    {
      id: "1",
      content: "<p>Go to supermarket</p>",
      folderId: "1",
    },
    {
      id: "2",
      content: "<p>Go to park</p>",
      folderId: "2",
    },
    {
      id: "3",
      content: "<p>Go to school</p>",
      folderId: "3",
    },
  ],
};
