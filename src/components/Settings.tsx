import useRedux from "@/hooks/useRedux"

import type { Style } from "@/stores/redux/style/slice"
import { change } from "@/stores/redux/style/slice"
import styles from "@/stores/redux/style/constants"

export default () => {
  const {dispatch} = useRedux()

  return (
    <ul
      className="flex justify-end gap-2 mx-1"
    >
      {/**
        * 12.2 (conditional rendering & lists)
        */}
      {Object.entries(styles).map(([name, val]) => (
        <li
          key={`--style-${name}`}
          style={val}
          title={`change style to: ${name}`}
          className="bg-gray-700/40 text-gray px-2 py-1 cursor-pointer"
          onClick={() => dispatch(change(name as Style))}
        >
          {name[0].toUpperCase()}
        </li>
      ))}
    </ul>
  )
}
