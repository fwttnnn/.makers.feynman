export type Props = {
  id: string,
}

/**
 * 9.2 (props)
 */
export default ({ id }: Props) => {
  const title = "React.js & Vite"
  const tasks = [
    {
      instruction: "do x",
      status: "done", // TODO: enum
    },
    {
      instruction: "do y",
      status: "done", // TODO: enum
    },
    {
      instruction: "do z",
      status: "on-going", // TODO: enum
    }
  ]
  const labels = ["Web", "Learn"]

  labels.sort()

  return (
    <div
      className="border p-1.5"
    >
      <div
        className="flex items-center justify-between gap-2"
      >
        <div
          className="flex gap-2"
        >
          <div>
            <span>{title}</span>
          </div>
        </div>
        <div
          className="flex gap-2"
        >
          <div
            className="flex gap-2 mx-1"
          >
            {labels.map((label: string) => (
              <div key={`--label-${id}`}>
                <span
                  className="bg-[#ffbd17] text-black rounded-full px-2 py-1"
                >
                  {label[0].toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <div
            className="flex gap-2"
          >
            <span
              className="text-[#9af5b7]"
            >
              {`${tasks.filter((t) => t.status === "done").length}/${tasks.length}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
