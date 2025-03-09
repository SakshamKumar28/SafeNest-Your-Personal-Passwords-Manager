import React, { use } from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef()
    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        if (!passwordVisible) {
            ref.current.src = '/icons/closeeye.png'
        }
        else {
            ref.current.src = '/icons/openeye.png'
        }
        setPasswordVisible(!passwordVisible)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const savePassword = () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            toast('Please fill all the fields', { 
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false, 
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        toast('Added Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
        setPasswordArray(newPasswordArray);
        localStorage.setItem('passwords', JSON.stringify(newPasswordArray));
        setform({ site: "", username: "", password: "" });
    };

    const copyText = (e) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(e.target.parentNode.innerText)
    }

    const deletePassword = (id) => {
        let c = confirm('Are you sure you want to delete this password?')
        if (!c) {
            return
        }
        toast('Deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setPasswordArray(passwordArray.filter(password => password.id !== id))
        localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(password => password.id !== id)))
    }

    const editPassword = (id) => {
        console.log(id)
        setform(passwordArray.filter(password => password.id === id)[0])
        setPasswordArray(passwordArray.filter(password => password.id !== id))
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            
            <div className='container mx-auto  max-w-4xl  p-4 flex flex-col  items-center mt-4 m-0'>
                <h1 className='font-bold text-2xl'>Safe<span className='text-green-900'>Nest</span></h1>
                <p className='text-green-700 font-md'>Manage your Passwords here. </p>
                <div className=' flex flex-col  p-4 w-full gap-4 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className=' rounded-lg border border-green-500 w-full px-2 py-0.5' type="text" name="site" id="url" />
                    <div className='flex space-x-2 gap-8 w-full md:w-full justify-center items-center flex-col md:flex-row' >
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className=' rounded-lg border border-green-500  px-2 py-0.5 w-full' type="text" name="username" id="username" />
                        <div className='relative w-full flex items-center gap-2'>
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className=' rounded-lg border border-green-500  px-2 py-0.5 w-full' type={passwordVisible ? 'text' : 'password'} name="password" id="password" />
                            <span className='absolute right-[2.5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='w-5' src="/icons/openeye.png" alt="open eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-3 py-1 gap-2 w-fit hover:bg-green-300'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover" className="w-6 h-6">
                    </lord-icon>Save</button>

                </div>
                <h2 className='font-semibold mb-2'>Your Passwords..</h2>
                <div className="passwords w-full mt-2 overflow-auto">
                    
                    {passwordArray.length === 0 && <p className='text-center text-green-700 font-medium'>No Passwords saved yet</p>}
                    {passwordArray.length != 0 &&
                        <table className='table-auto w-full overflow-hidden rounded-lg m-0 p-0'>
                            <thead className='bg-green-600 text-white'>
                                <tr>
                                    <th className='py-1 px-1 border border-white'>Website</th>
                                    <th className='py-1 px-1 border border-white'>Username</th>
                                    <th className='py-1  px-1 border border-white'>Password</th>
                                    <th className='py-1  px-1 border border-white'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((password, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center py-1 border border-white px-2 space-x-2'><a href={password.site.startsWith('http') ? password.site : `http://${password.site}`} target='_blank'>{password.site}</a>
                                                <lord-icon onClick={copyText}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" className="w-5 h-5 cursor-pointer">
                                                </lord-icon></td>
                                            <td className='text-center py-1 border border-white items-center px-2 space-x-2'>{password.username}
                                                <lord-icon onClick={copyText}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" className="w-5 h-5 cursor-pointer">
                                                </lord-icon>
                                            </td>
                                            <td className='text-center py-1 border border-white space-x-2'>{password.password}
                                                <lord-icon onClick={copyText}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" className="w-5 h-5 cursor-pointer">
                                                </lord-icon>
                                            </td>
                                            <td className='text-center py-1 border border-white space-x-2'>
                                                <lord-icon onClick = {()=>{editPassword(password.id)}}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover" className="w-5 h-5 cursor-pointer">
                                                </lord-icon>


                                                <lord-icon onClick={() => {deletePassword(password.id)}}
                                                
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover" className="w-5 h-5 cursor-pointer">
                                                </lord-icon>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
