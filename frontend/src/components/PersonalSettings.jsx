// import React, { useEffect, useState } from "react";
// import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import { Label } from "../components/ui/Label";
// import { Textarea } from "../components/ui/Textarea";
// import { Eye, EyeOff } from "lucide-react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export function PersonalSettings() {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     bio: "",
//     profileImage: { url: "" }
//   });

//   const [password, setPassword] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: ""
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });


//   /* =========================
//      FETCH PROFILE
//   ========================= */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/api/auth/profile");
//         setProfile(res.data);
//       } catch {
//         toast.error("Failed to load profile");
//       }
//     };
//     fetchProfile();
//   }, []);

//   /* =========================
//      SAVE PROFILE
//   ========================= */
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await api.put("/api/auth/update-profile", {
//         name: profile.name,
//         phone: profile.phone,
//         address: profile.address
//       });
//       toast.success("Personal settings saved successfully!");
//     } catch {
//       toast.error("Failed to save settings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      UPLOAD PROFILE IMAGE
//   ========================= */
//   const handleImageUpload = async () => {
//     if (!imageFile) return toast.error("Please select an image");

//     const formData = new FormData();
//     formData.append("profileImage", imageFile);

//     try {
//       setLoading(true);
//       const res = await api.put(
//         "/api/auth/upload-profile-image",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setProfile((prev) => ({
//         ...prev,
//         profileImage: res.data.user.profileImage
//       }));

//       toast.success("Profile image updated");
//     } catch {
//       toast.error("Image upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      UPDATE PASSWORD
//   ========================= */
//   const handlePasswordUpdate = async () => {
//     if (password.newPassword !== password.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       setLoading(true);
//       await api.put("/api/auth/update-password", {
//         currentPassword: password.currentPassword,
//         newPassword: password.newPassword
//       });

//       toast.success("Password updated successfully");
//       setPassword({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: ""
//       });
//     } catch {
//       toast.error("Password update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-white mb-2">Personal Settings</h2>
//         <p className="text-gray-400">
//           Manage your personal information and preferences
//         </p>
//       </div>

//       {/* Profile Picture */}
//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4">
//           Profile Picture
//         </h3>
//         <div className="flex items-center gap-6">
//           <div className="w-24 h-24 bg-yellow-400 rounded-full overflow-hidden flex items-center justify-center text-black text-3xl font-bold">
//             {profile.profileImage?.url ? (
//               <img
//                 src={profile.profileImage.url}
//                 alt="profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               "A"
//             )}
//           </div>
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files[0])}
//               className="mb-2 block w-full text-sm text-gray-300
//              file:mr-4 file:py-2 file:px-4
//              file:rounded-md file:border-0
//              file:text-sm file:font-semibold
//              file:bg-yellow-400 file:text-black
//              hover:file:bg-yellow-500 hover:cursor-pointer"
//             />

//             <Button
//               onClick={handleImageUpload}
//               disabled={loading}
//               className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium mb-2"
//             >
//               <Camera size={18} className="mr-2" />
//               Upload New Photo
//             </Button>
//             <p className="text-sm text-gray-400">
//               JPG, PNG or GIF. Max size of 5MB.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Personal Information */}
//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//           <User size={20} className="text-yellow-400" />
//           Personal Information
//         </h3>

//         <div className="space-y-4">
//           <div>
//             <Label className="text-gray-300">Name</Label>
//             <Input
//               value={profile.name}
//               onChange={(e) =>
//                 setProfile({ ...profile, name: e.target.value })
//               }
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//             />
//           </div>

//           <div>
//             <Label className="text-gray-300 flex items-center gap-2">
//               <Mail size={16} />
//               Email Address
//             </Label>
//             <Input
//               value={profile.email}
//               disabled
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//             />
//           </div>

