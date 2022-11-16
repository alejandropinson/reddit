export interface MediaEmbed {}

export interface SecureMediaEmbed {}

export interface AuthorFlairRichtext {
  a: string;
  u: string;
  e: string;
  t: string;
}

export interface Gildings {
  gid_1: number;
  gid_3: number;
}

export interface Source {
  url: string;
  width: number;
  height: number;
}

export interface Resolution {
  url: string;
  width: number;
  height: number;
}

export interface Variants {}

export interface Image {
  source: Source;
  resolutions: Resolution[];
  variants: Variants;
  id: string;
}

export interface Preview {
  images: Image[];
  enabled: boolean;
}

export interface ResizedIcon {
  url: string;
  width: number;
  height: number;
}

export interface ResizedStaticIcon {
  url: string;
  width: number;
  height: number;
}

export interface AllAwarding {
  giver_coin_reward?: any;
  subreddit_id?: any;
  is_new: boolean;
  days_of_drip_extension?: number;
  coin_price: number;
  id: string;
  penny_donate?: any;
  coin_reward: number;
  icon_url: string;
  days_of_premium?: number;
  icon_height: number;
  tiers_by_required_awardings?: any;
  resized_icons: ResizedIcon[];
  icon_width: number;
  static_icon_width: number;
  start_date?: any;
  is_enabled: boolean;
  awardings_required_to_grant_benefits?: any;
  description: string;
  end_date?: any;
  sticky_duration_seconds?: any;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons: ResizedStaticIcon[];
  icon_format: string;
  award_sub_type: string;
  penny_price?: number;
  award_type: string;
  static_icon_url: string;
}

export interface Data2 {
  approved_at_utc?: any;
  subreddit: string;
  selftext: string;
  user_reports: any[];
  saved: boolean;
  mod_reason_title?: any;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: any[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class?: any;
  downs: number;
  thumbnail_height: number;
  top_awarded_type?: any;
  parent_whitelist_status: string;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color: string;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbed;
  thumbnail_width: number;
  author_flair_template_id: string;
  is_original_content: boolean;
  author_fullname: string;
  secure_media?: any;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category?: any;
  secure_media_embed: SecureMediaEmbed;
  link_flair_text?: any;
  can_mod_post: boolean;
  score: number;
  approved_by?: any;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class?: any;
  author_flair_richtext: AuthorFlairRichtext[];
  gildings: Gildings;
  post_hint: string;
  content_categories?: any;
  is_self: boolean;
  mod_note?: any;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category?: any;
  banned_by?: any;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html?: any;
  likes?: any;
  suggested_sort?: any;
  banned_at_utc?: any;
  url_overridden_by_dest: string;
  view_count?: any;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: Preview;
  all_awardings: AllAwarding[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: string;
  treatment_tags: any[];
  visited: boolean;
  removed_by?: any;
  num_reports?: any;
  distinguished?: any;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by?: any;
  removal_reason?: any;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  num_duplicates: number;
  report_reasons?: any;
  author: string;
  discussion_type?: any;
  num_comments: number;
  send_replies: boolean;
  media?: any;
  contest_mode: boolean;
  author_patreon_flair: boolean;
  author_flair_text_color: string;
  permalink: string;
  whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  mod_reports: any[];
  is_video: boolean;
  comment_type?: any;
  replies: any;
  collapsed_reason_code?: any;
  parent_id: string;
  collapsed?: boolean;
  body: string;
  is_submitter?: boolean;
  body_html: string;
  collapsed_reason?: any;
  associated_award?: any;
  unrepliable_reason?: any;
  score_hidden?: boolean;
  link_id: string;
  controversiality?: number;
  depth?: number;
  collapsed_because_crowd_control?: any;
  count?: number;
  children: string[];
}

export interface Child {
  kind: string;
  data: Data2;
}

export interface Data {
  after?: any;
  dist?: number;
  modhash: string;
  geo_filter: string;
  children: Child[];
  before?: any;
}

export interface RootObject {
  kind: string;
  data: Data;
}
