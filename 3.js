// 耗时 12 分钟
function toTree(arr) {
  const map = new Map()
  const res = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw Error('请传入对象类型')
    }
    if (!item.hasOwnProperty('id') || typeof item.id !== 'number') {
      throw Error('id 不存在或类型错误')
    }
    if (!item.hasOwnProperty('name') || typeof item.name !== 'string') {
      throw Error('name 不存在或类型错误')
    }
    if (item.hasOwnProperty('parentId') && typeof item.parentId !== 'number') {
      throw Error('parentId 类型错误')
    }
    map.set(item.id, item)
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (!item.hasOwnProperty('parentId')) {
      res.push(item);
    } else {
      const { parentId } = item
      if (!map.has(parentId)) {
        throw Error(`不存在 id 为 ${parentId} 的父节点`)
      }
      const node = map.get(parentId)
      let children = node.children ? node.children : [];
      children.push(item);
      node.children = children;
    }
  }
  return res
}

console.log(toTree([
  { id: 2, name: "i2", parentId: 1 },
  { id: 1, name: "i1" },
  { id: 4, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 8, name: "i8", parentId: 2 },
]));