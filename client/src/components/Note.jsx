import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { useEffect, useMemo, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { debounce } from "@mui/material";

const Note = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { note } = useLoaderData();
  const [rawHTML, setRawHTML] = useState(note?.content);
  const location = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();

  const debounceMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note?.content) return;

      submit(
        { ...note, content: rawHTML },
        { method: "post", action: pathname }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debounceMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, rawHTML]);

  useEffect(() => {
    if (!note) {
      console.log("note doesn't existing");
      // return;
      navigate(-1);
    }
    const blocksFromHTML = convertFromHTML(note?.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id]);

  useEffect(() => {
    setRawHTML(note?.content);
  }, [note?.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    />
  );
};

export default Note;
