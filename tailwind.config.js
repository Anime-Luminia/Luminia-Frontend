module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 300ms ease-in forwards',
        'fade-out': 'fadeOut 300ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      colors: {
        primary: '#FFFFFF', // 메인 색상 (하얀색 배경)
        secondary: '#F5F5F5', // 보조 색상 (밝은 회색)
        hover: '#D9D9D9', // Hover 색상 (연한 회색)
        accent: '#5A85CF',
        superAccent: '#2E449F',
        cream: '#FFDFC4', // 크림색 포인트
        lightGray: '#E0E0E0', // 중간 회색 (구분선이나 섹션 강조)
        lavenderWhite: '#F8F8FF', // 아주 밝은 라벤더 톤의 하얀색 (미묘한 색상 차이)
        buttonHighlight: '#FFAA33',
        darkNav: '#020817',
        darkBack: '#0A0F1D',
        darkTitle: '#D1D5DB',
        darkCard: '#1A1E28',
        darkHover: '#3A3F51',
        darkTextHover: '#F3F4F6',
        darkButton: '#3B4252', // 버튼 배경 색상 추가
        darkButtonHover: '#4C566A', // 버튼 hover 시 색상 추가
        darkCardAlt: '#2A2E37',
        darkDropdownBg: '#1F2937', // 다크 모드 드롭다운 배경색 추가
        darkDropdownBorder: '#374151', // 다크 모드 드롭다운 테두리색 추가
        darkDropdownText: '#D1D5DB',
        darkInputBg: '#1A1E28', // 선택창 배경색
        darkInputBorder: '#374151', // 선택창 테두리 색상
        darkInputText: '#F3F4F6', // 선택창 텍스트 색상
        darkInputPlaceholder: '#9CA3AF',
        darkModal: '#242526',
        darkTextPrimary: '#E5E7EB', // 기본 텍스트 색상
        darkTextSecondary: '#9CA3AF', // 부가 텍스트 색상
        darkTextHighlight: '#F3F4F6',
        darkRed: '#991B1B', // 에러 메시지 배경 색상
        darkGreen: '#14532D', // 성공 메시지 배경 색상
        darkGray: '#6B7280', // 중간 회색
        darkBorder: '#4B5563',
      },
    },
  },
  plugins: [],
};
