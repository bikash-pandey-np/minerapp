import Layout from "../Layout";
import { useState, useCallback } from "react";
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

const Index = ({payments, searchStatus}) => {
    console.log(payments);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((value) => {
        let timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            Inertia.get(route('admin.planPayments'), { search: value }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 300);
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleApprove = (payment) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to confirm this payment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.approvePayment'), {
                    id: payment.id
                });
            }
        });
    };

    const handleReject = (payment) => {
        Swal.fire({
            title: 'Reject Payment',
            input: 'textarea',
            inputLabel: 'Reason for rejection',
            inputPlaceholder: 'Enter your reason here...',
            showCancelButton: true,
            confirmButtonText: 'Reject',
            confirmButtonColor: '#d33',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to provide a reason!';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.rejectPayment'), {
                    id: payment.id,
                    reason: result.value
                });
                
            }
        });
    };

    return <Layout>
        <div className="overflow-x-auto">
            <div className="mb-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search transactions, customers, or plans..."
                        className="input input-bordered w-full max-w-xs"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchStatus && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                Inertia.get(route('admin.planPayments'), {}, {
                                    preserveState: true,
                                    preserveScroll: true,
                                    replace: true
                                });
                            }}
                            className="btn btn-warning btn-sm ml-2 flex items-center gap-2"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>
            <table className="table table-zebra">
                <thead className="bg-base-300">
                    <tr>
                        <th>Transaction Details</th>
                        <th>Customer Details</th>
                        <th>Amount</th>
                        <th>Miner Plan</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-base-100">
                    {payments.data.map(payment => (
                        <tr key={payment.id}>
                            <td>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">
                                        ID: {payment.transaction_identifier}
                                    </span>
                                    <span className="text-xs opacity-70">
                                        Hash: {payment.txn_hash}
                                    </span>
                                    <span className="text-xs opacity-70">
                                        Date: {payment.new_created_at}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">
                                        {payment.customer.email}
                                    </span>
                                    <span className="text-xs opacity-70">
                                        Account: {payment.customer.account_id}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="font-medium">
                                    {parseFloat(payment.investment_amount).toFixed(2)} USDT
                                </span>
                            </td>
                            <td>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">
                                        {payment.miner_plan.name}
                                    </span>
                                    <span className="text-xs opacity-70">
                                        Hash Power: {payment.miner_plan.hash_power}
                                    </span>
                                    <span className="text-xs opacity-70">
                                        Duration: {payment.miner_plan.duration} days
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className={`badge badge-sm ${payment.status === 'approved' ? 'badge-success text-white' : payment.status === 'rejected' ? 'badge-error text-white' : 'badge-warning'}`}>
                                    {payment.status}
                                </span>
                            </td>
                            <td>
                                {payment.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button 
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleApprove(payment)}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleReject(payment)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}

                                {payment.status === 'approved' && (
                                    <span className="text-xs opacity-70">
                                        Approved at <span className="font-medium font-mono">{payment.approved_at}</span>
                                    </span>
                                )}

                                {payment.status === 'rejected' && (
                                    <>
                                    <span className="text-xs opacity-70">
                                        Reason: <span className="font-medium font-mono">{payment.reject_reason}</span>
                                    </span>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="join mt-4 flex justify-center">
                {payments.links.map((link, index) => (
                    <button 
                        key={index}
                        className={`join-item btn btn-sm ${
                            link.active ? 'btn-active' : ''
                        } ${!link.url ? 'btn-disabled' : ''}`}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        onClick={() => {
                            if (link.url) {
                                window.location.href = link.url;
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    </Layout>;
};

export default Index;
