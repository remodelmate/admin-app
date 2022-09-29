import { FunctionComponent, Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { XCircleIcon } from '@heroicons/react/24/outline'

export const EnlargeImage: FunctionComponent<EnlargeImageProps> = ({
  imageClick,
  setImageClick,
  enlargeSrc,
  setEnlargeSrc,
}) => {
  return (
    <div
      className={clsx(imageClick ? 'modal-open' : '', 'modal')}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', alignItems: 'center' }}
    >
      <button
        className="p-8 sm:px-12"
        onClick={() => {
          setImageClick(false)
          setEnlargeSrc('')
        }}
      >
        <div className="relative flex justify-end pr-3 -mb-12">
          <XCircleIcon className="bg-white" width="36" height="36" />
        </div>
        <img
          src={enlargeSrc}
          className="rounded-3xl"
          style={{ maxHeight: '90vh' }}
          alt={enlargeSrc}
        />
      </button>
    </div>
  )
}

interface EnlargeImageProps {
  imageClick: boolean
  setImageClick: Dispatch<SetStateAction<boolean>>
  enlargeSrc: string
  setEnlargeSrc: Dispatch<SetStateAction<string>>
}
