import { Body, Controller, Headers, Post, UnauthorizedException } from "@nestjs/common";
import { StreamService } from "../service";
import { createHmac } from "crypto";

@Controller("webhook/livekit")
export class LivekitWebhookController {
    constructor(
        private readonly streamService: StreamService
    ) { }

    @Post()
    async handleWebhook(
        @Body() payload: any,
        @Headers('authorization') authHeader: string
    ) {
        this.verifySignature(payload, authHeader);

        const event = payload.event;

        // if (event === 'egress_ended') {
        //     await this.streamService.handleRecordingFinished(payload);
        // }

        // if (event === 'room_finished') {
        //     await this.streamService.handleRoomEnded(payload);
        // }

        return { ok: true };
    }
    private verifySignature(payload: any, authHeader: string) {
        const secret = process.env.LIVEKIT_WEBHOOK_SECRET;
        if (!secret) return;

        const signature = authHeader?.replace('Bearer ', '');
        const hash = createHmac('sha256', secret)
            .update(JSON.stringify(payload))
            .digest('hex');

        if (hash !== signature) {
            throw new UnauthorizedException('Invalid webhook signature');
        }
    }
}