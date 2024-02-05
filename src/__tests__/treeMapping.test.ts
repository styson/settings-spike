import { settings, createTree } from '../MockApi';
import { TreeNode } from '../types';

function verifySetting(node: TreeNode, id: string): TreeNode | null {
  // If the current node matches the target, return the node
  if (node.id === id) {
    // console.log(` node id = ${node.id}`);
    return node;
  }

  // Traverse through the children of the current node
  if (node.children) {
    // console.log(`node '${node.id}' has ${node.children.length} ${node.children.length == 1 ? 'child' : 'children'}`);
    for (const child of node.children) {
      // Recursively search for the matching  node in each child
      const matchingNode = verifySetting(child, id);

      // If a matching node is found in any child, return it
      if (matchingNode !== null) {
        return matchingNode;
      }
    }
  }

  // If no matching node is found in the current subtree, return null
  return null;
}

describe('TreeView', () => {
  test('find expected settings in tree view', () => {
    const nodes = createTree(settings);
    if (!nodes) return;

    expect(verifySetting(nodes, 'test#us-west-2#missing')).toBeNull();

    expect(verifySetting(nodes, 'test#us-west-2#qa1')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#qa1')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#qa3svc')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-813aad7')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#branch-8528')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#qa1svc')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#qa2svc')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#qa2')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#web')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-d7d6a10b6df09e271684')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#build-13139')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-23c522f')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#devsvc')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-084a6ee')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#qa3')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-0442cdb')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-b6eab09')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-e053747')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#branch-master')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#deployment-135f5d4')).not.toBeNull();
    expect(verifySetting(nodes, 'test#us-west-2#branch-current')).not.toBeNull();
  });
});
