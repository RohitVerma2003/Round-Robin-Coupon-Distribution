import { useState } from "react"

const useAdmin = () => {
    const [loading, setLoading] = useState(false);

    const adminLogin = async (formData) => {
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getCoupons = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/admin/getCoupons", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const editCoupon = async (formData) => {
        setLoading(true);

        try {
            const res = await fetch("/api/admin/editCoupon", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const removeCoupon = async (id) => {
        setLoading(true);

        try {
            const res = await fetch("/api/admin/removeCoupon", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            })

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const addCoupon = async (formData) => {
        setLoading(true);

        try {
            const res = await fetch("/api/admin/addCoupon", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { adminLogin, getCoupons, editCoupon, removeCoupon, addCoupon , loading }
}

export default useAdmin;