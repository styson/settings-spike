export declare type Setting = {
  id: string;
  path: string;
  key: string;
  value: string;
};

export declare type TreeNode = {
  id: string;
  name: string,
  children?: TreeNode[];
  value?: string;
};
