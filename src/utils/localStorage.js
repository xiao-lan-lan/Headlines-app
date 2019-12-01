// 本地存储模块

// 存
export const setItem = function (name, value) {
  window.localStorage.setItem(name, JSON.stringify(value))
}

// export function setItem (name, value) {
//   window.localStorage.setItem(name, JSON.stringify(value))
// }

// 取
export const getItem = function (name) {
  return JSON.parse(window.localStorage.getItem(name))
}

// 删
export const removeItem = function (name) {
  window.localStorage.removeItem(name)
}
