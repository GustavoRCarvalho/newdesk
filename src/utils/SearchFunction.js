export function onEnterSearch(e) {
  if (e.key !== "Enter") return

  const text = e.target.value
  console.log(text)
}
