import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
  return (
    <div className='p-4 transition-all ease-in-out bg-white border rounded hover:shadow-xl'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format('DD MMM YYYY')}</span>
            </div>
            <MdOutlinePushPin
              className={`icon-btn cursor-pointer transition-colors ${
                isPinned
                  ? "text-primary"
                  : "text-slate-300"
              }`}
              onClick={onPinNote}
            />
        </div>
        <p className='mt-2 text-xs text-slate-600'>{content?.slice(0,60)}</p>

        <div className="flex items-center justify-between mt-2">
            <div className='text-xs text-slate-500'>
                {tags.map((item)=>`#${item} `)}
            </div>
            <div className='flex items-center gap-2'>
                <MdCreate
                    className="icon-btn hover:text-green-600 cursor-pointer"
                    onClick={onEdit}
                />
                <MdDelete 
                    className='icon-btn hover:text-red-500 cursor-pointer'
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard
