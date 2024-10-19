module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
      },
    },
  },
  plugins: [],
};
