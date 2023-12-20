'use client'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { STORAGE } from "../../../Firebase";


export async function useUploader(file, folder) {
    let URL;
    const storage = STORAGE;
    const storageRef = ref(storage, `images/${folder}/${file.name}`);

    const uploadTask = await uploadBytesResumable(storageRef, file);
    await getDownloadURL(storageRef).then((downloadURL) => {
        URL = downloadURL;
    });





    return URL
}

