const fs = require('fs');
let code = fs.readFileSync('src/context/ContentContext.tsx', 'utf8');

const oldMethod = `  const uploadImage = async (fileOrBase64: File | string, fileName: string): Promise<{ success: boolean; url?: string; error?: string }> => {
    console.log('uploadImage called for:', fileName);
    try {
      const response = await uploadToCloudinaryClient(fileOrBase64, fileName);
      if (response.success && response.url) {
        // Log image upload to media manager collection in Firestore
        try {
          const mediaId = "media_" + Date.now();
          try {
            await setDoc(doc(db, "media", mediaId), {
              id: mediaId,
              name: fileName,
              url: response.url,
              createdAt: new Date().toISOString(),
              type: fileName.split('.').pop() || "image"
            });
          } catch (err: any) {
            handleFirestoreError(err, OperationType.CREATE, \`media/\${mediaId}\`);
          }
        } catch (mediaErr) {
          console.warn("Could not register media asset to Firestore library catalog.", mediaErr);
        }
        return response;
      } else {
        // Cloudinary upload returned failure.
        // Let's implement a robust Base64 data URL fallback!
        console.warn("Cloudinary upload failed, falling back to local base64:", response.error);
        let fallbackUrl = "";
        if (typeof fileOrBase64 === "string") {
          fallbackUrl = fileOrBase64;
        } else {
          // It's a File object, let's read it to base64
          fallbackUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(fileOrBase64);
          });
        }
        if (fallbackUrl) {
          // Log config warning or info to media collection (storing a truncated url to fit Firestore limits)
          try {
            const mediaId = "media_" + Date.now();
            await setDoc(doc(db, "media", mediaId), {
              id: mediaId,
              name: fileName + " (Client Fallback)",
              url: fallbackUrl.slice(0, 10000) + "...[truncated fallback base64 Data URL]",
              createdAt: new Date().toISOString(),
              type: "local_fallback"
            });
          } catch (e) {}
          return {
            success: true,
            url: fallbackUrl,
            error: "Uploaded as Local Data URI fallback (Cloudinary pending configuration: " + (response.error || "Failed to fetch") + ")"
          };
        }
        return response;
      }
    } catch (e: any) {
      console.warn("Upload failed, attempting standard client base64 fallback", e);
      // Fallback for unexpected throws
      try {
        let fallbackUrl = "";
        if (typeof fileOrBase64 === "string") {
          fallbackUrl = fileOrBase64;
        } else {
          fallbackUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(fileOrBase64);
          });
        }
        if (fallbackUrl) {
          return {
            success: true,
            url: fallbackUrl,
            error: "Uploaded as Local Data URI fallback: " + (e.message || "Unknown error")
          };
        }
      } catch (innerErr) {}
      return { success: false, error: e.message || "Failed to upload image." };
    }
  };`;

const newMethod = `  const uploadImage = async (fileOrBase64: File | string, fileName: string): Promise<{ success: boolean; url?: string; error?: string }> => {
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
        return response; // Return the error if Cloudinary failed (success: false)
      }
    } catch (e: any) {
      console.error("Upload failed", e);
      return { success: false, error: e.message || "Failed to upload image." };
    }
  };`;

code = code.replace(oldMethod, newMethod);
fs.writeFileSync('src/context/ContentContext.tsx', code);
