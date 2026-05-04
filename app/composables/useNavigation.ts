export const useNavigation = () => {
  const route = useRoute()
  const isActive = (item) => {
    if (route.fullPath === item.to) return true
    return route.fullPath.includes(item.to)
  }

  return {isActive}
}
