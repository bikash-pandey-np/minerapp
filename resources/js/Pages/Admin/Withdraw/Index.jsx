import Layout from "../Layout";
import { useState, useCallback } from "react";
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

const Index = ({logs, searchStatus}) => {
    console.log(logs);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((value) => {
        let timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            Inertia.get(route('admin.withdraw'), { search: value }, {
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

    const handleApprove = (withdraw) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to process this withdrawal?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, process it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.processWithdraw', { identifier: withdraw.identifier }));
            }
        });
    };

    const handleComplete = (withdraw) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to mark this withdrawal as completed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, complete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('admin.completeWithdraw', { identifier: withdraw.identifier }));
            }
        });
    };

    const handleReject = (withdraw) => {
        Swal.fire({
            title: 'Reject Withdrawal',
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
                console.log('rejecting', result.value);
                Inertia.post(route('admin.rejectWithdraw', { identifier: withdraw.identifier }), {
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
                        placeholder="Search withdrawals..."
                        className="input input-bordered w-full max-w-xs"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchStatus && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                Inertia.get(route('admin.withdraw'), {}, {
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
                        <th>Amount Details</th>
                        <th>Wallet Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-base-100">
                    {logs.data.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No records found
                            </td>
                        </tr>
                    ) : (
                        logs.data.map(withdraw => (
                            <tr key={withdraw.id}>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">
                                            ID: {withdraw.identifier}
                                        </span>
                                        <span className="text-xs opacity-70">
                                            Date: {new Date(withdraw.new_created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">
                                            {withdraw.customer.email}
                                        </span>
                                        <span className="text-xs opacity-70">
                                            Account: {withdraw.customer.account_id}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">
                                            Request: {parseFloat(withdraw.request_amount).toFixed(2)} USDT
                                        </span>
                                        <span className="text-xs opacity-70">
                                            Fee: {parseFloat(withdraw.fee).toFixed(2)} USDT
                                        </span>
                                        <span className="text-xs opacity-70">
                                            Net: {parseFloat(withdraw.net_amount).toFixed(2)} USDT
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-xs font-mono">
                                        {withdraw.trc_20_wallet_address}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge badge-sm ${withdraw.status === 'completed' ? 'badge-success text-white' : withdraw.status === 'rejected' ? 'badge-error text-white' : withdraw.status === 'processing' ? 'badge-info text-white' : 'badge-warning'}`}>
                                        {withdraw.status}
                                    </span>
                                </td>
                                <td>
                                    {withdraw.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button 
                                                className="btn btn-sm btn-info"
                                                onClick={() => handleApprove(withdraw)}
                                            >
                                                Process
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleReject(withdraw)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    {withdraw.status === 'processing' && (
                                        <div className="flex gap-2">
                                            <button 
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleComplete(withdraw)}
                                            >
                                                Complete
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleReject(withdraw)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    {withdraw.status === 'completed' && (
                                        <span className="text-xs opacity-70">
                                            Completed at <span className="font-medium font-mono">{new Date(withdraw.completed_at).toLocaleString()}</span>
                                        </span>
                                    )}

                                    {withdraw.status === 'rejected' && (
                                        <span className="text-xs opacity-70">
                                            Reason: <span className="font-medium font-mono">{withdraw.remark}</span>
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="join mt-4 flex justify-center">
                {logs.links.map((link, index) => (
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

