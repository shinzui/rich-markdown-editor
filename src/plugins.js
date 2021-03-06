// @flow
import InsertImages from "@tommoor/slate-drop-or-paste-images";
import PasteLinkify from "slate-paste-linkify";
import CollapseOnEscape from "slate-collapse-on-escape";
import TrailingBlock from "slate-trailing-block";
import EditCode from "slate-edit-code";
import Prism from "slate-prism";
import EditList from "./plugins/EditList";
import KeyboardShortcuts from "./plugins/KeyboardShortcuts";
import MarkdownShortcuts from "./plugins/MarkdownShortcuts";
import MarkdownPaste from "./plugins/MarkdownPaste";
import Ellipsis from "./plugins/Ellipsis";
import { insertImageFile } from "./changes";

const createPlugins = () => {
  return [
    PasteLinkify({
      type: "link",
      collapseTo: "end",
    }),
    InsertImages({
      extensions: ["png", "jpg", "gif", "webp"],
      insertImage: async (change, file, editor) => {
        return change.call(insertImageFile, file, editor);
      },
    }),
    EditList,
    EditCode({
      containerType: "code",
      lineType: "code-line",
      exitBlocktype: "paragraph",
      allowMarks: false,
      selectAll: true,
    }),
    Prism({
      onlyIn: node => node.type === "code",
      getSyntax: node => "javascript",
    }),
    CollapseOnEscape({ toEdge: "end" }),
    TrailingBlock({ type: "paragraph" }),
    KeyboardShortcuts(),
    MarkdownShortcuts(),
    MarkdownPaste(),
    Ellipsis(),
  ];
};

export default createPlugins;
