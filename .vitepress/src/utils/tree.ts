import _ from 'lodash';


// 定义通用的树形结构类型
type TreeNode<T> = T & {
  [childrenKey: string]: TreeNode<T>[] | undefined;
};

/**
 * 递归展平树形结构
 * @param tree 树形结构的根节点
 * @param childrenKey 子节点数组的属性名（如 'children' 或 'items'）
 * @returns 展平后的节点数组
 */
export function flattenTree<T extends Record<string, any>>(
  tree: TreeNode<T>,
  childrenKey: string
): TreeNode<T>[] {
  const result: TreeNode<T>[] = [tree];
  const children = tree[childrenKey] as TreeNode<T>[] | undefined;
  
  if (children) {
    for (const child of children) {
      result.push(...flattenTree(child, childrenKey));
    }
  }
  return result;
}


/**
 * 递归展平树形结构并按指定键生成索引对象
 * @param tree 树形结构的根节点
 * @param childrenKey 子节点数组的属性名（如 'children' 或 'items'）
 * @param keyProp 作为键的属性名（如 'name' 或 'id'）
 * @returns 按 keyProp 索引的对象
 */
export function flattenTreeToKeyedObject<T extends Record<string, any>>(
  tree: TreeNode<T>,
  childrenKey: string,
  keyProp: string
): Record<string, TreeNode<T>> {
  const flattened = flattenTree(tree, childrenKey);
  return _.keyBy(flattened, keyProp);
}
