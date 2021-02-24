import {
  MarkdownPublishPod,
  PublishPodConfigV3,
  PublishPodPlantOptsV3,
  PublishPodV3,
} from "@dendronhq/pods-core";
import { Client } from "devto-nodejs-sdk";

type DevToConfig = PublishPodConfigV3 & {
  apiKey: string;
};

type DevToArticleRequest = {
  title: string;
  tags?: string[];
  published: boolean;
  body_markdown: string;
  canonical_url?: string;
};

class DevToPod extends PublishPodV3<DevToConfig> {
  static id: string = "dendron.devto";
  static description: string = "publish notes to dev.to";

  async plant(opts: PublishPodPlantOptsV3<DevToConfig>) {
    const { config, engine, note } = opts;

    // get regular markdown
    const md = new MarkdownPublishPod();
    const body = await md.execute(opts);

    const resp = await engine.getConfig();
    const canonical_url = resp.data?.site.siteUrl;
    const title = note.title;
    const tags = note.custom.tags || [];
    const article: DevToArticleRequest = {
      title,
      published: true,
      tags,
      body_markdown: body,
      canonical_url,
    };
    // @ts-ignore
    const client = new Client(config.apiKey);
    const { data } = await client.createArticle({ article });
    return JSON.stringify(data);
  }
}

export const pods = [DevToPod];
