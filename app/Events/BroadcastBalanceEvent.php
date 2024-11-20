<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BroadcastBalanceEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $balance;
    public $account_id; 

    /**
     * Create a new event instance.
     */
    public function __construct($balance, $account_id)
    {
        $this->balance = $balance;
        $this->account_id = $account_id;
        \Log::info('BroadcastBalanceEvent constructor called with balance: ' . $balance . ' and account_id: ' . $account_id);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('miner-balance-' . $this->account_id),
        ];
    }

    public function broadcastAs()
    {
        return 'BroadcastBalanceEvent'; // Ensure this matches in your React app
    }
}
