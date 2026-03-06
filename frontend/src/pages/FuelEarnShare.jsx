import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const FuelEarnShare = () => {
    const [code, setCode] = useState("");
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkCoupon = async () => {
        try {
            setLoading(true);
            const { data } = await api.post("/api/coupons/validate-fuel", { code });
            setCoupon(data);
            toast.success("Coupon found!");
        } catch (err) {
            setCoupon(null);
            toast.error(err.response?.data?.message || "Invalid coupon");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#171717] text-white p-6">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl text-yellow-400 font-bold mb-6 text-center">
                    Fuel • Share • Earn
                </h1>

                {/* INPUT */}
                <div className="flex gap-2 mb-8">
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 p-3 bg-black border border-yellow-400 rounded"
                    />
                    <button
                        onClick={checkCoupon}
                        className="bg-yellow-400 text-black px-4 rounded font-bold"
                    >
                        {loading ? "Checking..." : "Check"}
                    </button>
                </div>

                {/* PREMIUM COUPON HEADER */}
                <div className="text-center mb-10 relative">

                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                        Unlock Your Performance Advantage
                    </h2>

                    <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                        This isn’t just a discount. It’s fuel for your grind. Enter your exclusive
                        code and activate special pricing on selected MPACT products.
                    </p>

                    <div className="mt-4 flex justify-center">
                        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></div>
                    </div>
                </div>

                {/* COUPON DETAILS */}
                {coupon && (
                    <div className="bg-[#1f1f1f] p-6 rounded-lg border border-yellow-400/40 mb-8">

                        <h2 className="text-2xl text-yellow-400 font-bold">
                            {coupon.code}
                        </h2>

                        <p className="mt-2">
                            Discount:{" "}
                            {coupon.discountType === "percentage"
                                ? `${coupon.discountValue}% OFF`
                                : `₹${coupon.discountValue} OFF`}
                        </p>

                        <p className="mt-2 text-sm text-gray-400">
                            Valid till: {new Date(coupon.expiryDate).toLocaleDateString()}
                        </p>

                        {coupon.applicableProducts?.length > 0 ? (
                            <>
                                <h3 className="mt-6 text-yellow-400 font-semibold">
                                    Applicable Products
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                                    {coupon.applicableProducts.map((item) => {
                                        const product = item.product;
                                        if (!product) return null;

                                        return (
                                            <div
                                                key={product._id}
                                                onClick={() => navigate(`/productspec/${product._id}`)}
                                                className="bg-black border border-yellow-400/30 rounded-lg p-4 cursor-pointer hover:scale-105 transition"
                                            >
                                                <img
                                                    src={product.images?.[0]?.url}
                                                    alt={product.name}
                                                    className="w-full h-40 object-cover rounded"
                                                />

                                                <h4 className="mt-3 font-bold text-white">
                                                    {product.name}
                                                </h4>

                                                <p className="text-green-400 font-semibold">
                                                    ₹{product.price}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <p className="mt-4 text-green-400 font-medium">
                                Applies to all products
                            </p>
                        )}

                        {/* <div className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded font-bold text-center">
              Use this coupon at checkout
            </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FuelEarnShare;