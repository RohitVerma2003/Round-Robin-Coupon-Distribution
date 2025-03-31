import React, { useState } from 'react'
import useAdmin from '../Hooks/useAdmin'

const CouponCard = ({ ele ,setError , setDone}) => {
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    code: ele.code,
    limit: ele.limit,
    date: ele.expireAt,
    _id: ele._id
  })

  const { editCoupon, removeCoupon , loading } = useAdmin()

  const handleInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEdit = async e => {
    e.preventDefault()

    const data = await editCoupon(formData)

    if (!data.ok) {
      setError(data.message)
      return
    } else {
      console.log('Coupon edited successfully')
      setEdit(false)
      setDone('Coupon edited successfully refresh page and login again...')
      setError(null)
    }
  }

  const handleDelete = async () => {
    const data = await removeCoupon(ele._id)

    if (!data.ok) {
      setError(data.message)
      return
    } else {
      console.log('Coupon deleted successfully')
      setDone('Coupon deleted successfully refresh page and login again...')
      setError(null)
    }
  }

  return (
    <>
      <div className='couponCard' key={ele._id}>
        {!edit ? (
          <>
            <div>CODE : {ele.code}</div>
            <div>LIMIT : {ele.limit}</div>
            <div>USED : {ele.used}</div>
            <div>EXPIRE AT : {new Date(ele.expireAt).toLocaleDateString()}</div>
            <div className='couponOptions'>
              <button className='couponButton' onClick={() => setEdit(true)}>
                Edit
              </button>
              <button className='couponButton' onClick={handleDelete}>Delete</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEdit}>
            <div>
              CODE :{' '}
              <input
                type='text'
                name='code'
                id='code'
                required
                value={formData.code}
                onInput={handleInput}
              />
            </div>
            <div>
              LIMIT :{' '}
              <input
                type='number'
                name='limit'
                id='limit'
                min={1}
                required
                value={formData.limit}
                onInput={handleInput}
              />
            </div>
            <div>
              EXPIRE AT :{' '}
              <input
                type='date'
                name='date'
                id='date'
                min={new Date().toISOString().split('T')[0]}
                required
                value={formData.date}
                onInput={handleInput}
              />
            </div>
            <div className='couponOptions'>
              <button className='couponButton' type='submit'>
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default CouponCard
