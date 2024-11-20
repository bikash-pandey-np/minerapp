import React, { useState, useEffect } from 'react';
const Test = () => {
    const identifier = 'c5e58a8b-8003-4407-95af-d5b90047bec5';
    const [totalEarned, setTotalEarned] = useState(0);

    // useEffect(() => {
    //     window.Echo.channel(`miner-${identifier}`)
    //         .listen('.MinerTotalEarnedEvent', (e) => {
    //             console.log('Simple event received:', e);
    //             setTotalEarned(e.total_earned);
    //         });

    //         return () => {
    //             console.log('Unsubscribing from channel:', `miner.${identifier}`);
    //             window.Echo.leave(`miner`);
    //         };
    // }, []);
    
    return (
        <div>
            <p>Total Earned: {totalEarned}</p>
        </div>
    );
}

export default Test;
