// @flow
import * as React from "react";
import styled from "styled-components";
import { Editor } from "slate-react";
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  BlockQuoteIcon,
  LinkIcon,
  StrikethroughIcon,
} from "outline-icons";
import ToolbarButton from "./ToolbarButton";

type Props = {
  editor: Editor,
  onCreateLink: (SyntheticEvent<*>) => *,
};

class FormattingToolbar extends React.Component<Props> {
  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */
  hasMark = (type: string) => {
    return this.props.editor.value.marks.some(mark => mark.type === type);
  };

  isBlock = (type: string) => {
    const startBlock = this.props.editor.value.startBlock;
    return startBlock && startBlock.type === type;
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} ev
   * @param {String} type
   */
  onClickMark = (ev: SyntheticEvent<*>, type: string) => {
    ev.preventDefault();
    this.props.editor.change(change => change.toggleMark(type));
  };

  onClickBlock = (ev: SyntheticEvent<*>, type: string) => {
    ev.preventDefault();
    this.props.editor.change(change => change.setBlocks(type));
  };

  handleCreateLink = (ev: SyntheticEvent<*>) => {
    ev.preventDefault();
    ev.stopPropagation();

    const data = { href: "" };
    this.props.editor.change(change => {
      change.wrapInline({ type: "link", data });
      this.props.onCreateLink(ev);
    });
  };

  renderMarkButton = (type: string, IconClass: Function) => {
    const isActive = this.hasMark(type);
    const onMouseDown = ev => this.onClickMark(ev, type);

    return (
      <ToolbarButton onMouseDown={onMouseDown} active={isActive}>
        <IconClass light />
      </ToolbarButton>
    );
  };

  renderBlockButton = (type: string, IconClass: Function) => {
    const isActive = this.isBlock(type);
    const onMouseDown = ev =>
      this.onClickBlock(ev, isActive ? "paragraph" : type);

    return (
      <ToolbarButton onMouseDown={onMouseDown} active={isActive}>
        <IconClass light />
      </ToolbarButton>
    );
  };

  render() {
    return (
      <span>
        {this.renderMarkButton("bold", BoldIcon)}
        {this.renderMarkButton("italic", ItalicIcon)}
        {this.renderMarkButton("deleted", StrikethroughIcon)}
        {this.renderMarkButton("code", CodeIcon)}
        <Separator />
        {this.renderBlockButton("heading1", Heading1Icon)}
        {this.renderBlockButton("heading2", Heading2Icon)}
        {this.renderBlockButton("block-quote", BlockQuoteIcon)}
        <Separator />
        <ToolbarButton onMouseDown={this.handleCreateLink}>
          <LinkIcon light />
        </ToolbarButton>
      </span>
    );
  }
}

const Separator = styled.div`
  height: 100%;
  width: 1px;
  background: #fff;
  opacity: 0.2;
  display: inline-block;
  margin-left: 10px;
`;

export default FormattingToolbar;
