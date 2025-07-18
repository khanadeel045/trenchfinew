'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header'; // make sure exists
import Footer from '@/components/Footer'; // make sure exists
import MyVideosPage from '@/components/MyVideosPage';
import FollowersPage from '@/app/account/followers/page';
import FollowingPage from '@/app/account/following/page';
import BlogsTab from '@/components/BlogsTab';  // naya import
import MembershipTab from '@/components/MembershipTab';



export default function MyAccountPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profilePreview, setProfilePreview] = useState('/default-avatar.jpg');
    const [profileFile, setProfileFile] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    const [formData, setFormData] = useState({
        name: '',
        language: 'English',
        dob: '',
        country: 'Pakistan',
        timezone: 'UTC +5 (PKT)',
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/me');
                if (!res.ok) return router.push('/login');
                const data = await res.json();

                setFormData({
                    name: data.name || '',
                    language: data.language || 'English',
                    dob: data.dob || '2000-01-01',
                    country: data.country || 'Pakistan',
                    timezone: data.timezone || 'UTC +5 (PKT)',
                });

                console.log(data)
                if (data.profileImage) {
                    setProfilePreview(data.profileImage);
                }
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFile(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.entries(formData).forEach(([key, val]) => form.append(key, val));
        if (profileFile) {
            form.append('profileImage', profileFile);
        }

        try {
            const res = await fetch('/api/users', {
                method: 'PATCH',
                body: form,
            });

            const data = await res.json();
            if (res.ok) {
                alert('✅ Changes saved!');
            } else {
                alert('❌ ' + data.error);
            }
        } catch (err) {
            alert('Network error');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <>
            <Header /> {/* ✅ Global Header */}

            <div className="min-h-screen py-20 pt-30"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 px-4 md:px-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-[#061524] rounded-lg shadow p-6 md:h-[calc(100vh-10rem)] mb-6 md:mb-0">
                        <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
                        <ul className="space-y-3 text-white font-medium">
                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'profile' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-500'}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <span className="mr-2">👤</span> Profile Info
                            </li>
                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'security' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-500'}`}
                                onClick={() => setActiveTab('security')}
                            >
                                <span className="mr-2">🔒</span> Security
                            </li>
                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'videofeed' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-500'}`}
                                onClick={() => setActiveTab('videofeed')}
                            >
                                🎥 Video Feed
                            </li>

                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'followers' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-500'}`}
                                onClick={() => setActiveTab('followers')}
                            >
                                👥 Followers
                            </li>
                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'following' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-500'}`}
                                onClick={() => setActiveTab('following')}
                            >
                                ✅ Following
                            </li>
                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'blogs'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'hover:bg-gray-500'
                                    }`}
                                onClick={() => setActiveTab('blogs')}
                            >
                                📝 My Blogs
                            </li>

                            <li
                                className={`px-4 py-2 rounded cursor-pointer ${activeTab === 'membership' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-500'
                                    }`}
                                onClick={() => setActiveTab('membership')}
                            >
                                💎 Membership
                            </li>

                        </ul>
                    </aside>

                    {/* Main Form */}
                    {activeTab === 'profile' && (

                        <div className="flex-1  bg-[#061524] rounded-lg shadow p-8 md:p-12">
                            <h1 className="text-2xl font-bold text-white mb-6">Profile Information</h1>
                            {/* Profile Image Upload */}
                            <div className="mb-6 flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={profilePreview}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover border"
                                    />

                                    {/* Overlay plus button */}
                                    <label className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-purple-700 border-2 border-white shadow">
                                        +
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                            </div>


                            <form onSubmit={handleSave} className="space-y-6">
                                <div>
                                    <label className="block mb-1 text-white font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white border px-4 py-2  text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-white font-medium">Language</label>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="w-full bg-white border px-4 py-2 rounded text-black"
                                    >
                                        <option>English</option>
                                        <option>Urdu</option>
                                        <option>Portuguese</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-white font-medium">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full bg-white text-black border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder='Enter DOb'
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-white font-medium">Country</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full bg-white border px-4 py-2 rounded text-black"
                                    >
                                        <option>Pakistan</option>
                                        <option>USA</option>
                                        <option>India</option>
                                        <option>UK</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-white font-medium">Timezone</label>
                                    <select
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleChange}
                                        className="w-full bg-white border px-4 py-2 rounded text-black"
                                    >
                                        <option>UTC +5 (PKT)</option>
                                        <option>UTC +0 (GMT)</option>
                                        <option>UTC -5 (EST)</option>
                                    </select>
                                </div>

                                <div className="pt-4 g-5 flex gap-2">
                                    <button
                                        type="submit"
                                        className=" bg-[#8787FB] text-white font-semibold px-6 py-2 rounded hover:bg-[#6f6fdf]"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        onClick={async () => {
                                            const confirmed = confirm('Are you sure you want to delete your account?');
                                            if (!confirmed) return;

                                            const res = await fetch('/api/users', { method: 'DELETE' });
                                            if (res.ok) {
                                                alert('Account deleted.');
                                                window.location.href = '/signup';
                                            } else {
                                                const data = await res.json();
                                                alert('❌ ' + data.error);
                                            }
                                        }}
                                        className=" bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete Account
                                    </button>

                                </div>
                            </form>
                        </div>
                    )}

                    {/* Security Section */}
                    {activeTab === 'security' && (

                        <div className="flex-1  bg-[#061524] rounded-lg shadow p-8 md:p-12">
                            <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>

                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const form = new FormData(e.target);
                                    const currentPassword = form.get('currentPassword');
                                    const newPassword = form.get('newPassword');
                                    const confirmPassword = form.get('confirmPassword');

                                    if (newPassword !== confirmPassword) {
                                        return alert('❌ New passwords do not match');
                                    }

                                    const res = await fetch('/api/change-password', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ currentPassword, newPassword }),
                                    });

                                    const data = await res.json();
                                    if (res.ok) {
                                        alert('✅ Password updated successfully');
                                    } else {
                                        alert('❌ ' + data.error);
                                    }
                                }}
                                className="space-y-6"
                            >
                                {/* Full width: current password */}
                                <div>
                                    <label className="block mb-1 text-white font-medium">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="w-full bg-white text-black border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        required
                                    />
                                </div>

                                {/* Half width: new + confirm */}
                                <div>
                                    <label className="block mb-1 text-white font-medium">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="w-full bg-white text-black border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-white font-medium">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="w-full bg-white text-black border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="bg-[#8787FB] text-white font-semibold px-6 py-2 rounded hover:bg-[#6f6fdf]"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}



                    {activeTab === 'videofeed' && (
                        <div className="flex-1  bg-[#061524] rounded-lg shadow p-8 md:p-12">
                            <MyVideosPage />
                        </div>
                    )}

                    {activeTab === 'followers' && (
                        <div className="flex-1  bg-[#061524] rounded-lg shadow p-8 md:p-12">
                            <FollowersPage />
                        </div>
                    )}

                    {activeTab === 'following' && (
                        <div className="flex-1  bg-[#061524] rounded-lg shadow p-8 md:p-12">
                            <FollowingPage />
                        </div>
                    )}



                    {activeTab === 'blogs' && <BlogsTab />}



                    {activeTab === 'membership' && (
                        <div className="flex-1  bg-[#061524] rounded-lg shadow p-8 md:p-12">
                            <MembershipTab />
                        </div>
                    )}

                </div>
            </div>
            <Footer /> {/* ✅ Global Footer */}
        </>

    );
}
