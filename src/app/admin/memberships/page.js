'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function AdminMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    level: '',
    features: [''],
    isActive: true,
    durationValue: 1,
    durationUnit: 'month',
    hasFreeTrial: false,
    freeTrialDays: 7,
    allowedPages: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/memberships')
      .then(res => res.json())
      .then(setMemberships);
  }, []);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? 'PATCH' : 'POST';
    const url = editingId ? `/api/admin/memberships/${editingId}` : '/api/admin/memberships';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: +formData.price,
        level: +formData.level,
        freeTrialDays: +formData.freeTrialDays,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      if (editingId) {
        setMemberships(prev => prev.map(m => m._id === editingId ? updated : m));
      } else {
        setMemberships(prev => [...prev, updated]);
      }
      resetForm();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      level: '',
      features: [''],
      isActive: true,
      durationValue: 1,
      durationUnit: 'month',
      hasFreeTrial: false,
      freeTrialDays: 7,
      allowedPages: [],
    });
    setEditingId(null);
  };

  const handleEdit = (plan) => {
    setFormData({ ...plan });
    setEditingId(plan._id);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('Delete this membership?');
    if (!confirmed) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/memberships/${id}`, { method: 'DELETE' });
    if (res.ok) setMemberships(prev => prev.filter(m => m._id !== id));
    setDeletingId(null);
  };

  const availablePages = [
    '/dashboard',
    '/landingpage',
    '/blogs',
    '/videofeed',
    '/pricing',
    '/account',
  ];
  return (

    <>
      <Header />
      <div className="pt-30 p-8 max-w-5xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-8 text-[#FFB037]">📋 Manage Memberships</h1>

        <form onSubmit={handleSave} className="space-y-4 bg-[#1a2d4d] p-6 rounded-lg shadow">
          <input type="text" placeholder="Name" value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded" />

          <textarea placeholder="Description" value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded" />

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price ($)" value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded" />

            <input type="number" placeholder="Level" value={formData.level}
              onChange={(e) => updateField('level', e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Features</label>
            {formData.features.map((f, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  placeholder={`Feature ${i + 1}`}
                  value={f}
                  onChange={(e) => {
                    const updated = [...formData.features];
                    updated[i] = e.target.value;
                    updateField('features', updated);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-800 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...formData.features];
                    updated.splice(i, 1);
                    updateField('features', updated);
                  }}
                  className="text-[#FF5C33] text-sm font-semibold"
                >
                  ❌
                </button>
              </div>
            ))}
            <button type="button" onClick={addFeature}
              className="px-4 py-1 text-sm bg-[#1BD6A2] text-black font-semibold rounded">
              + Add Feature
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="number"
                value={formData.durationValue}
                onChange={(e) => updateField('durationValue', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded"
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration Unit</label>
              <select
                value={formData.durationUnit}
                onChange={(e) => updateField('durationUnit', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={formData.hasFreeTrial}
              onChange={(e) => updateField('hasFreeTrial', e.target.checked)}
            />
            Offer Free Trial
          </label>

          {formData.hasFreeTrial && (
            <div>
              <label className="block text-sm font-medium mb-1">Free Trial Duration (days)</label>
              <input
                type="number"
                min={1}
                value={formData.freeTrialDays}
                onChange={(e) => updateField('freeTrialDays', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Allowed Pages</label>
            <select
              multiple
              value={formData.allowedPages}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                updateField('allowedPages', options);
              }}
              className="w-full px-4 py-2 bg-gray-800 rounded"
            >
              {availablePages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formData.isActive}
              onChange={(e) => updateField('isActive', e.target.checked)} />
            Active
          </label>

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="flex-1 bg-[#FFB037] text-black py-2 rounded font-semibold">
              {loading ? 'Saving...' : editingId ? 'Update' : 'Create'} Membership
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-gray-600 py-2 px-4 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-[#FFB037]">🧾 Existing Plans</h2>
          {memberships.map(m => (
            <div key={m._id} className="bg-gray-100 text-black p-5 rounded mb-6 shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#0B1F3F]">{m.name} (Level {m.level})</h3>
                  <p className="text-sm text-gray-700">{m.description}</p>
                  <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
                    {m.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <p className="text-xs mt-2">
                    Duration: {m.durationValue} {m.durationUnit}(s)
                    {m.hasFreeTrial && ` + Free Trial (${m.freeTrialDays} day${m.freeTrialDays > 1 ? 's' : ''})`}
                  </p>
                  {m.allowedPages?.length > 0 && (
                    <p className="text-xs mt-1 text-gray-700">Access: {m.allowedPages.join(', ')}</p>
                  )}
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(m)} className="bg-[#1BD6A2] px-4 py-1 rounded text-black font-semibold">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(m._id)} disabled={deletingId === m._id} className="bg-[#FF5C33] px-4 py-1 rounded text-white font-semibold">
                    {deletingId === m._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>

  );
}
