import { useState } from 'react'
import useClaimCoupon from './Hooks/useClaimCoupon.js'
import { Route, Routes } from 'react-router-dom'
import Admin from './Pages/Admin.jsx'

const App = () => {
  const { claimCoupon, loading } = useClaimCoupon()
  const [coupon, setCoupon] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = async () => {
    const data = await claimCoupon()

    if (data.ok) {
      setCoupon(data.message)
      setError(null)
    } else {
      setError(data.message)
    }
  }
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <>
            <div className='main'>
              <h1 className='head'>Round Robin Coupon Ditribution</h1>
              <button
                onClick={handleClick}
                className='claimButton'
                disabled={loading}
              >
                {!loading ? 'Claim Coupon' : 'Getting Coupon....'}
              </button>
              {coupon && (
                <div className='card' id='safe'>
                  {coupon}
                </div>
              )}
              {error && (
                <div className='card' id='danger'>
                  {error}
                </div>
              )}
            </div>
          </>
        }
      />

      <Route exact path='/admin' element={<Admin/>}/>
    </Routes>
  )
}

export default App