//           <div>
//             <Label className="text-gray-300 flex items-center gap-2">
//               <Phone size={16} />
//               Phone Number
//             </Label>
//             <Input
//               value={profile.phone}
//               onChange={(e) =>
//                 setProfile({ ...profile, phone: e.target.value })
//               }
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//             />
//           </div>

//           <div>
//             <Label className="text-gray-300 flex items-center gap-2">
//               <MapPin size={16} />
//               Address
//             </Label>
//             <Textarea
//               value={profile.address}
//               onChange={(e) =>
//                 setProfile({ ...profile, address: e.target.value })
//               }
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//               rows={2}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Change Password */}
//       {/* Change Password */}
//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4">
//           Change Password
//         </h3>

//         <div className="space-y-4">
//           {/* Current Password */}
//           <div className="relative">
//             <Input
//               type={showPassword.current ? "text" : "password"}
//               placeholder="Current password"
//               value={password.currentPassword}
//               onChange={(e) =>
//                 setPassword({ ...password, currentPassword: e.target.value })
//               }
//               className="bg-[#1a1a1a] border-gray-700 text-white pr-10"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 setShowPassword({ ...showPassword, current: !showPassword.current })
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//             >
//               {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* New Password */}
//           <div className="relative">
//             <Input
//               type={showPassword.new ? "text" : "password"}
//               placeholder="New password"
//               value={password.newPassword}
//               onChange={(e) =>
//                 setPassword({ ...password, newPassword: e.target.value })
//               }
//               className="bg-[#1a1a1a] border-gray-700 text-white pr-10"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 setShowPassword({ ...showPassword, new: !showPassword.new })
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//             >
//               {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <Input
//               type={showPassword.confirm ? "text" : "password"}
//               placeholder="Confirm new password"
//               value={password.confirmPassword}
//               onChange={(e) =>
//                 setPassword({ ...password, confirmPassword: e.target.value })
//               }
//               className="bg-[#1a1a1a] border-gray-700 text-white pr-10"
//             />
//          <button
//   type="button"
//   onClick={() =>
//     setShowPassword({
//       ...showPassword,
//       confirm: !showPassword.confirm,
//     })
//   }
//   className="absolute right-2 top-1/2 -translate-y-1/2
//              p-1.5 rounded-full
//              text-gray-400
//              hover:text-gray-200
//              hover:bg-white/5
//              focus:outline-none"
// >
//   {showPassword.confirm ? (
//     <EyeOff size={16} strokeWidth={1.75} />
//   ) : (
//     <Eye size={16} strokeWidth={1.75} />
//   )}
// </button>

//           </div>

//           <Button
//             onClick={handlePasswordUpdate}
//             disabled={loading}
//             className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
//           >
//             Update Password
//           </Button>
//         </div>
//       </div>


//       {/* Save Changes */}
//       <div className="flex justify-end">
//         <Button
//           onClick={handleSave}
//           disabled={loading}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
//         >
//           <Save size={18} className="mr-2" />
//           Save All Changes
//         </Button>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from 'react';
// import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Label } from '../components/ui/Label';
// import { Textarea } from '../components/ui/Textarea';

// export function PersonalSettings() {
//   const [profile, setProfile] = useState({
//     firstName: 'Admin',
//     lastName: 'User',
//     email: 'admin@example.com',
//     phone: '+1 (555) 123-4567',
//     address: '123 Main St, New York, NY 10001',
//     bio: 'E-commerce admin managing store operations.',
//   });

//   const handleSave = () => {
//     alert('Personal settings saved successfully!');
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-white mb-2">Personal Settings</h2>
//         <p className="text-gray-400">Manage your personal information and preferences</p>
//       </div>

//       {/* Profile Picture */}
//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
//         <div className="flex items-center gap-6">
//           <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black text-3xl font-bold">
//             AD
//           </div>
//           <div>
//             <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium mb-2">
//               <Camera size={18} className="mr-2" />
//               Upload New Photo
//             </Button>
//             <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size of 5MB.</p>
//           </div>
//         </div>
//       </div>

