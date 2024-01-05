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
import { addToDoc, fetchDocument, updateArrayDatabaseItem } from '../../MyCodes/Database';
import { format } from 'date-fns';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { STORAGE } from '@/Firebase';




function EditorJSX({ data, postMeta, SetsavingBlog }) {
    const [refreash, setRefreash] = useState(false)


    const initEditor = (postMeta) => {


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
                setblogID(await saveBlog(editor))


            },
            onReady: (api) => {
                editorInstance.current = editor;
            },

            data: savedBlog
        });


    }

    const [savedBlog, setsavedBlog] = useState({})
    const [blogID, setblogID] = useState(0)
    const [dataBlog, dataMETADATA] = data
    const editorInstance = useRef();
    const postTags = dataMETADATA?.postTags ? dataMETADATA?.postTags : []

    const saveBlog = async (editor) => {
        editor.save().then(async (outputData) => {
            setsavedBlog(outputData)
            const titleInput = (document.querySelector('#title'))
            const inputValue = titleInput.value

            if (inputValue != '') {
                titleInput.classList.remove('red')
                SetsavingBlog(true)

                const { blogID } = await fetchDocument('META', 'blogs')

                await addToDoc('Blogs', `B-${blogID}`, {
                    data: outputData,
                    meta: postMeta,
                    title: inputValue,
                    date: format(Date.now(), 'MM-dd-yyyy'),
                    blogID: blogID


                })
                for (let index = 0; index < postMeta?.tags ? postMeta?.tags.length : 0; index++) {
                    await updateArrayDatabaseItem('META', 'blogs', 'blogTags', postMeta.tags[index])

                }
                setTimeout(() => {
                    SetsavingBlog(false)
                }, 1000);
            } else {
                titleInput.placeholder = 'Requires Title to save'
                titleInput.classList.add('red')
                SetsavingBlog(false)

            }

        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
        //toggleNewBlog();
    }

    useEffect(() => {
        if (!editorInstance.current) {
            initEditor();
        }
        if (!refreash) setTimeout(() => {
            setRefreash(true)
        }, 100);
        return () => {
            editorInstance?.current?.destroy();
            editorInstance.current = null;
        }
    }, [postMeta, refreash]);
    return (
        <div id='editorjs' className='blog bg-white w-full px-2 mx-auto relative rounded'></div>

    )
}

export default EditorJSX