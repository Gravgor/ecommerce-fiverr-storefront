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
      <span className="text-sm">Select {title}</span>
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
                "px-4 py-2 border rounded-md transition-all ease-in-out duration-300",
                {
                  "bg-black text-white border-black": isSelected,
                  "border-ui-border-base hover:bg-gray-100": !isSelected,
                  "hover:shadow-elevation-card-rest": !isSelected && !disabled,
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
