<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MinerTotalEarnedEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $total_earned;
    public $identifier;
    public $minerIdentifier;
    /**
     * Create a new event instance.
     */
    public function __construct($identifier, $total_earned, $minerIdentifier)
    {
        $this->identifier = $identifier;
        $this->total_earned = $total_earned;
        $this->minerIdentifier = $minerIdentifier;
        // \Log::info('MinerTotalEarnedEvent: ' . $this->identifier . ' ' . $this->total_earned . ' ' . $this->minerIdentifier);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('miner-' . $this->identifier),
        ];
    }

    public function broadcastAs()
    {
        return 'MinerTotalEarnedEvent'; // Ensure this matches in your React app
    }

    
}
