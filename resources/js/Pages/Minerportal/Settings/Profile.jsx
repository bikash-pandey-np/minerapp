import Layout from "../Layout";
import { useForm } from '@inertiajs/inertia-react';
import { FaUser, FaEnvelope, FaIdCard, FaCalendar, FaDollarSign, FaCrown, FaCamera, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

const Profile = ({profile, title}) => {
    const { data, setData, post, processing, errors } = useForm({
        full_name: profile.full_name,
        email: profile.email,
        account_id: profile.account_id,
        avatar: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('full_name', data.full_name);

        // Only include email if not verified
        if (!profile.is_email_verified) {
            formData.append('email', data.email);
        }

        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }
        
        post(route('miners.profile'), formData);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                e.target.value = ''; // Clear the input
                return;
            }

            // Check file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                e.target.value = ''; // Clear the input
                return;
            }

            setData('avatar', file);
        }
    };

    return (
        <Layout title="Profile" description="Manage your profile"
            backHref={route('miners.settings')}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-6 mb-[6rem] md:mb-[11rem]">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                        <div className="relative">
                            <img 
                                src={data.avatar ? URL.createObjectURL(data.avatar) : profile.avatar} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full border-4 border-purple-500"
                            />
                            <label htmlFor="avatar-preview" className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition cursor-pointer">
                                <FaCamera className="w-4 h-4" />
                            </label>
                            <input 
                                type="file"
                                id="avatar-preview"
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-800 font-mono">{profile.full_name}</h2>
                            <p className="text-gray-600">Member since <span className="font-bold font-mono">{profile.format_date}</span></p>
                            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                                {profile.is_pro_account ? (
                                    <span className="badge gap-1 bg-gradient-to-r from-red-500 to-orange-300 font-mono">
                                        <FaCrown /> Pro Account
                                    </span>
                                ) : (
                                    <span className="badge badge-secondary gap-1 font-mono">
                                        Free Account
                                    </span>
                                )}
                                {profile.is_email_verified && (
                                    <span className="badge badge-success gap-1 font-mono">
                                        Verified Email
                                    </span>
                                )}

                                {!profile.is_email_verified && (
                                    <span className="badge badge-warning gap-1 font-mono">
                                        Unverified Email
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaUser /> Full Name
                                    </span>
                                </label>
                                <input 
                                    type="text" 
                                    value={data.full_name}
                                    onChange={e => setData('full_name', e.target.value)}
                                    className={`input input-bordered w-full text-gray-600 ${errors.full_name ? 'input-error' : ''}`}
                                />
                                {errors.full_name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.full_name}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaEnvelope /> Email Address
                                    </span>
                                </label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className={`input input-bordered w-full text-gray-600 ${errors.email ? 'input-error' : ''}`}
                                    disabled={profile.is_email_verified}
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaIdCard /> Account ID
                                    </span>
                                </label>
                                <input 
                                    type="text" 
                                    value={data.account_id}
                                    className="input input-bordered w-full text-gray-600"
                                    disabled
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaDollarSign /> Total Earned
                                    </span>
                                </label>
                                <input 
                                    type="text" 
                                    value={profile.total_earned}
                                    className="input input-bordered w-full text-gray-600"
                                    disabled
                                />
                            </div>

                            <div className="form-control hidden">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaCamera /> Profile Picture
                                    </span>
                                </label>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="file-input file-input-bordered w-full"
                                />
                                {errors.avatar && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.avatar}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-start">
                            <button 
                                type="submit" 
                                className="btn btn-primary gap-2"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <FaSave className="animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    );
}

export default Profile;
