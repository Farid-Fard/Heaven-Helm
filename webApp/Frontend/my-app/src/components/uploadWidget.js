// import React from 'react';

// const UploadWidget = ({ onUpload }) => {
//   const handleFileChange = (e) => {
//     const file = e.target.files[0]; // Get the first selected file
//     console.log("File selected:", file); // Log the selected file for debugging
//     if (file) {
//       onUpload(file); // Call onUpload prop with the selected file
//     }
//   };

//   return (
//     <div>
//       <input 
//         type="file" 
//         accept="image/*" 
//         onChange={handleFileChange} 
//         style={{ display: 'none' }} // Hide the default file input
//         id="file-upload" // Give an ID to the file input
//       />
//       <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
//         <button type="button">
//           Upload Photo
//         </button>
//       </label>
//     </div>
//   );
// };

// export default UploadWidget;
