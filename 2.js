// 耗时 21 分钟
function sort(arr) {
  const res = [],
    pending = [];
  let head = null,
    tail = null;

  for (let i = 0; i < arr.length; i++) {
    const { before, after, first, last } = arr[i];
    if (first) {
      head = arr[i];
    } else if (last) {
      tail = arr[i];
    } else if (before) {
      const index = find(res, before)
      if (index > -1) {
        res.splice(index - 1, 0, arr[i]);
      } else {
        pending.push(arr[i]);
      }
    } else if (after) {
      const index = find(res, after)
      if (index > -1) {
        res.splice(index + 1, 0, arr[i]);
      } else {
        pending.push(arr[i]);
      }
    } else {
      res.push(arr[i]);
    }
  }

  if (pending.length) {
    for (let i = 0; i < pending.length; i++) {
      const { before, after } = pending[i];
      if (before) {
        const index = find(res, before)
        if (index > -1) {
          res.slice(index - 1, 0, arr[i]);
        }
      } else {
        const index = find(res, after)
        if (index > -1) {
          res.slice(index + 1, 0, arr[i]);
        }
      }
    }
  }

  return [head, ...res, tail];
}

const find = (res, id) => {
    return res.findIndex((item) => item.id === id);
}

console.log(
  sort([
    { id: 1 },
    { id: 2, before: 1 }, // 这里 before 的意思是自己要排在 id 为 1 的元素前面
    { id: 3, after: 1 }, // 这里 after 的意思是自己要排在 id 为 1 元素后面
    { id: 5, first: true },
    { id: 6, last: true },
    { id: 7, after: 8 }, // 这里 after 的意思是自己要排在 id 为 8 元素后面
    { id: 8 },
    { id: 9 },
  ])
);
