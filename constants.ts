import { GameConfig, CrosswordRow } from './types';

export const DEFAULT_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; 

export const HOMECOMING_TEMPLATE_ROWS: CrosswordRow[] = [
  {
    id: 'row-1',
    question: "Một hành động giúp ta quay về với bình tên nội tại?",
    answer: "TROVE",
    contributesAtIndex: 3,
    imageUrl: ""
  },
  {
    id: 'row-2',
    question: "Khi mỏi mệt, ta thường mong người khác làm gì cho mình hơn là khuyên?",
    answer: "LANGNGHE",
    contributesAtIndex: 5, 
    imageUrl: ""
  },
  {
    id: 'row-3',
    question: "Cách dịu dàng nhất để ở bên cảm xúc mệt mỏi trong mình?",
    answer: "OMAP",
    contributesAtIndex: 1,
    imageUrl: ""
  },
  {
    id: 'row-4',
    question: ".. ... ra để bao dung tất cả. Tôi trở về nâng sự sống trên tay.",
    answer: "MOLONG",
    contributesAtIndex: 1,
    imageUrl: ""
  },
  {
    id: 'row-5',
    question: "Một từ khoá trong cuốn sách của Cô Ruby. Đây Là đơn vị nhỏ nhất nhưng quý giá nhất của sự sống, có thể quan sát được.",
    answer: "HOITHO",
    contributesAtIndex: 1,
    imageUrl: ""
  },
  {
    id: 'row-6',
    question: "Phần nào trong bạn cần được chăm sóc và hàm dưỡng mỗi ngày?",
    answer: "NOITAM",
    contributesAtIndex: 6,
    imageUrl: ""
  },
  {
    id: 'row-7',
    question: "Trạng thái lý tưởng bên trong giúp trí tuệ dễ dàng sinh khởi?",
    answer: "TINHLANG",
    contributesAtIndex: 2,
    imageUrl: ""
  },
  {
    id: 'row-8',
    question: "Phần trong ta không cần cố gắng để trở thành, chỉ cần được là?",
    answer: "BANTHE",
    contributesAtIndex: 3,
    imageUrl: ""
  },
  {
    id: 'row-9',
    question: "Phần nào giúp cái cây đứng vững vàng trước giông bão cuộc đời?",
    answer: "GOCRE",
    contributesAtIndex: 1,
    imageUrl: ""
  },
  {
    id: 'row-10',
    question: "Phần nào trong ta vừa có thể làm bạn, vừa có thể được chế tác?",
    answer: "CAMXUC",
    contributesAtIndex: 1,
    imageUrl: ""
  }
];

export const HOMECOMING_TEMPLATE: GameConfig = {
  title: "Trở Về Nhà Đón Chào Một Tôi Mới",
  secretKeyword: "HOMECOMING",
  secretHint: "Một chương trình offline giúp ta quay trở về",
  rows: HOMECOMING_TEMPLATE_ROWS,
  victoryVideoUrl: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&controls=0",
  backgroundImageUrl: "", // Empty to use the default #9b1106 color
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