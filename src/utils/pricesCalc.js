export function getDejPrice(menu) {
    switch(menu) {
      case '5/7':
        return 2.14
      case '5/7*':
        return 2.25
      case '7/7':
        return 1.87
      default :
        return 2.43
    }
  }
  
export function getMealPrice(menu) {
    switch(menu) {
      case '5/7':
        return 4.23
      case '5/7*':
        return 4.47
      case '7/7':
        return 3.74
      default :
        return 4.81
    }
  }