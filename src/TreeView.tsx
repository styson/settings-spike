import React, { useState } from 'react';
import { TreeNode } from './MockApi';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export declare type TreeViewProps = {
  nodes: TreeNode[];
};

export declare type TreeNodeProps = {
  indent?: number;
  node: TreeNode;
  parent?: TreeNode;
};

export const TreeNodeItem: React.FC<TreeNodeProps> = ({ indent = 2, node, parent }) => {
  const [open, setOpen] = useState(false);

    const handleItemClick = (node: TreeNode) => {
      console.dir(`clicked setting with value '${node.value}`);
    };

    const handleClick = () => {
      setOpen(!open);
    };

  if (!node.children?.length) {
    return (
      <ListItemButton id={node.id} sx={parent ? { pl: indent } : {}}>
        <ListItemIcon>
          <TextSnippetIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => handleItemClick(node)}
          primary={node.name}
          secondary={node.value}
        />
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton onClick={handleClick} sx={parent ? { pl: indent } : {}}>
        <ListItemIcon>
          {!open && <KeyboardArrowRightIcon />}
          {open && <KeyboardArrowDownIcon />}
        </ListItemIcon>
        <ListItemText primary={node.name} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {node.children.map((child) => (
          <TreeNodeItem node={child} parent={node} indent={indent * 1.6} />
        ))}
      </Collapse>
    </>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node) => (
        <List disablePadding dense>
          <TreeNodeItem node={node} />
        </List>
      ))}
    </>
  );
};
