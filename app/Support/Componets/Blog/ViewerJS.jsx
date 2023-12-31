'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Warning from '@editorjs/warning'
import LinkTool from '@editorjs/link'
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import AttachesTool from '@editorjs/attaches'
import Image from '@editorjs/image'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { addToDatabase, addToDoc, fetchDocument, updateArrayDatabaseItem, updateDatabaseItem } from '../../MyCodes/Database';
import { format } from 'date-fns';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { STORAGE } from '@/Firebase';


function ViewerJSX({ editBlog, data, postMeta, SetsavingBlog }) {
    console.log(data)
    const [refreash, setRefreash] = useState(false)


    const initEditor = (toggleRead = false) => {

        const editor = new EditorJS({
            /** 
             * Id of Element that should contain the Editor 
             */
            holder: 'editorjs',
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['marker', 'inlineCode'],
                    config: {
                        placeholder: 'Header' || '',
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                image: {
                    class: Image,
                    inlineToolbar: true,
                    config: {
                        types: 'image/*, video/mp4',
                        uploader: {
                            async uploadByFile(file) {
                                const storageRef = ref(STORAGE, 'images/BlogPost/' + file.name);
                                var metadata = {
                                    contentType: 'image/jpeg'
                                };
                                var uploadTask = await uploadBytesResumable(storageRef, file);
                                const downloadURL = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
                                    return downloadURL
                                })
                                return {
                                    success: 1,
                                    file: {
                                        url: downloadURL
                                    }
                                }
                            }
                        }
                    }
                },
                simpleimage: SimpleImage,
                checklist: {
                    class: CheckList,
                    inlineToolbar: true,
                },
                attaches: {
                    class: AttachesTool,
                    config: {
                        /**
                         * Custom uploader
                         */
                        uploader: {
                            /**
                             * Upload file to the server and return an uploaded image data
                             * @param {File} file - file selected from the device or pasted by drag-n-drop
                             * @return {Promise.<{success, file: {url}}>}
                             */
                            async uploadByFile(file) {
                                const storageRef = ref(STORAGE, 'images/Attachments/' + file.name);
                                var uploadTask = await uploadBytesResumable(storageRef, file);
                                const downloadURL = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
                                    return downloadURL
                                })
                                return {
                                    success: 1,
                                    file: {
                                        url: downloadURL
                                    }
                                }
                            }
                        }
                    }
                },
                delimiter: Delimiter,
                embed: Embed,
                linktool: LinkTool,
                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                },
                raw: Raw,
                table: {
                    class: Table,
                    inlineToolbar: true,
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C',
                },
                code: Code,
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                },
                quote: Quote
            },
            onChange: async (api, event) => {
                saveBlog(editor)


            },
            onReady: (api) => {
                editorInstance.current = editor;
            },

            data: savedBlog ? savedBlog : data?.data,
            readOnly: !editBlog

        });

    }




    const [savedBlog, setsavedBlog] = useState()
    const [blogID, setblogID] = useState(0)
    const editorInstance = useRef();


    const saveBlog = async (editor) => {
        if (editor != 'meta') editor.save().then(async (outputData) => {
            setsavedBlog(outputData)
            const titleInput = (document.querySelector('#title'))
            const inputValue = titleInput.value

            if (inputValue != '') {
                titleInput.classList.remove('red')
                SetsavingBlog(true)

                await addToDoc('Blogs', `B-${data.blogID}`, {
                    data: outputData,
                    meta: postMeta ? postMeta : data.meta,
                    title: inputValue,
                    date: format(Date.now(), 'MM-dd-yyyy'),
                    blogID: data.blogID
                })

                for (let index = 0; index < postMeta?.tag ? postMeta.tag?.length : 0; index++) {
                    updateArrayDatabaseItem('META', 'Blogs', 'blogTags', postMeta.tags[index])

                }
                setTimeout(() => {
                    SetsavingBlog(false)
                }, 2000);
            } else {
                titleInput.placeholder = 'Requires Title to save'
                titleInput.classList.add('red')
                SetsavingBlog(false)

            }

        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
        //toggleNewBlog();

        if (editor == 'meta')
            await addToDoc('Blogs', `B-${data.blogID}`, {
                meta: postMeta ? postMeta : data.meta,
            })
    }

    useEffect(() => {
        if (postMeta) saveBlog('meta')
    }, [postMeta])


    useEffect(() => {
        if (!editorInstance.current) {
            initEditor();
        }
        if (!refreash) setTimeout(() => {
            setRefreash(true)
        }, 100);
        return () => {
            editorInstance.current?.destroy();
            editorInstance.current = null;
        }
    }, [postMeta, editBlog, refreash]);


    return (
        <div id='editorjs' className='editorJs blog bg-white w-full px-2 mx-auto relative rounded'></div>

    )
}

export default ViewerJSX