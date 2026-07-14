const fs = require('fs');
let code = fs.readFileSync('src/context/ContentContext.tsx', 'utf8');

const startIndex = code.indexOf('const uploadImage = async');
if (startIndex === -1) throw new Error("not found");

const endStr = '  const submitFormSubmission = async';
const endIndex = code.indexOf(endStr);
if (endIndex === -1) throw new Error("not found");

const newUploadImage = `const uploadImage = async (fileOrBase64: File | string, fileName: string): Promise<{ success: boolean; url?: string; error?: string }> => {
    console.log('uploadImage called for:', fileName);
    try {
      const response = await uploadToCloudinaryClient(fileOrBase64, fileName);
      if (response.success && response.url) {
        // Log image upload to media manager collection in Firestore
        try {
          const mediaId = "media_" + Date.now();
          setDoc(doc(db, "media", mediaId), {
            id: mediaId,
            name: fileName,
            url: response.url,
            createdAt: new Date().toISOString(),
            type: fileName.split('.').pop() || "image"
          }).catch((err: any) => {
            handleFirestoreError(err, OperationType.CREATE, \`media/\${mediaId}\`);
          });
        } catch (mediaErr) {
          console.warn("Could not register media asset to Firestore library catalog.", mediaErr);
        }
        return response;
      } else {
        return response;
      }
    } catch (e: any) {
      console.error("Upload failed", e);
      return { success: false, error: e.message || "Failed to upload image." };
    }
  };

`;

const newCode = code.substring(0, startIndex) + newUploadImage + code.substring(endIndex);
fs.writeFileSync('src/context/ContentContext.tsx', newCode);
console.log("Patched!");
