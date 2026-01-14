import { GameConfig, CrosswordRow } from './types';

// Default music (Royalty free placeholder)
export const DEFAULT_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; 

export const HOMECOMING_TEMPLATE_ROWS: CrosswordRow[] = [
  {
    id: 'row-1',
    question: "Một hành động giúp ta quay về với bình tên nội tại?",
    answer: "TROVE",
    contributesAtIndex: 3,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/b0a0de-ee42-bc5f-57a-ee82f8d48e2c_1._TROVE.jpg"
  },
  {
    id: 'row-2',
    question: "Khi mỏi mệt, ta thường mong người khác làm gì cho mình hơn là khuyên?",
    answer: "LANGNGHE",
    contributesAtIndex: 5, 
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/c7fd24-6714-0ae7-acd-07cdcbbc2b04_2._LANGNGHE.jpg"
  },
  {
    id: 'row-3',
    question: "Cách dịu dàng nhất để ở bên cảm xúc mệt mỏi trong mình?",
    answer: "OMAP",
    contributesAtIndex: 1,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/40d8005-a4b4-e847-cfe-348f377471a5_3.OMAP.jpg"
  },
  {
    id: 'row-4',
    question: ".. ... ra để bao dung tất cả. Tôi trở về nâng sự sống trên tay.",
    answer: "MOLONG",
    contributesAtIndex: 1,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/6e1f0bd-5a4f-01-b2-b3c23716f_4.MOLONG.png"
  },
  {
    id: 'row-5',
    question: "Một từ khoá trong cuốn sách của Cô Ruby. Đây Là đơn vị nhỏ nhất nhưng quý giá nhất của sự sống, có thể quan sát được.",
    answer: "HOITHO",
    contributesAtIndex: 1,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/756635-d84f-d4d4-768e-df6a2380a7fd_5.HOITHO.png"
  },
  {
    id: 'row-6',
    question: "Phần nào trong bạn cần được chăm sóc và hàm dưỡng mỗi ngày?",
    answer: "NOITAM",
    contributesAtIndex: 6,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/630cea-a7c3-b022-0dd8-3c8ddf527735_6.NOITAM.jpg"
  },
  {
    id: 'row-7',
    question: "Trạng thái lý tưởng bên trong giúp trí tuệ dễ dàng sinh khởi?",
    answer: "TINHLANG",
    contributesAtIndex: 2,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/a0f8c26-bb50-43f8-3a57-2d4aa016753a_7.TINHLANG.jpg"
  },
  {
    id: 'row-8',
    question: "Phần trong ta không cần cố gắng để trở thành, chỉ cần được là?",
    answer: "BANTHE",
    contributesAtIndex: 3,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/c52572e-81c-60d-833-8bb05f212a0_8.BANTHE.jpg"
  },
  {
    id: 'row-9',
    question: "Phần nào giúp cái cây đứng vững vàng trước giông bão cuộc đời?",
    answer: "GOCRE",
    contributesAtIndex: 1,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/bf0b1d-dac2-23e8-4e15-6022dffea8c4_9.GOCRE.jpg"
  },
  {
    id: 'row-10',
    question: "Phần nào trong ta vừa có thể làm bạn, vừa có thể được chế tác?",
    answer: "CAMXUC",
    contributesAtIndex: 1,
    imageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/1bad7e2-cbed-47d5-25-54e330a30cf_10._CAMXUC.jpg"
  }
];

export const HOMECOMING_TEMPLATE: GameConfig = {
  title: "Trở Về Nhà Đón Chào Một Tôi Mới",
  secretKeyword: "HOMECOMING",
  secretHint: "", // Text removed as requested
  secretHintImages: [
    "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/16b0572-a46-33f-abba-fbb4e7fc36__nh_g_i_t_kho_b_m_t.jpg",
    "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/4270aa7-f6f1-4662-4820-7b2e466df2__nh_g_i_t_kho_b_m_t_3.jpg"
  ],
  rows: HOMECOMING_TEMPLATE_ROWS,
  victoryVideoUrl: "", 
  victoryImageUrl: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2154262411/settings_images/2571cae-872e-0cb7-b513-ba5ff17f824__nh_popup_ch_c_m_ng_ng_t_kho_b_m_t_.jpg",
  backgroundImageUrl: "", 
  backgroundMusicUrl: DEFAULT_MUSIC_URL,
  logoUrl: "" 
};

export const EMPTY_TEMPLATE: GameConfig = {
  title: "Trò Chơi Mới",
  secretKeyword: "",
  secretHint: "",
  rows: [],
  victoryVideoUrl: "",
  backgroundImageUrl: "",
  logoUrl: ""
};