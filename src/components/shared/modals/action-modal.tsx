import clsx from 'clsx'
import { FunctionComponent } from 'react'

export const ActionModal: FunctionComponent<ActionModalProps> = ({
  message,
  modalOpen,
  closeModal,
  action,
}) => {
  return (
    <div
      className={clsx(
        modalOpen ? 'modal-open' : '',
        'modal modal-bottom sm:modal-middle'
      )}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{message}</h3>
        <div className="modal-action">
          <button
            className="btn inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="btn inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
            }}
            onClick={action}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

interface ActionModalProps {
  message: string
  modalOpen: boolean
  closeModal: any
  action: any
}
