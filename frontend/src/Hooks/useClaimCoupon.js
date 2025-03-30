import { useState } from "react"

const useClaimCoupon = () => {
    const [loading, setLoading] = useState(false);

    const claimCoupon = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/getCoupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { claimCoupon, loading };
}

export default useClaimCoupon;