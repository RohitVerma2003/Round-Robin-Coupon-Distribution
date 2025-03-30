import { useState } from 'react'
import useClaimCoupon from './Hooks/useClaimCoupon.js'

const App = () => {
  const { claimCoupon , loading } = useClaimCoupon()
  const [coupon, setCoupon] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = async () => {
    const data = await claimCoupon();
    
    if(data.ok){
      setCoupon(data.message);
      setError(null);
    }else{
      setError(data.message);
    }
  }
  return (
    <div className='main'>
      <h1 className='head'>Round Robin Coupon Ditribution</h1>
      <button onClick={handleClick} className='claimButton' disabled={loading}>
        {!loading ? "Claim Coupon" : "Getting Coupon...."}
      </button>
      {coupon && <div className='card' id='safe'>{coupon}</div>}
      {error && <div className='card' id='danger'>{error}</div>}
    </div>
  )
}

export default App