//       {/* Personal Information */}
//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//           <User size={20} className="text-yellow-400" />
//           Personal Information
//         </h3>
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label className="text-gray-300">First Name</Label>
//               <Input
//                 value={profile.firstName}
//                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
//                 className="bg-[#1a1a1a] border-gray-700 text-white"
//               />
//             </div>
//             <div>
//               <Label className="text-gray-300">Last Name</Label>
//               <Input
//                 value={profile.lastName}
//                 onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
//                 className="bg-[#1a1a1a] border-gray-700 text-white"
//               />
//             </div>
//           </div>

//           <div>
//             <Label className="text-gray-300 flex items-center gap-2">
//               <Mail size={16} />
//               Email Address
//             </Label>
//             <Input
//               type="email"
//               value={profile.email}
//               onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//             />
//           </div>

//           <div>
//             <Label className="text-gray-300 flex items-center gap-2">
//               <Phone size={16} />
//               Phone Number
//             </Label>
//             <Input
//               type="tel"
//               value={profile.phone}
//               onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//             />
//           </div>

//           <div>
//             <Label className="text-gray-300 flex items-center gap-2">
//               <MapPin size={16} />
//               Address
//             </Label>
//             <Textarea
//               value={profile.address}
//               onChange={(e) => setProfile({ ...profile, address: e.target.value })}
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//               rows={2}
//             />
//           </div>

//           <div>
//             <Label className="text-gray-300">Bio</Label>
//             <Textarea
//               value={profile.bio}
//               onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
//               className="bg-[#1a1a1a] border-gray-700 text-white"
//               rows={3}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Change Password */}
//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
//         <div className="space-y-4">
//           <div>
//             <Label className="text-gray-300">Current Password</Label>
//             <Input
//               type="password"
//               placeholder="Enter current password"
//               className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//             />
//           </div>
//           <div>
//             <Label className="text-gray-300">New Password</Label>
//             <Input
//               type="password"
//               placeholder="Enter new password"
//               className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//             />
//           </div>
//           <div>
//             <Label className="text-gray-300">Confirm New Password</Label>
//             <Input
//               type="password"
//               placeholder="Confirm new password"
//               className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//             />
//           </div>
//           <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
//             Update Password
//           </Button>
//         </div>
//       </div>

//       {/* Save Changes */}
//       <div className="flex justify-end">
//         <Button onClick={handleSave} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
//           <Save size={18} className="mr-2" />
//           Save All Changes
//         </Button>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

