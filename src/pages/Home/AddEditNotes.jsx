import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from '../../components/input/TagInput'
import axiosInstance from '../../utils/axiosinstance'

const AddEditNotes = ({ noteData, type, getNotes, onClose, showToastMsg }) => {
  const [title, setTitle] = useState(noteData?.title || '')
  const [content, setContent] = useState(noteData?.content || '')
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags: [...new Set(tags)],
      })
      if (response.data?.note) {
        showToastMsg({ message: "Note Added Successfully", type: "add" })
        getNotes()
        onClose()
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add note")
    }
  }

  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags: [...new Set(tags)],
      })
      if (response.data?.note) {
        showToastMsg({ message: "Note Updated Successfully", type: "edit" })
        getNotes()
        onClose()
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update note")
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }
    if (!content) {
      setError("Please enter the content")
      return
    }
    setError("")
    type === 'edit' ? editNote() : addNewNote()
  }

  return (
    <div className="relative p-6 sm:p-8 bg-white rounded-2xl">
      <button
        className="absolute top-3 right-3 rounded-full hover:bg-gray-100 p-1"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-600" />
      </button>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-xs font-medium text-slate-500">TITLE</label>
        <input
          type="text"
          className="text-lg outline-none text-slate-900 border-b border-gray-200 pb-1"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-xs font-medium text-slate-500">CONTENT</label>
        <textarea
          className="p-2 text-sm rounded-md outline-none text-slate-900 border border-gray-200"
          placeholder="Content"
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-slate-500">TAGS</label>
        <TagInput
          tags={tags}
          setTags={(newTags) => setTags([...new Set(newTags)])}
        />
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <button
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  )
}

export default AddEditNotes
