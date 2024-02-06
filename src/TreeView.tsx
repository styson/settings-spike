import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useCallback, useState } from 'react';
import { TreeNode } from './MockApi';

export declare type TreeViewProps<T> = {
  nodes: TreeNode<T>[];
  onItemClick?: (node: TreeNode<T>) => void;
};

export declare type TreeNodeProps<T> = {
  indent?: number;
  node: TreeNode<T>;
  onClick?: (node: TreeNode<T>) => void;
  parent?: TreeNode<T>;
};

export function TreeNodeItem<T>(props: TreeNodeProps<T>) {
  const { indent = 2, node, onClick, parent } = props;
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(!open);
    if (onClick) {
      onClick(node);
    }
  }, [node, open, setOpen, onClick]);

  if (!node.children?.length) {
    return (
      <ListItemButton sx={parent ? { pl: indent } : {}} onClick={handleClick}>
        <ListItemIcon>
          <TextSnippetIcon />
        </ListItemIcon>
        <ListItemText primary={node.name} secondary={node.value} />
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
          <TreeNodeItem
            key={child.id}
            node={child}
            parent={node}
            indent={indent + 1}
            onClick={onClick}
          />
        ))}
      </Collapse>
    </>
  );
}

export function TreeView<T>(props: TreeViewProps<T>) {
  const { nodes, onItemClick } = props;
  return (
    <>
      {nodes.map((node) => (
        <List key={node.id} disablePadding>
          <TreeNodeItem node={node} onClick={onItemClick} />
        </List>
      ))}
    </>
  );
}