export function PersonalSettings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profileImage: { url: "" }
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });


  /* =========================
     FETCH PROFILE
  ========================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/profile");
        setProfile(res.data);
      } catch {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  /* =========================
     SAVE PROFILE
  ========================= */
  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put("/api/auth/update-profile", {
        name: profile.name,
        phone: profile.phone,
        address: profile.address
      });
      toast.success("Personal settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPLOAD PROFILE IMAGE
  ========================= */
  const handleImageUpload = async () => {
    if (!imageFile) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      setLoading(true);
      const res = await api.put(
        "/api/auth/upload-profile-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfile((prev) => ({
        ...prev,
        profileImage: res.data.user.profileImage
      }));

      toast.success("Profile image updated");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE PASSWORD
  ========================= */
  const handlePasswordUpdate = async () => {
    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await api.put("/api/auth/update-password", {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword
      });

      toast.success("Password updated successfully");
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch {
      toast.error("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Personal Settings</h2>
        <p className="text-gray-400">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Profile Picture */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-yellow-400 rounded-full overflow-hidden flex items-center justify-center text-black text-3xl font-bold">
            {profile.profileImage?.url ? (
              <img
                src={profile.profileImage.url}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              "A"
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mb-2 block w-full text-sm text-gray-300
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-yellow-400 file:text-black
             hover:file:bg-yellow-500 hover:cursor-pointer"
            />

            <Button
              onClick={handleImageUpload}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium mb-2"
            >
              <Camera size={18} className="mr-2" />
              Upload New Photo
            </Button>
            <p className="text-sm text-gray-400">
              JPG, PNG or GIF. Max size of 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={20} className="text-yellow-400" />
          Personal Information
        </h3>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Name</Label>
            <Input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              <Mail size={16} />
              Email Address
            </Label>
            <Input
              value={profile.email}
              disabled
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              <Phone size={16} />
              Phone Number
            </Label>
            <Input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              <MapPin size={16} />
              Address
            </Label>
            <Textarea
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              className="bg-[#1a1a1a] border-gray-700 text-white"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      {/* Change Password */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Change Password
        </h3>

        <div className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Current password"
              value={
                showPassword.current
                  ? password.currentPassword
                  : "*".repeat(password.currentPassword.length)
              }
              onChange={(e) => {
                const newValue = e.target.value;
                const currentLength = password.currentPassword.length;
                const newLength = newValue.length;

                if (showPassword.current) {
                  setPassword({ ...password, currentPassword: newValue });
                } else {
                  if (newLength > currentLength) {
                    const addedChar = newValue[newValue.length - 1];
                    setPassword({ ...password, currentPassword: password.currentPassword + addedChar });
                  } else if (newLength < currentLength) {
                    setPassword({ ...password, currentPassword: password.currentPassword.slice(0, newLength) });
                  }
                }
              }}
              className="bg-[#1a1a1a] border-gray-700 text-white pr-10"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({ ...showPassword, current: !showPassword.current })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              type="text"
              placeholder="New password"
              value={
                showPassword.new
                  ? password.newPassword
                  : "*".repeat(password.newPassword.length)
              }
              onChange={(e) => {
                const newValue = e.target.value;
                const currentLength = password.newPassword.length;
                const newLength = newValue.length;

                if (showPassword.new) {
                  setPassword({ ...password, newPassword: newValue });
                } else {
                  if (newLength > currentLength) {
                    const addedChar = newValue[newValue.length - 1];
                    setPassword({ ...password, newPassword: password.newPassword + addedChar });
                  } else if (newLength < currentLength) {
                    setPassword({ ...password, newPassword: password.newPassword.slice(0, newLength) });
                  }
                }
              }}
              className="bg-[#1a1a1a] border-gray-700 text-white pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({ ...showPassword, new: !showPassword.new })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Confirm new password"
              value={
                showPassword.confirm
                  ? password.confirmPassword
                  : "*".repeat(password.confirmPassword.length)
              }
              onChange={(e) => {
                const newValue = e.target.value;
                const currentLength = password.confirmPassword.length;
                const newLength = newValue.length;

                if (showPassword.confirm) {
                  setPassword({ ...password, confirmPassword: newValue });
                } else {
                  if (newLength > currentLength) {
                    const addedChar = newValue[newValue.length - 1];
                    setPassword({ ...password, confirmPassword: password.confirmPassword + addedChar });
                  } else if (newLength < currentLength) {
                    setPassword({ ...password, confirmPassword: password.confirmPassword.slice(0, newLength) });
                  }
                }
              }}
              className="bg-[#1a1a1a] border-gray-700 text-white pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirm: !showPassword.confirm,
                })
              }
              className="absolute right-2 top-1/2 -translate-y-1/2
                         p-1.5 rounded-full
                         text-gray-400
                         hover:text-gray-200
                         hover:bg-white/5
                         focus:outline-none"
            >
              {showPassword.confirm ? (
                <EyeOff size={16} strokeWidth={1.75} />
              ) : (
                <Eye size={16} strokeWidth={1.75} />
              )}
            </button>
          </div>

          <Button
            onClick={handlePasswordUpdate}
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
          >
            Update Password
          </Button>
        </div>
      </div>


      {/* Save Changes */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
        >
          <Save size={18} className="mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}


