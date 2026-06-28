import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addUser, deleteUser, fetchUsers, updateUser } from '../redux/slice/adminSlice'


const UserManagement = () => {
   
  const dispatch =useAppDispatch()
  const navigate = useNavigate()

  const {user} = useAppSelector((state)=>state.auth)
  const {users,loading,error}=useAppSelector((state)=>state.admin)

  useEffect(()=>{
    if(!user || user.role !== "admin"){
      navigate("/")
      return
    }

    dispatch(fetchUsers())
  },[dispatch,user,navigate])

 
  const [formData,setFormData]= React.useState({
        name :"",
        email:"",
        password:"",
        role:"customer"
})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addUser(formData))
    setFormData ({
      name:"",
      email:"",
      password:"",
      role:"customer"
    })
  }

  const handleRoleChange = (userId: string,newRole:string) =>{
    dispatch(updateUser({id:userId,role:newRole}))
  }

  const handleDeleteUser= (userId: string) =>{
    if(window.confirm("Are you sure you want to delete this account")) {
      dispatch(deleteUser(userId))
    }
  }

  return (
    
  
    <div className='text-left max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>
            User Management
        </h2>
        {error && <p className='mb-4 text-red-600'>{error}</p>}
        {/* Add New User Form */}
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-lg font-bold mb-4'>
                Add New User
            </h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Name</label>
                <input type='text' name="name" value={formData.name} onChange={handleChange}
                  className='w-full p-2 border rounded' required/>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Email</label>
                <input type='email' name="email" value={formData.email} onChange={handleChange}
                  className='w-full p-2 border rounded' required/>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Password</label>
                <input type='password' name="password" value={formData.password} onChange={handleChange}
                  className='w-full p-2 border rounded' required/>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}
                  className='w-full p-2 h-10 border rounded'>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
              </div>
              <button type="submit" disabled={loading} className='bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400'>
                {loading ? "Saving..." : "Add User"}
              </button>
            </form>
        </div>

        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='min-w-full text-left text-gray-500'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
              <tr>
                <th className='py-3 px-4'>Name</th>
                <th className='py-3 px-4'>Email</th>
                <th className='py-3 px-4'>Role</th>
                <th className='py-3 px-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={4} className='p-4 text-center text-gray-500'>Loading users...</td>
                </tr>
              ) : users.length > 0 ? users.map((user) => (
                <tr key={user._id} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                    {user.name}
                  </td>
                  <td className='p-4 font-medium text-gray-900'>
                    {user.email}
                  </td>
                  <td className='p-4 font-medium text-gray-900'>
                    <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className='p-2 border rounded'>
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className='p-4 font-medium text-gray-900'>
                    <button onClick={()=> handleDeleteUser(user._id)}
                    className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>Delete User</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className='p-4 text-center text-gray-500'>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default UserManagement
