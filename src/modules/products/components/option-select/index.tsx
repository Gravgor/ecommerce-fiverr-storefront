import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="font-normal text-gray-500">Select {title.toLocaleLowerCase()}</span>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clx(
                "relative flex h-[40px] min-w-[80px] cursor-pointer items-center justify-center border border-black bg-white p-1.5 text-[11px] uppercase transition-colors hover:bg-neutral-800 hover:text-white",
                {
                  "bg-neutral-800 text-white": isSelected,
                  "stroke-black opacity-80 hover:bg-transparent hover:text-black": !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              <span className={clx(
                "transition-transform ease-in-out duration-300",
                { "scale-105": isSelected }
              )}>
                {v}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
