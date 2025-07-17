import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance'
import Toast from '../../components/ToastMessage/Toast'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: noteDetails
    });
  }

  const ShowToastMsg = ({ message, type }) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',
    });
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data && Array.isArray(response.data.notes)) {
        setNotes(response.data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        ShowToastMsg({ message: "Note Deleted Successfully", type: "delete" });
        getNotes();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  }

  const onSearch = async (query) => {
    if (!query.trim()) return;

    try {
      const response = await axiosInstance.get(`/search?query=${encodeURIComponent(query)}`);

      if (response.data && Array.isArray(response.data.notes)) {
        setIsSearch(true);
        setNotes(response.data.notes);
      } else {
        setIsSearch(true);
        setNotes([]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to search notes. Please try again.");
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getNotes();
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: !noteData.isPinned
      });

      if (response.data && response.data.note) {
        getNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
    getNotes();
    return () => { }
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearch={onSearch} handleClearSearch={handleClearSearch} />

      <div className='container mx-auto'>
        {loading ? (
          <div className='mt-8 text-center'>Loading notes...</div>
        ) : error ? (
          <div className='mt-8 text-center text-red-500'>{error}</div>
        ) : (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {notes.length > 0 ? (
              notes.map(note => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  date={note.date}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => handleEdit(note)}
                  onDelete={() => deleteNote(note)}
                  onPinNote={() => updateIsPinned(note)}
                />
              ))
            ) : (
              <div className='col-span-3 text-center text-gray-500 mt-4'>
                {isSearch ? (
                  <p>Oops, no notes found matching your search.</p>
                ) : (
                  <p>
                    Start creating your first note!<br />
                    Click the '+' button to jot down your thoughts, ideas, and reminders. Let's get started.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <button className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-blue-600 bottom-8 right-8"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: 'add',
            data: null
          });
        }}>
        <MdAdd className='text-[32px] text-white m-0 p-0' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: 'add',
              data: null
            });
          }}
          getNotes={getNotes}
          showToastMsg={ShowToastMsg}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home
