import type { Style } from "@/stores/redux/style/slice"

/**
 * 12.5 (pure css)
 */
const styles: {[key in Style]: React.CSSProperties} = {
  "block": {
    borderRadius: "0",
  },
  "round": {
    borderRadius: "calc(infinity * 1px)",
  },
}

export default styles
