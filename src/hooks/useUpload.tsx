import {
  ref,
  StorageReference,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const uploadFile = (
  file: File,
  ref: StorageReference,
  cb: (percentage: number, downloadUrl: string | null) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(ref, file);
    task.on(
      "state_changed",
      (e) => {
        cb(e.bytesTransferred / e.totalBytes, null);
      },
      (err) => reject(err),
      () => {
        cb(1, null);
      }
    );

    task.then(
      async (snapshot) => {
        const url = await getDownloadURL(snapshot.ref);
        cb(1, url);
        resolve(url);
      },
      (err) => reject(err)
    );
  });
};

export type UploadFunction = (
  file: File,
  storageRef: StorageReference,
  callback?: (percentage: number) => void
) => Promise<string | null>;

export const useUpload = (): UploadFunction => {
  const upload: UploadFunction = async (file, storageRef, callback) => {
    if (!!file) {
      let downloadUrl = "";

      await uploadFile(file, storageRef, (_percentage, _url) => {
        if (_url) downloadUrl = _url;
        if (callback) callback(_percentage * 100);
      });

      return downloadUrl;
    }

    return null;
  };

  return upload;
};
