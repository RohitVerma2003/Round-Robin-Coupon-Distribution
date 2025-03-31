import React, { useState } from 'react'
import useAdmin from '../Hooks/useAdmin'

const AddCoupon = ({setError , setDone}) => {
  const [formData, setFormData] = useState({ code: '', limit: '', date: '' })
  const {addCoupon , loading} = useAdmin();

  const handleInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = await addCoupon(formData)

    if (!data.ok) {
      setError(data.message)
      return
    } else {
      console.log('Data: ', data)
      setError(null)
      setDone("Coupon added successfully refresh the page to see the changes.");
    }
  }
  return (
    <div className='addCoupon'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='code'>Code:</label>
        <input
          type='text'
          id='code'
          name='code'
          value={formData.code}
          onInput={handleInput}
          required
        />
        <label htmlFor='limit'>Limit:</label>
        <input
          type='text'
          id='limit'
          name='limit'
          value={formData.limit}
          onInput={handleInput}
          required
        />
        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          value={formData.date}
          onInput={handleInput}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        <button type='submit' className='claimButton'>
          AddCoupon
        </button>
      </form>
    </div>
  )
}

export default AddCoupon
