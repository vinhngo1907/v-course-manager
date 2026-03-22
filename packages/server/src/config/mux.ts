import { Injectable } from '@nestjs/common';
import Mux from '@mux/mux-node';

@Injectable()
export class MuxService {
  private mux: Mux;

  constructor() {
    this.mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID!,
      tokenSecret: process.env.MUX_TOKEN_SECRET!,
    });
  }

  async createUploadUrl() {
    const upload = await this.mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ['public'],
      },
      cors_origin: '*',
    });

    return upload;
  }

  async createAssetFromUrl(videoUrl: string) {
    return this.mux.video.assets.create({
      inputs: [{ url: videoUrl }],
      playback_policy: ['public'],
      test: false,
    });
  }

  async getAsset(assetId: string) {
    return this.mux.video.assets.retrieve(assetId);
  }

  async deleteAsset(assetId: string) {
    return this.mux.video.assets.delete(assetId);
  }
}
