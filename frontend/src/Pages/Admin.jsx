import React, { useState } from 'react'
import useAdmin from '../Hooks/useAdmin'
import CouponCard from '../components/CouponCard'
import AddCoupon from '../components/AddCoupon'

const Admin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [done, setDone] = useState(null)
  const [coupons, setCoupons] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const { adminLogin, getCoupons, loading } = useAdmin()

  const handleInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getAllCoupons = async () => {
    const data = await getCoupons()

    if (!data.ok) {
      setError(data.message)
      return
    } else {
      console.log('Coupons: ', data)
      setCoupons(data.coupons)
      setError(null)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = await adminLogin(formData)

    if (!data.ok) {
      setError(data.message)
      return
    } else {
      console.log('Data: ', data)
      setError(null)
      setLoggedIn(true)
      getAllCoupons()
    }
  }

  return (
    <div className='admin'>
      <h1 className='head'>Admin</h1>
      <div className='admin_login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onInput={handleInput}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onInput={handleInput}
            required
          />
          <button type='submit' className='claimButton'>
            Login
          </button>
        </form>
      </div>
      {error && (
        <div className='card' id='danger'>
          {error}
        </div>
      )}
      {done && (
        <div className='card' id='safe'>
          {done}
        </div>
      )}

      {loggedIn && <AddCoupon setError={setError} setDone={setDone} />}

      {loading && <div className='head'>Loading...</div>}
      {coupons.length ? (
        <>
          <h2 style={{ textAlign: 'center' }}>All Coupons</h2>
          <div className='coupons'>
            {coupons.map(ele => (
              <CouponCard
                ele={ele}
                key={ele._id}
                setError={setError}
                setDone={setDone}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Admin
