'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export default function CommentSection({ videoId, me, initialCount = 0 }) {
  const [open, setOpen]       = useState(false);
  const [list, setList]       = useState([]);
  const [text, setText]       = useState('');
  const [editing, setEditing] = useState(null);
  const [count, setCount]     = useState(initialCount);

  const myId = me?._id || me?.id;

  const load = useCallback(async () => {
    const res = await fetch(`/api/videos/${videoId}/comments`);
    if (res.ok) {
      const data = await res.json();
      setList(data);
      setCount(data.length);
    }
  }, [videoId]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  const add = async () => {
    const res = await fetch(`/api/videos/${videoId}/comments`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ text }),
    });
    if (!res.ok) return toast.error('Error adding comment');
    setText('');
    await load();
  };

  const saveEdit = async () => {
    const res = await fetch(`/api/videos/${videoId}/comments/${editing}`, {
      method : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ text }),
    });
    if (!res.ok) return toast.error('Edit failed');
    setEditing(null);
    setText('');
    await load();
  };

  const del = async (cid) => {
    if (!confirm('Delete this comment?')) return;
    const res = await fetch(`/api/videos/${videoId}/comments/${cid}`, { method: 'DELETE' });
    if (!res.ok) return toast.error('Delete failed');
    await load();
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-white hover:text-blue-400 flex flex-col items-center">
        💬
        <span className="text-xs">{count}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center px-4">
          <div className="bg-[#1a1a1a] text-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg p-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-3">Comments</h2>

            <div className="space-y-3">
              {list.map(c => {
                const mine = myId && String(c.userId?._id) === String(myId);
                return (
                  <div key={c._id} className="text-sm flex items-start gap-2">
                    <b>{c.userId?.username || 'Anon'}:</b>

                    {editing === c._id ? (
                      <>
                        <input
                          value={text}
                          onChange={e => setText(e.target.value)}
                          className="flex-1 bg-gray-800 text-white text-xs px-1 rounded"
                        />
                        <button onClick={saveEdit} className="text-green-400 text-xs">Save</button>
                        <button onClick={() => { setEditing(null); setText(''); }} className="text-gray-400 text-xs">X</button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 break-words">{c.text}</span>
                        {mine && (
                          <>
                            <button
                              onClick={() => { setEditing(c._id); setText(c.text); }}
                              className="text-yellow-400 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => del(c._id)}
                              className="text-red-400 text-xs"
                            >
                              Del
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {me && !editing && (
              <div className="flex gap-2 mt-4">
                <input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="flex-1 p-1 bg-gray-800 text-white text-xs rounded"
                  placeholder="Add comment..."
                />
                <button
                  onClick={add}
                  disabled={!text.trim()}
                  className="px-3 bg-indigo-600 rounded text-xs"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
