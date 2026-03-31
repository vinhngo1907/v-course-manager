import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppConfigService } from 'src/config/service';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;
  private readonly bucket: string;
  private readonly folder: string;

  constructor(private readonly appConfigService: AppConfigService) {
    const cfg = this.appConfigService.getSupabaseConfig();

    this.client = createClient(cfg.url, cfg.accessKey);

    this.bucket = cfg.bucket;
    this.folder = cfg.folder;
  }

  getClient() {
    return this.client;
  }

  getBucket() {
    return this.bucket;
  }

  getFolder() {
    return this.folder;
  }

  async getPublicUrl(path: string) {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(path);

    return data.publicUrl;
  }

  async getSignedUrl(path: string, expiresIn = 60 * 60) {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;

    return data.signedUrl;
  }
}
