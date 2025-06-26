import React, { useState, useEffect } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { useCart } from 'react-use-cart';
import DBService from "../../data/rest.db.js";
import {useAuth} from '../../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../../lib/countries.js';
import CountrySelector from './CountrySelector.jsx';

const PaymentForm = ({ cartTotal }) => {

    const { t } = useTranslation();
    const { user, isAuthenticated } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const { items } = useCart();

    const [isOpen, setIsOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Contact information
    const [emailInput, setEmailInput] = useState(isAuthenticated ? user.email : '');

    // Shipping information
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [apartmentUnit, setApartmentUnit] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [countryIso, setCountryIso] = useState('US');
    const [country, setCountry] = useState('US');
    const [phone, setPhone] = useState('');
    const [deliveryNotes, setDeliveryNotes] = useState('');

    const backendUrl = process.env.API_BASE_URL || null;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            if(!emailInput){
                setErrorMessage('Email is required.');
                setIsProcessing(false);
                return;
            }

            // Validate the form
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message);
                setIsProcessing(false);
                return;
            }

            // Calculate the price in cents
            const priceInCents = Math.round(cartTotal * 100);

            // Create the PaymentIntent on your backend
            const response = await fetch(`${backendUrl}/pay/gateway/stripe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currency: 'eur',
                    email: emailInput,
                    amount: priceInCents,
                    paymentMethodType: "card"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong with the payment');
            }

            const { client_secret: clientSecret } = await response.json();

            // Confirm the payment
            const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                    receipt_email: emailInput,
                },
                redirect: 'if_required'
            });

            if (confirmError) {
                setErrorMessage(confirmError.message);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Prepare shipping address
                const shippingAddress = {
                    name: `${firstName} ${lastName}`,
                    street: streetAddress,
                    apartment: apartmentUnit,
                    city: city,
                    state: state,
                    zip: zipCode,
                    country: country,
                    phone: phone
                };

                // Format cart items for order storage
                const orderItems = items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    sku: item.sku || null,
                    image: item.image || null,
                }));

                const orderId = `ORD-${paymentIntent.created}-${Math.floor(Math.random() * 1000)}`;

                // Prepare order data for insertion
                const newOrderData = {
                    uid: orderId,
                    cst_email: emailInput,
                    cst_name: `${firstName} ${lastName}`,
                    tx: paymentIntent.id,
                    amount: paymentIntent.amount / 100,
                    currency: paymentIntent.currency,
                    method: paymentIntent.payment_method_types[0],
                    created_at: paymentIntent.created,
                    status: "processing",
                    tracking: "",
                    shipping_address: JSON.stringify(shippingAddress),
                    delivery_notes: deliveryNotes,
                    items: JSON.stringify(orderItems),
                    ref: localStorage.getItem('ref') || ''
                };

                // Insert the new order into the database
                await DBService.create(newOrderData, 'orders');
                window.location.href = `${window.location.origin}/payment-success/${btoa(orderId)}`;
            }
        } catch (err) {
            setErrorMessage(err.message || 'An unexpected error occurred');
        } finally {
            setIsProcessing(false);
        }
    };

    const getDefaultCountry = (countryCode=null) => {
        let lang = navigator.language || 'en-US';
        if(countryCode){
            lang = countryCode.code;
            setCountry(countryCode.name);
            setCountryIso(lang);
        }
        const country = lang.split('-')[1] || 'US';

        const fallback = 'US';
        const supportedCountries = ['US', 'CA', 'GB', 'FR', 'DE', 'AU', 'PT', 'ES'];

        return supportedCountries.includes(country) ? country : fallback;
    };

    useEffect(() => {
        const defaultC = getDefaultCountry();
        setCountry(defaultC);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Contact Information */}
            <div>
                <h2 className="text-lg font-semibold mb-2">{t('Contact Information')}</h2>
                <div className="space-y-4">
                    <input
                        required
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Email address"
                        className="w-full border rounded-xl px-3 py-2"
                    />
                    <PhoneInput
                        required
                        country={countryIso.toLowerCase()}
                        value={phone}
                        onChange={setPhone}
                        inputStyle={{ width: "100%" }}
                        inputClass="!rounded-xl !border !w-full"
                        buttonClass="!rounded-xl"
                    />
                </div>
            </div>

            {/* Shipping Information */}
            <div>
                <h2 className="text-lg font-semibold mb-2">{t('Shipping Information')}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        required
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border rounded-xl px-3 py-2 w-full"
                    />
                    <input
                        required
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border rounded-xl px-3 py-2 w-full"
                    />
                    <input
                        required
                        type="text"
                        placeholder="Street address"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="col-span-2 border rounded-xl px-3 py-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Apartment, unit, etc. (optional)"
                        value={apartmentUnit}
                        onChange={(e) => setApartmentUnit(e.target.value)}
                        className="col-span-2 border rounded-xl px-3 py-2 w-full"
                    />
                    <input
                        required
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border rounded-xl px-3 py-2 w-full"
                    />
                    <input
                        required
                        type="text"
                        placeholder="State/Province"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="border rounded-xl px-3 py-2 w-full"
                    />
                    <input
                        required
                        type="text"
                        placeholder="ZIP / Postal Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="border rounded-xl px-3 py-2 w-full"
                    />
                    <div className="w-full">
                        <CountrySelector
                            id={'countries'}
                            open={isOpen}
                            onToggle={() => setIsOpen(!isOpen)}
                            onChange={val => setCountry(val)}
                            selectedValue={COUNTRIES.find(option => option.value === country)}
                        />
                    </div>
                </div>
            </div>

            {/* Delivery Notes */}
            <div>
                <h2 className="text-lg font-semibold mb-2">{t('Delivery Notes')}</h2>
                <textarea
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Leave instructions for the delivery (optional)"
                    className="w-full border rounded-xl px-3 py-2"
                    rows="3"
                />
            </div>

            {/* Payment Element Section */}
            <div>
                <h2 className="text-lg font-semibold mb-2">{t('Card Information')}</h2>
                <PaymentElement />
            </div>

            {/* Submit Button */}
            <button
                className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 disabled:opacity-50"
                type="submit"
                disabled={!stripe || !elements || isProcessing}
            >
                {isProcessing ? t('Processing') : `${t('Pay')} €${cartTotal}`}
            </button>

            {/* Error Message */}
            {errorMessage && (
                <div className="text-red-600 mt-2 text-sm text-center">{errorMessage}</div>
            )}
        </form>
    );


};

export default PaymentForm;
